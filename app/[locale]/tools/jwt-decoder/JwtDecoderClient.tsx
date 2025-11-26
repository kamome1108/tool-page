'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';
import { Button } from '@/app/components/ui/Button';
import toast from 'react-hot-toast';
import { ToolContent } from '@/app/types/tool';

interface Props {
    locale: string;
    content: ToolContent;
}

export default function JwtDecoderClient({ locale, content }: Props) {
    const t = useTranslations('Tools.jwt-decoder');
    const [token, setToken] = useState('');
    const [header, setHeader] = useState<object | null>(null);
    const [payload, setPayload] = useState<object | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            setHeader(null);
            setPayload(null);
            setError('');
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error(t('ui.invalidToken'));
            }

            const decode = (str: string) => {
                try {
                    // Replace URL-safe chars
                    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                    // Pad with = (atob usually handles this, but explicit padding can prevent issues)
                    // The new code removes explicit padding, relying on atob's robustness.
                    return JSON.parse(atob(base64));
                } catch (e) {
                    throw new Error(t('ui.invalidToken'));
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
            setError((err as Error).message);
        }
    }, [token, t]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(t('ui.copied'));
    };

    return (
        <EnhancedToolLayout
            {...content}
            toolId="jwt-decoder"
            locale={locale}
        >
            <div className="space-y-6">
                {/* Input Section */}
                <div className="space-y-2">
                    <textarea
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="w-full h-32 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                        placeholder={t('ui.inputPlaceholder')}
                    />
                    {error && (
                        <div className="text-red-500 text-sm font-medium">
                            {error}
                        </div>
                    )}
                </div>

                {/* Decoded Sections */}
                {(header || payload) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Header */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {t('ui.header')}
                                </h3>
                                <Button
                                    onClick={() => handleCopy(JSON.stringify(header, null, 2))}
                                    variant="secondary"
                                    size="sm"
                                >
                                    {t('ui.copy')}
                                </Button>
                            </div>
                            <div className="relative">
                                <pre className="w-full h-64 p-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 font-mono text-sm overflow-auto text-red-800 dark:text-red-200">
                                    {JSON.stringify(header, null, 2)}
                                </pre>
                            </div>
                        </div>

                        {/* Payload */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {t('ui.payload')}
                                </h3>
                                <Button
                                    onClick={() => handleCopy(JSON.stringify(payload, null, 2))}
                                    variant="secondary"
                                    size="sm"
                                >
                                    {t('ui.copy')}
                                </Button>
                            </div>
                            <div className="relative">
                                <pre className="w-full h-64 p-4 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20 font-mono text-sm overflow-auto text-purple-800 dark:text-purple-200">
                                    {JSON.stringify(payload, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {t('ui.processingNote')}
                </div>
            </div>
        </EnhancedToolLayout>
    );
}
