'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

export default function WebcamTesterClient() {
    const t = useTranslations('Tools.webcam-tester.ui');
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState('');
    const [resolution, setResolution] = useState({ width: 0, height: 0 });
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1920 }, height: { ideal: 1080 } }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsActive(true);
            }
        } catch (err) {
            console.error(err);
            setError(t('permissionDenied'));
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsActive(false);
        setResolution({ width: 0, height: 0 });
    };

    const handleVideoLoaded = () => {
        if (videoRef.current) {
            setResolution({
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight
            });
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Create download link
                const dataUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `webcam-snapshot-${new Date().toISOString()}.png`;
                link.click();
            }
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
                <div className="text-center mb-6">
                    {!isActive ? (
                        <div className="space-y-4">
                            <p className="text-gray-600">{t('instructions')}</p>
                            <Button
                                onClick={startCamera}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                            >
                                {t('start')}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-center gap-4">
                                <Button
                                    onClick={takePhoto}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {t('takePhoto')}
                                </Button>
                                <Button
                                    onClick={stopCamera}
                                    variant="outline"
                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                    {t('stop')}
                                </Button>
                            </div>
                            {resolution.width > 0 && (
                                <div className="text-sm text-gray-500 font-mono">
                                    {t('resolution', { width: resolution.width, height: resolution.height })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-black rounded-lg overflow-hidden aspect-video relative flex items-center justify-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        onLoadedMetadata={handleVideoLoaded}
                        className={`w-full h-full object-contain ${!isActive ? 'hidden' : ''}`}
                    />
                    {!isActive && !error && (
                        <div className="text-gray-600">
                            <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Hidden canvas for snapshot */}
                <canvas ref={canvasRef} className="hidden" />
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
