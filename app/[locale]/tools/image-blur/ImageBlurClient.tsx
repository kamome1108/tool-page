'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { FileDropzone } from '@/app/components/ui/FileDropzone';
import { ImagePreview } from '@/app/components/ui/ImagePreview';
// import { saveAs } from 'file-saver';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';
import type { ToolContent } from '@/app/types/tool';

interface ImageBlurClientProps {
    locale: string;
    content: ToolContent;
}

export default function ImageBlurClient({ locale, content }: ImageBlurClientProps) {
    const t = useTranslations('Tools.image-blur.ui');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [intensity, setIntensity] = useState<number>(5);
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

    const handleDownload = () => {
        if (!file || !canvasRef.current || !previewUrl) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.filter = `blur(${intensity}px)`;
            ctx.drawImage(img, 0, 0);
            ctx.filter = 'none';

            canvas.toBlob((blob) => {
                if (blob) {
                    const fileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                    const extension = file.type === 'image/png' ? 'png' : 'jpg';
                    // saveAs(blob, `blurred-${fileName}.${extension}`);
                    import('file-saver').then(module => {
                        module.saveAs(blob, `blurred-${fileName}.${extension}`);
                    });
                }
            }, file.type);
        };
        img.src = previewUrl;
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setIntensity(5);
    };

    return (
        <EnhancedToolLayout
            {...content}
            title={content.meta.title}
            toolId="image-blur"
            locale={locale}
        >
            <div className="max-w-4xl mx-auto">
                <Card padding="lg">
                    {!file ? (
                        <FileDropzone
                            onFileSelect={processFile}
                            label={t('dropzone.label')}
                            icon={<div className="text-6xl mb-4">🌫️</div>}
                        />
                    ) : (
                        <div className="space-y-8">
                            <ImagePreview
                                src={previewUrl!}
                                imageStyle={{ filter: `blur(${intensity}px)` }}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('intensity')} ({intensity}px)
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={intensity}
                                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={handleDownload} size="lg" className="flex-1">
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
        </EnhancedToolLayout>
    );
}
