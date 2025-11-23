'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

export default function AudioCutterClient() {
    const t = useTranslations('Tools.audio-cutter.ui');
    const [file, setFile] = useState<File | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const [isProcessing, setIsProcessing] = useState(false);

    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const regionsRef = useRef<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (!file || !waveformRef.current) return;

        const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#4F46E5',
            progressColor: '#818CF8',
            cursorColor: '#312E81',
            barWidth: 2,
            barGap: 1,
            height: 128,
        });

        const wsRegions = ws.registerPlugin(RegionsPlugin.create());
        regionsRef.current = wsRegions;

        ws.loadBlob(file);

        ws.on('ready', () => {
            setDuration(ws.getDuration());
            // Add a default region
            wsRegions.addRegion({
                start: 0,
                end: ws.getDuration() / 2,
                color: 'rgba(79, 70, 229, 0.2)',
                drag: true,
                resize: true,
            });
        });

        ws.on('play', () => setIsPlaying(true));
        ws.on('pause', () => setIsPlaying(false));

        wsRegions.on('region-updated', (region: any) => {
            setSelection({ start: region.start, end: region.end });
        });

        wsRegions.on('region-created', (region: any) => {
            setSelection({ start: region.start, end: region.end });
            // Ensure only one region exists
            const regions = wsRegions.getRegions();
            if (regions.length > 1) {
                regions[0].remove();
            }
        });

        wavesurferRef.current = ws;

        return () => {
            ws.destroy();
        };
    }, [file]);

    const togglePlay = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
        }
    };

    const trimAudio = async () => {
        if (!file || !wavesurferRef.current) return;

        setIsProcessing(true);
        const loadingToast = toast.loading(t('processing'));

        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const arrayBuffer = await file.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const start = selection.start;
            const end = selection.end;
            const duration = end - start;

            const sampleRate = audioBuffer.sampleRate;
            const startFrame = Math.floor(start * sampleRate);
            const endFrame = Math.floor(end * sampleRate);
            const frameCount = endFrame - startFrame;

            const newBuffer = audioContext.createBuffer(
                audioBuffer.numberOfChannels,
                frameCount,
                sampleRate
            );

            for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
                const channelData = audioBuffer.getChannelData(i);
                const newChannelData = newBuffer.getChannelData(i);
                for (let j = 0; j < frameCount; j++) {
                    newChannelData[j] = channelData[startFrame + j];
                }
            }

            // Convert AudioBuffer to WAV
            const wavBlob = await audioBufferToWav(newBuffer);

            const url = URL.createObjectURL(wavBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `trimmed-${file.name.replace(/\.[^/.]+$/, "")}.wav`;
            link.click();

            toast.success(t('success'), { id: loadingToast });
        } catch (error) {
            console.error(error);
            toast.error(t('error'), { id: loadingToast });
        } finally {
            setIsProcessing(false);
        }
    };

    // Helper function to convert AudioBuffer to WAV Blob
    const audioBufferToWav = (buffer: AudioBuffer): Promise<Blob> => {
        return new Promise((resolve) => {
            const length = buffer.length * buffer.numberOfChannels * 2 + 44;
            const arrayBuffer = new ArrayBuffer(length);
            const view = new DataView(arrayBuffer);
            const channels = [];
            let offset = 0;
            let pos = 0;

            // write WAVE header
            setUint32(0x46464952); // "RIFF"
            setUint32(length - 8); // file length - 8
            setUint32(0x45564157); // "WAVE"

            setUint32(0x20746d66); // "fmt " chunk
            setUint32(16); // length = 16
            setUint16(1); // PCM (uncompressed)
            setUint16(buffer.numberOfChannels);
            setUint32(buffer.sampleRate);
            setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels); // avg. bytes/sec
            setUint16(buffer.numberOfChannels * 2); // block-align
            setUint16(16); // 16-bit (hardcoded in this example)

            setUint32(0x61746164); // "data" - chunk
            setUint32(length - pos - 4); // chunk length

            // write interleaved data
            for (let i = 0; i < buffer.numberOfChannels; i++)
                channels.push(buffer.getChannelData(i));

            while (pos < buffer.length) {
                for (let i = 0; i < buffer.numberOfChannels; i++) {
                    let sample = Math.max(-1, Math.min(1, channels[i][pos])); // clamp
                    sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
                    view.setInt16(44 + offset, sample, true);
                    offset += 2;
                }
                pos++;
            }

            resolve(new Blob([arrayBuffer], { type: 'audio/wav' }));

            function setUint16(data: number) {
                view.setUint16(pos, data, true);
                pos += 2;
            }

            function setUint32(data: number) {
                view.setUint32(pos, data, true);
                pos += 4;
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />
            <Card className="p-8">
                {!file ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="audio-upload"
                        />
                        <label
                            htmlFor="audio-upload"
                            className="cursor-pointer flex flex-col items-center gap-4"
                        >
                            <div className="bg-blue-50 p-4 rounded-full">
                                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xl font-semibold text-gray-700 block">
                                    {t('selectAudio')}
                                </span>
                                <span className="text-sm text-gray-500 block">
                                    {t('dragDrop')}
                                </span>
                            </div>
                        </label>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">{file.name}</span>
                            <Button
                                onClick={() => setFile(null)}
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </Button>
                        </div>

                        <div ref={waveformRef} className="w-full" />

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div className="space-x-4">
                                <Button
                                    onClick={togglePlay}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {isPlaying ? t('pause') : t('play')}
                                </Button>
                                <span className="text-sm text-gray-600 font-mono">
                                    {t('selection', {
                                        start: selection.start.toFixed(2),
                                        end: selection.end.toFixed(2)
                                    })}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500">
                                {t('duration', { seconds: duration.toFixed(2) })}
                            </div>
                        </div>

                        <Button
                            onClick={trimAudio}
                            disabled={isProcessing}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                        >
                            {isProcessing ? t('processing') : t('trim')}
                        </Button>
                    </div>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
