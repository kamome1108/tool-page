'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { saveAs } from 'file-saver';

interface ImageBlurClientProps {
    locale: string;
}

export default function ImageBlurClient({ locale }: ImageBlurClientProps) {
    const t = useTranslations('Tools.ImageBlur');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [intensity, setIntensity] = useState<number>(5);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        setFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
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
                    saveAs(blob, `blurred-${fileName}.${extension}`);
                }
            }, file.type);
        };
        img.src = previewUrl;
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setIntensity(5);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card padding="lg">
                {!file ? (
                    <div
                        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <div className="text-6xl mb-4">🌫️</div>
                        <p className="text-lg text-gray-600">{t('dropzone.label')}</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center bg-gray-100 rounded-lg p-4 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={previewUrl!}
                                alt="Preview"
                                className="max-h-[400px] object-contain transition-all duration-200"
                                style={{ filter: `blur(${intensity}px)` }}
                            />
                        </div>

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
    );
}
