'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface QRCodeGeneratorClientProps {
    locale: string;
}

export default function QRCodeGeneratorClient({ locale }: QRCodeGeneratorClientProps) {
    const t = useTranslations('Tools.qr-code-generator');
    const [text, setText] = useState<string>('');
    const [size, setSize] = useState<number>(256);
    const [fgColor, setFgColor] = useState<string>('#000000');
    const [bgColor, setBgColor] = useState<string>('#ffffff');
    const [includeMargin, setIncludeMargin] = useState<boolean>(true);
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleDownload = (format: 'png' | 'jpg') => {
        const canvas = canvasRef.current?.querySelector('canvas');
        if (!canvas) return;

        const url = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.download = `qrcode.${format}`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card padding="lg">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('inputLabel')}
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={t('inputPlaceholder')}
                                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('size')} ({size}px)
                            </label>
                            <input
                                type="range"
                                min="128"
                                max="512"
                                step="8"
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('fgColor')}
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-500">{fgColor}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('bgColor')}
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-500">{bgColor}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="includeMargin"
                                checked={includeMargin}
                                onChange={(e) => setIncludeMargin(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="includeMargin" className="ml-2 block text-sm text-gray-900">
                                {t('includeMargin')}
                            </label>
                        </div>
                    </div>
                </Card>

                <Card padding="lg" className="flex flex-col items-center justify-center space-y-8">
                    <div
                        ref={canvasRef}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                        {text ? (
                            <QRCodeCanvas
                                value={text}
                                size={size}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                includeMargin={includeMargin}
                                level={'H'}
                            />
                        ) : (
                            <div
                                style={{ width: size, height: size }}
                                className="flex items-center justify-center bg-gray-50 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg"
                            >
                                {t('previewPlaceholder')}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 w-full">
                        <Button
                            onClick={() => handleDownload('png')}
                            className="flex-1"
                            disabled={!text}
                        >
                            {t('downloadPng')}
                        </Button>
                        <Button
                            onClick={() => handleDownload('jpg')}
                            variant="outline"
                            className="flex-1"
                            disabled={!text}
                        >
                            {t('downloadJpg')}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
