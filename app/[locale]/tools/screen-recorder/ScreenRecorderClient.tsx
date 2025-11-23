'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

export default function ScreenRecorderClient() {
    const t = useTranslations('Tools.screen-recorder.ui');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [error, setError] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = async () => {
        setError('');
        setVideoUrl(null);
        setRecordedChunks([]);

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9'
            });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };

            mediaRecorder.onstop = () => {
                setIsRecording(false);
                // Stop all tracks to stop the sharing indicator
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            mediaRecorderRef.current = mediaRecorder;

            // Handle user clicking "Stop sharing" in browser UI
            stream.getVideoTracks()[0].onended = () => {
                stopRecording();
            };

        } catch (err) {
            console.error(err);
            setError(t('permissionDenied'));
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
    };

    const downloadVideo = () => {
        if (recordedChunks.length === 0) return;

        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = `screen-recording-${new Date().toISOString()}.webm`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    useEffect(() => {
        if (!isRecording && recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
        }
    }, [isRecording, recordedChunks]);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
                <div className="text-center mb-6">
                    {!isRecording && !videoUrl ? (
                        <div className="space-y-4">
                            <p className="text-gray-600">{t('instructions')}</p>
                            <Button
                                onClick={startRecording}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                            >
                                {t('start')}
                            </Button>
                        </div>
                    ) : isRecording ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 text-red-600 font-medium animate-pulse">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                {t('recording')}
                            </div>
                            <Button
                                onClick={stopRecording}
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                                {t('stop')}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="text-green-600 font-medium mb-4">
                                {t('recorded')}
                            </div>
                            <div className="flex justify-center gap-4">
                                <Button
                                    onClick={downloadVideo}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {t('download')}
                                </Button>
                                <Button
                                    onClick={startRecording}
                                    variant="outline"
                                >
                                    {t('start')}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center mb-6">
                        {error}
                    </div>
                )}

                {videoUrl && (
                    <div className="bg-black rounded-lg overflow-hidden aspect-video relative flex items-center justify-center mt-6">
                        <video
                            src={videoUrl}
                            controls
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
