'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

export default function MicrophoneTesterClient() {
    const t = useTranslations('Tools.microphone-tester.ui');
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState('');
    const [permissionGranted, setPermissionGranted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const requestRef = useRef<number | null>(null);

    const startTest = async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setPermissionGranted(true);
            setIsListening(true);

            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);

            source.connect(analyser);
            analyser.fftSize = 256;

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            sourceRef.current = source;

            drawVisualizer();
        } catch (err) {
            console.error(err);
            setError(t('permissionDenied'));
            setIsListening(false);
        }
    };

    const stopTest = () => {
        if (sourceRef.current) {
            sourceRef.current.disconnect();
        }
        if (analyserRef.current) {
            analyserRef.current.disconnect();
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }

        setIsListening(false);
        setPermissionGranted(false);

        // Clear canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const drawVisualizer = () => {
        const canvas = canvasRef.current;
        const analyser = analyserRef.current;

        if (!canvas || !analyser) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            requestRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgb(249, 250, 251)'; // bg-gray-50
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                // Gradient color based on volume
                const r = barHeight + (25 * (i / bufferLength));
                const g = 250 * (i / bufferLength);
                const b = 50;

                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

                x += barWidth + 1;
            }
        };

        draw();
    };

    useEffect(() => {
        return () => {
            stopTest();
        };
    }, []);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
                <div className="text-center mb-8">
                    {!isListening ? (
                        <div className="space-y-4">
                            <p className="text-gray-600">{t('instructions')}</p>
                            <Button
                                onClick={startTest}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                            >
                                {t('start')}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 text-green-600 font-medium animate-pulse">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                {t('listening')}
                            </div>
                            <Button
                                onClick={stopTest}
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                                {t('stop')}
                            </Button>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden h-64 relative">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={256}
                        className="w-full h-full"
                    />
                    {!isListening && !error && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <svg className="w-16 h-16 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                            </svg>
                        </div>
                    )}
                </div>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
