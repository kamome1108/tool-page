'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function ImageColorPickerClient() {
    const t = useTranslations('Tools.image-color-picker.ui');
    const [image, setImage] = useState<string | null>(null);
    const [color, setColor] = useState<{ hex: string; rgb: string; hsl: string } | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImage(event.target.result as string);
                    setColor(null);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                imageRef.current = img;
            };
            img.src = image;
        }
    }, [image]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];

        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
        const rgb = `rgb(${r}, ${g}, ${b})`;

        // Calculate HSL
        const rNorm = r / 255;
        const gNorm = g / 255;
        const bNorm = b / 255;
        const max = Math.max(rNorm, gNorm, bNorm);
        const min = Math.min(rNorm, gNorm, bNorm);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
                case gNorm: h = (bNorm - rNorm) / d + 2; break;
                case bNorm: h = (rNorm - gNorm) / d + 4; break;
            }
            h /= 6;
        }

        const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

        setColor({ hex, rgb, hsl });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(t('copied'));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 p-6">
                    {!image ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer flex flex-col items-center gap-4"
                            >
                                <div className="bg-blue-50 p-4 rounded-full">
                                    <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xl font-semibold text-gray-700 block">
                                        {t('selectImage')}
                                    </span>
                                    <span className="text-sm text-gray-500 block">
                                        {t('dragDrop')}
                                    </span>
                                </div>
                            </label>
                        </div>
                    ) : (
                        <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                            <canvas
                                ref={canvasRef}
                                onClick={handleCanvasClick}
                                className="max-w-full h-auto cursor-crosshair"
                                style={{ maxHeight: '600px' }}
                            />
                            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm pointer-events-none">
                                {t('instructions')}
                            </div>
                            <Button
                                onClick={() => {
                                    setImage(null);
                                    setColor(null);
                                }}
                                className="absolute top-4 right-4 bg-white text-gray-700 hover:bg-gray-100"
                                size="sm"
                            >
                                ✕
                            </Button>
                        </div>
                    )}
                </Card>

                <Card className="p-6 space-y-6 h-fit">
                    <h3 className="font-medium text-gray-700 border-b pb-2">{t('pickedColor')}</h3>

                    <div className="flex items-center justify-center py-8">
                        <div
                            className="w-24 h-24 rounded-full shadow-inner border border-gray-200"
                            style={{ backgroundColor: color?.hex || '#ffffff' }}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">{t('hex')}</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={color?.hex || ''}
                                    readOnly
                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono"
                                />
                                <Button
                                    onClick={() => color && copyToClipboard(color.hex)}
                                    disabled={!color}
                                    variant="outline"
                                    size="sm"
                                >
                                    {t('copy')}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">{t('rgb')}</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={color?.rgb || ''}
                                    readOnly
                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono"
                                />
                                <Button
                                    onClick={() => color && copyToClipboard(color.rgb)}
                                    disabled={!color}
                                    variant="outline"
                                    size="sm"
                                >
                                    {t('copy')}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">{t('hsl')}</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={color?.hsl || ''}
                                    readOnly
                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono"
                                />
                                <Button
                                    onClick={() => color && copyToClipboard(color.hsl)}
                                    disabled={!color}
                                    variant="outline"
                                    size="sm"
                                >
                                    {t('copy')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
