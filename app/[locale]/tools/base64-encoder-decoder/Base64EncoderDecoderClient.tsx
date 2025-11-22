'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface Base64EncoderDecoderClientProps {
    locale: string;
}

export default function Base64EncoderDecoderClient({ locale }: Base64EncoderDecoderClientProps) {
    const t = useTranslations('Tools.base64-encoder-decoder');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Unicode-safe Base64 Encode
    const utf8ToBase64 = (str: string) => {
        return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
        }));
    };

    // Unicode-safe Base64 Decode
    const base64ToUtf8 = (str: string) => {
        return decodeURIComponent(Array.prototype.map.call(window.atob(str), (c: string) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };

    useEffect(() => {
        setError(null);
        if (!input) {
            setOutput('');
            return;
        }

        try {
            if (mode === 'encode') {
                setOutput(utf8ToBase64(input));
            } else {
                setOutput(base64ToUtf8(input));
            }
        } catch (e) {
            setError(t('ui.invalidBase64'));
            setOutput('');
        }
    }, [input, mode, t]);

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInput(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Mode Selection */}
            <div className="flex justify-center space-x-4">
                <Button
                    variant={mode === 'encode' ? 'primary' : 'secondary'}
                    onClick={() => setMode('encode')}
                    className="w-32"
                >
                    {t('ui.encode')}
                </Button>
                <Button
                    variant={mode === 'decode' ? 'primary' : 'secondary'}
                    onClick={() => setMode('decode')}
                    className="w-32"
                >
                    {t('ui.decode')}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card padding="md" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            {t('ui.input')}
                        </label>
                        <div className="space-x-2">
                            <button
                                onClick={() => setInput('')}
                                className="text-xs text-gray-500 hover:text-gray-700"
                            >
                                {t('ui.clear')}
                            </button>
                            <button
                                onClick={handlePaste}
                                className="text-xs text-blue-600 hover:text-blue-800"
                            >
                                {t('ui.paste')}
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('ui.inputPlaceholder')}
                        className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                    />
                </Card>

                {/* Output Section */}
                <Card padding="md" className="space-y-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            {t('ui.output')}
                        </label>
                        {output && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCopy}
                                className={copied ? "text-green-600 border-green-600" : ""}
                            >
                                {copied ? t('ui.copied') : t('ui.copy')}
                            </Button>
                        )}
                    </div>
                    <div className="relative h-64">
                        {error ? (
                            <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-red-50 rounded-md border border-red-200">
                                <div className="text-center">
                                    <span className="block text-2xl mb-2">⚠️</span>
                                    {error}
                                </div>
                            </div>
                        ) : (
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-full p-3 bg-white border border-gray-300 rounded-md resize-none font-mono text-sm focus:outline-none"
                            />
                        )}
                    </div>
                </Card>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
