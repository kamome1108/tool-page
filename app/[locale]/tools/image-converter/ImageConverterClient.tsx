'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { FileDropzone } from '@/app/components/ui/FileDropzone';
import { ImagePreview } from '@/app/components/ui/ImagePreview';
import { saveAs } from 'file-saver';

interface ImageConverterClientProps {
    locale: string;
}

export default function ImageConverterClient({ locale }: ImageConverterClientProps) {
    const t = useTranslations('Tools.image-converter');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [format, setFormat] = useState<string>('image/png');
    const [quality, setQuality] = useState<number>(0.9);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        setFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleConvertAndDownload = () => {
        if (!file || !canvasRef.current || !previewUrl) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                if (blob) {
                    const extension = format.split('/')[1];
                    const fileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                    saveAs(blob, `${fileName}.${extension}`);
                }
            }, format, quality);
        };
        img.src = previewUrl;
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card padding="lg">
                {!file ? (
                    <FileDropzone
                        onFileSelect={processFile}
                        label={t('dropzone.label')}
                    />
                ) : (
                    <div className="space-y-8">
                        <ImagePreview src={previewUrl!} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('format')}
                                </label>
                                <select
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="image/png">{t('formats.png')}</option>
                                    <option value="image/jpeg">{t('formats.jpeg')}</option>
                                    <option value="image/webp">{t('formats.webp')}</option>
                                </select>
                            </div>
                            {(format === 'image/jpeg' || format === 'image/webp') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('quality')} ({Math.round(quality * 100)}%)
                                    </label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1"
                                        step="0.1"
                                        value={quality}
                                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button onClick={handleConvertAndDownload} size="lg" className="flex-1">
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
