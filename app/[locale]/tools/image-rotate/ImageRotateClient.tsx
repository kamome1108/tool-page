'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { saveAs } from 'file-saver';

interface ImageRotateClientProps {
    locale: string;
}

export default function ImageRotateClient({ locale }: ImageRotateClientProps) {
    const t = useTranslations('Tools.ImageRotate');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [flipH, setFlipH] = useState<boolean>(false);
    const [flipV, setFlipV] = useState<boolean>(false);
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
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
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

    const handleRotateLeft = () => {
        setRotation((prev) => (prev - 90) % 360);
    };

    const handleRotateRight = () => {
        setRotation((prev) => (prev + 90) % 360);
    };

    const handleFlipH = () => {
        setFlipH((prev) => !prev);
    };

    const handleFlipV = () => {
        setFlipV((prev) => !prev);
    };

    const handleDownload = () => {
        if (!file || !canvasRef.current || !previewUrl) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            // Calculate new dimensions based on rotation
            if (Math.abs(rotation) % 180 === 90) {
                canvas.width = img.height;
                canvas.height = img.width;
            } else {
                canvas.width = img.width;
                canvas.height = img.height;
            }

            ctx.save();

            // Move to center
            ctx.translate(canvas.width / 2, canvas.height / 2);

            // Rotate
            ctx.rotate((rotation * Math.PI) / 180);

            // Flip
            ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

            // Draw image centered
            ctx.drawImage(img, -img.width / 2, -img.height / 2);

            ctx.restore();

            canvas.toBlob((blob) => {
                if (blob) {
                    const fileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                    const extension = file.type === 'image/png' ? 'png' : 'jpg';
                    saveAs(blob, `rotated-${fileName}.${extension}`);
                }
            }, file.type);
        };
        img.src = previewUrl;
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const getTransformStyle = () => {
        return `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`;
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
                        <div className="text-6xl mb-4">↻</div>
                        <p className="text-lg text-gray-600">{t('dropzone.label')}</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center bg-gray-100 rounded-lg p-4 overflow-hidden min-h-[300px] items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={previewUrl!}
                                alt="Preview"
                                className="max-h-[400px] max-w-full object-contain transition-transform duration-300"
                                style={{ transform: getTransformStyle() }}
                            />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <Button onClick={handleRotateLeft} variant="outline">
                                ↺ {t('rotateLeft')}
                            </Button>
                            <Button onClick={handleRotateRight} variant="outline">
                                ↻ {t('rotateRight')}
                            </Button>
                            <Button onClick={handleFlipH} variant="outline">
                                ↔ {t('flipHorizontal')}
                            </Button>
                            <Button onClick={handleFlipV} variant="outline">
                                ↕ {t('flipVertical')}
                            </Button>
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
