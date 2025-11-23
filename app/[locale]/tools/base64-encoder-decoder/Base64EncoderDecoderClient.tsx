'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface Base64EncoderDecoderClientProps {
    locale: string;
}

export default function Base64EncoderDecoderClient({ locale }: Base64EncoderDecoderClientProps) {
    const t = useTranslations('Tools.base64-encoder-decoder');
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const encode = () => {
        try {
            setResult(btoa(unescape(encodeURIComponent(input))));
        } catch (e) {
            setResult('Error: Invalid input for Base64 encoding');
        }
    };

    const decode = () => {
        try {
            setResult(decodeURIComponent(escape(atob(input))));
        } catch (e) {
            setResult('Error: Invalid Base64 string');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.inputLabel')}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 font-mono text-sm"
                        placeholder="Hello World"
                    />
                </div>

                <div className="flex gap-4">
                    <Button onClick={encode} className="flex-1">
                        {t('ui.encode')}
                    </Button>
                    <Button onClick={decode} variant="outline" className="flex-1">
                        {t('ui.decode')}
                    </Button>
                </div>
            </Card>

            {result && (
                <Card padding="lg" className="space-y-4 relative">
                    <div className="absolute top-4 right-4">
                        <Button
                            onClick={handleCopy}
                            variant="outline"
                            size="sm"
                            className={copied ? "bg-green-50 border-green-200 text-green-700" : ""}
                        >
                            {copied ? t('ui.copied') : t('ui.copy')}
                        </Button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.result')}
                        </label>
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md whitespace-pre-wrap h-32 overflow-y-auto font-mono text-sm break-all">
                            {result}
                        </div>
                    </div>
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
