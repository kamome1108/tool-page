'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import QRCode from 'qrcode';

interface QrCodeGeneratorClientProps {
    locale: string;
}

export default function QrCodeGeneratorClient({ locale }: QrCodeGeneratorClientProps) {
    const t = useTranslations('Tools.qr-code-generator');
    const [input, setInput] = useState('https://example.com');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        generateQrCode();
    }, [input]);

    const generateQrCode = async () => {
        if (!input) {
            setQrCodeUrl('');
            return;
        }

        try {
            const url = await QRCode.toDataURL(input, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff',
                },
            });
            setQrCodeUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownload = () => {
        if (!qrCodeUrl) return;
        const link = document.createElement('a');
        link.href = qrCodeUrl;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.inputLabel')}
                    </label>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                    />
                </div>

                <div className="flex justify-center bg-white p-4 border border-gray-200 rounded-md">
                    {qrCodeUrl ? (
                        <img src={qrCodeUrl} alt="QR Code" className="max-w-full h-auto" />
                    ) : (
                        <div className="w-64 h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                            QR Code
                        </div>
                    )}
                </div>

                <Button onClick={handleDownload} className="w-full" disabled={!qrCodeUrl}>
                    {t('ui.download')}
                </Button>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
