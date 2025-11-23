'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/app/components/ui/Card';

export default function JwtDecoderClient() {
    const t = useTranslations('Tools.jwt-decoder.ui');
    const [input, setInput] = useState('');
    const [header, setHeader] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!input.trim()) {
            setHeader(null);
            setPayload(null);
            setError('');
            return;
        }

        try {
            const parts = input.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format');
            }

            const decode = (str: string) => {
                try {
                    // Replace URL-safe chars
                    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                    // Pad with =
                    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
                    return JSON.parse(atob(padded));
                } catch (e) {
                    throw new Error('Invalid Base64');
                }
            };

            const decodedHeader = decode(parts[0]);
            const decodedPayload = decode(parts[1]);

            setHeader(decodedHeader);
            setPayload(decodedPayload);
            setError('');
        } catch (err) {
            setHeader(null);
            setPayload(null);
            setError(t('invalidToken'));
        }
    }, [input, t]);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('inputPlaceholder')}
                    className="w-full h-32 p-4 text-sm font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
            </Card>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
                    {error}
                </div>
            )}

            {(header || payload) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">{t('header')}</h3>
                        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm font-mono text-gray-800 h-64">
                            {JSON.stringify(header, null, 2)}
                        </pre>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">{t('payload')}</h3>
                        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm font-mono text-gray-800 h-64">
                            {JSON.stringify(payload, null, 2)}
                        </pre>
                    </Card>
                </div>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
