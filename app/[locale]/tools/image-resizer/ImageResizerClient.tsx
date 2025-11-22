'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { FileDropzone } from '@/app/components/ui/FileDropzone';
import { ImagePreview } from '@/app/components/ui/ImagePreview';
import { saveAs } from 'file-saver';

interface ImageResizerClientProps {
    locale: string;
}

export default function ImageResizerClient({ locale }: ImageResizerClientProps) {
    const t = useTranslations('Tools.image-resizer');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [originalWidth, setOriginalWidth] = useState<number>(0);
    const [originalHeight, setOriginalHeight] = useState<number>(0);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
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

        const img = new Image();
        img.onload = () => {
            setWidth(img.width);
            setHeight(img.height);
            setOriginalWidth(img.width);
            setOriginalHeight(img.height);
        };
        img.src = url;
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = parseInt(e.target.value) || 0;
        setWidth(newWidth);
        if (maintainAspectRatio && originalWidth > 0) {
            setHeight(Math.round((newWidth / originalWidth) * originalHeight));
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = parseInt(e.target.value) || 0;
        setHeight(newHeight);
        if (maintainAspectRatio && originalHeight > 0) {
            setWidth(Math.round((newHeight / originalHeight) * originalWidth));
        }
    };

    const handleResizeAndDownload = () => {
        if (!file || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, `resized-${file.name}`);
                }
            }, file.type);
        };
        img.src = previewUrl!;
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setWidth(0);
        setHeight(0);
        setOriginalWidth(0);
        setOriginalHeight(0);
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
                                    {t('width')}
                                </label>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={handleWidthChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('height')}
                                </label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={handleHeightChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="aspectRatio"
                                checked={maintainAspectRatio}
                                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="aspectRatio" className="text-sm text-gray-700">
                                {t('maintainAspectRatio')}
                            </label>
                        </div>

                        <div className="text-sm text-gray-500">
                            <p>{t('original', { width: originalWidth, height: originalHeight })}</p>
                            <p>{t('new', { width, height })}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button onClick={handleResizeAndDownload} size="lg" className="flex-1">
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
