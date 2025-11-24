'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function FaviconGeneratorClient() {
    const t = useTranslations('Tools.favicon-generator.ui');
    const [image, setImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resizeImage = (dataUrl: string, width: number, height: number): Promise<Blob> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                    }, 'image/png');
                }
            };
            img.src = dataUrl;
        });
    };

    const generateFavicons = async () => {
        if (!image) return;

        setIsGenerating(true);
        const zip = new JSZip();

        try {
            // Standard Favicons
            const favicon16 = await resizeImage(image, 16, 16);
            zip.file('favicon-16x16.png', favicon16);

            const favicon32 = await resizeImage(image, 32, 32);
            zip.file('favicon-32x32.png', favicon32);

            // Apple Touch Icon
            const appleTouch = await resizeImage(image, 180, 180);
            zip.file('apple-touch-icon.png', appleTouch);

            // Android Chrome
            const android192 = await resizeImage(image, 192, 192);
            zip.file('android-chrome-192x192.png', android192);

            const android512 = await resizeImage(image, 512, 512);
            zip.file('android-chrome-512x512.png', android512);

            // Generate ICO (using 32x32 PNG as base for simplicity in client-side only)
            // Note: Real ICO generation is complex client-side, often just renaming PNG works for modern browsers,
            // but for true ICO we'd need a library like png-to-ico. For now, we provide PNGs which are standard.
            // We will duplicate 32x32 as favicon.ico for basic compatibility.
            zip.file('favicon.ico', favicon32);

            // Manifest
            const manifest = {
                name: "My Website",
                short_name: "Website",
                icons: [
                    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
                    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
                ],
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone"
            };
            zip.file('site.webmanifest', JSON.stringify(manifest, null, 2));

            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'favicons.zip');
            toast.success('Favicons generated and downloaded!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to generate favicons.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('upload')}</label>
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            variant="outline"
                        >
                            {t('upload')}
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg, image/svg+xml"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <span className="text-sm text-gray-500">{t('uploadHelp')}</span>
                    </div>
                </div>

                {image && (
                    <div className="space-y-6">
                        <div className="border-t pt-6">
                            <h3 className="font-medium text-gray-700 mb-4">{t('preview')}</h3>
                            <div className="flex flex-wrap gap-8 items-end">
                                <div className="text-center space-y-2">
                                    <div className="w-8 h-8 mx-auto border rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <img src={image} alt="32x32" className="w-full h-full object-contain" />
                                    </div>
                                    <p className="text-xs text-gray-500">32x32</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-16 h-16 mx-auto border rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <img src={image} alt="Apple Touch" className="w-full h-full object-contain" />
                                    </div>
                                    <p className="text-xs text-gray-500">180x180</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-24 h-24 mx-auto border rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <img src={image} alt="Android" className="w-full h-full object-contain" />
                                    </div>
                                    <p className="text-xs text-gray-500">192x192</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={generateFavicons}
                            disabled={isGenerating}
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isGenerating ? t('generating') : t('download')}
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
