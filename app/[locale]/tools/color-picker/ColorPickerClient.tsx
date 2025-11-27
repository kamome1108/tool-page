'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';
import { Button } from '@/app/components/ui/Button';
import { FileDropzone } from '@/app/components/ui/FileDropzone';
import { ToolContent } from '@/app/types/tool';

interface ColorPickerClientProps {
    locale: string;
    content: ToolContent;
}

interface Color {
    hex: string;
    rgb: string;
    hsl: string;
}

export default function ColorPickerClient({ locale, content }: ColorPickerClientProps) {
    const t = useTranslations('Tools.color-picker');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [pickedColor, setPickedColor] = useState<Color | null>(null);
    const [hoverColor, setHoverColor] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

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
        setPickedColor(null);
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };

    const getColorAtPosition = (x: number, y: number, img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        // Draw image to canvas if not already drawn or if dimensions changed
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
        }

        // Calculate actual position on original image
        const rect = img.getBoundingClientRect();
        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;

        const actualX = Math.floor(x * scaleX);
        const actualY = Math.floor(y * scaleY);

        const pixel = ctx.getImageData(actualX, actualY, 1, 1).data;
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];

        return {
            hex: rgbToHex(r, g, b),
            rgb: `rgb(${r}, ${g}, ${b})`,
            hsl: rgbToHsl(r, g, b)
        };
    };

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const color = getColorAtPosition(x, y, imageRef.current);
        if (color) {
            setPickedColor(color);
        }
    };

    const handleImageMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const color = getColorAtPosition(x, y, imageRef.current);
        if (color) {
            setHoverColor(color.hex);
        }
    };

    const handleMouseLeave = () => {
        setHoverColor(null);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast notification here
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setPickedColor(null);
        setHoverColor(null);
    };

    return (
        <EnhancedToolLayout
            {...content}
            toolId="color-picker"
            locale={locale}
        >
            <div className="space-y-8">
                {!file ? (
                    <FileDropzone
                        onFileSelect={processFile}
                        label={t('ui.dropzone.label')}
                        icon={<div className="text-6xl mb-4">🎨</div>}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="relative bg-gray-100 rounded-lg overflow-hidden cursor-crosshair">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    ref={imageRef}
                                    src={previewUrl!}
                                    alt="Pick color"
                                    className="w-full h-auto"
                                    onClick={handleImageClick}
                                    onMouseMove={handleImageMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                />
                                {hoverColor && (
                                    <div
                                        className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white shadow-lg pointer-events-none"
                                        style={{ backgroundColor: hoverColor }}
                                    />
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-2 text-center">
                                {t('ui.clickToPick')}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    {t('ui.pickedColor')}
                                </h3>
                                <div
                                    className="w-full h-24 rounded-lg shadow-inner mb-6 border border-gray-200"
                                    style={{ backgroundColor: pickedColor?.hex || '#FFFFFF' }}
                                />

                                {pickedColor && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">{t('ui.hex')}</label>
                                            <div className="flex gap-2">
                                                <input
                                                    readOnly
                                                    value={pickedColor.hex}
                                                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono"
                                                />
                                                <Button size="sm" variant="outline" onClick={() => copyToClipboard(pickedColor.hex)}>
                                                    {t('ui.copy')}
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">{t('ui.rgb')}</label>
                                            <div className="flex gap-2">
                                                <input
                                                    readOnly
                                                    value={pickedColor.rgb}
                                                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono"
                                                />
                                                <Button size="sm" variant="outline" onClick={() => copyToClipboard(pickedColor.rgb)}>
                                                    {t('ui.copy')}
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">{t('ui.hsl')}</label>
                                            <div className="flex gap-2">
                                                <input
                                                    readOnly
                                                    value={pickedColor.hsl}
                                                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono"
                                                />
                                                <Button size="sm" variant="outline" onClick={() => copyToClipboard(pickedColor.hsl)}>
                                                    {t('ui.copy')}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button onClick={handleReset} variant="outline" size="lg" className="w-full">
                                {t('ui.reset')}
                            </Button>
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </div>
        </EnhancedToolLayout>
    );
}
