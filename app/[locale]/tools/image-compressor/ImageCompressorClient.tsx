'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { FileDropzone } from '@/app/components/ui/FileDropzone';
import { ImagePreview } from '@/app/components/ui/ImagePreview';
import { saveAs } from 'file-saver';

interface ImageCompressorClientProps {
    locale: string;
}

export default function ImageCompressorClient({ locale }: ImageCompressorClientProps) {
    const t = useTranslations('Tools.image-compressor');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<string | null>(null);
    const [quality, setQuality] = useState<number>(0.8);
    const [compressedSize, setCompressedSize] = useState<number>(0);
    const [isCompressing, setIsCompressing] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
        };
    }, [previewUrl, compressedPreviewUrl]);

    useEffect(() => {
        if (file) {
            compressImage();
        }
    }, [file, quality]);

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        setFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const compressImage = () => {
        if (!file || !canvasRef.current || !previewUrl) return;

        setIsCompressing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Use jpeg for compression as it supports quality parameter well
            const format = file.type === 'image/png' ? 'image/jpeg' : file.type;

            canvas.toBlob((blob) => {
                if (blob) {
                    if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
                    const url = URL.createObjectURL(blob);
                    setCompressedPreviewUrl(url);
                    setCompressedSize(blob.size);
                }
                setIsCompressing(false);
            }, format, quality);
        };
        img.src = previewUrl;
    };

    const handleDownload = () => {
        if (!compressedPreviewUrl || !file) return;

        fetch(compressedPreviewUrl)
            .then(res => res.blob())
            .then(blob => {
                const fileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                const extension = file.type === 'image/png' ? 'jpg' : file.name.split('.').pop();
                saveAs(blob, `compressed-${fileName}.${extension}`);
            });
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setCompressedPreviewUrl(null);
        setCompressedSize(0);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card padding="lg">
                {!file ? (
                    <FileDropzone
                        onFileSelect={processFile}
                        label={t('dropzone.label')}
                        icon={<div className="text-6xl mb-4">📉</div>}
                    />
                ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Original</h3>
                                <ImagePreview src={previewUrl!} className="h-64" />
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    {t('originalSize', { size: formatSize(file.size) })}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Compressed</h3>
                                <div className="bg-gray-100 rounded-lg p-4 overflow-hidden h-64 flex items-center justify-center relative">
                                    {isCompressing && (
                                        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    )}
                                    {compressedPreviewUrl && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={compressedPreviewUrl}
                                            alt="Compressed"
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    {t('compressedSize', { size: formatSize(compressedSize) })}
                                    {file.size > 0 && (
                                        <span className="ml-2 text-green-600 font-medium">
                                            ({t('savings', { percent: Math.round((1 - compressedSize / file.size) * 100) })})
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('quality')} ({Math.round(quality * 100)}%)
                            </label>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.05"
                                value={quality}
                                onChange={(e) => setQuality(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button onClick={handleDownload} size="lg" className="flex-1" disabled={isCompressing}>
                                {t('download')}
                            </Button>
                            <Button onClick={handleReset} variant="outline" size="lg">
                                {t('reset')}
                            </Button>
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </Card>
        </div>
    );
}
