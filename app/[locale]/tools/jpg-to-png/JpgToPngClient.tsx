'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function JpgToPngClient() {
    const t = useTranslations('Tools.jpg-to-png.ui');
    const [image, setImage] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.match('image/jpeg')) {
                toast.error('Please select a JPG image.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const convertToPng = () => {
        if (!image) return;

        setIsConverting(true);
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'converted.png';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        toast.success('PNG downloaded!');
                    }
                    setIsConverting(false);
                }, 'image/png');
            }
        };
        img.src = image;
    };

    const clear = () => {
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6 space-y-6">
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.match('image/jpeg')) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                setImage(event.target?.result as string);
                            };
                            reader.readAsDataURL(file);
                        } else {
                            toast.error('Please drop a JPG image.');
                        }
                    }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="space-y-2">
                        <div className="text-4xl">🔄</div>
                        <p className="text-gray-600 font-medium">{t('upload')}</p>
                        <p className="text-sm text-gray-500">{t('uploadHelp')}</p>
                    </div>
                </div>

                {image && (
                    <div className="space-y-6">
                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                            <img src={image} alt="preview" className="w-full h-full object-contain" />
                            <button
                                onClick={clear}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <Button
                            onClick={convertToPng}
                            disabled={isConverting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                        >
                            {isConverting ? t('converting') : t('download')}
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
