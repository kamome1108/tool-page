'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface UrlEncoderDecoderClientProps {
    locale: string;
}

export default function UrlEncoderDecoderClient({ locale }: UrlEncoderDecoderClientProps) {
    const t = useTranslations('Tools.url-encoder-decoder');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleEncode = () => {
        setError('');
        try {
            setOutput(encodeURIComponent(input));
        } catch (e) {
            setError(t('ui.error'));
        }
    };

    const handleDecode = () => {
        setError('');
        try {
            setOutput(decodeURIComponent(input));
        } catch (e) {
            setError(t('ui.error'));
        }
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError('');
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card padding="md" className="space-y-4 h-full flex flex-col">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('ui.input')}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[200px]"
                        placeholder="https://example.com/search?q=hello world"
                    />
                    <div className="flex space-x-2 pt-2">
                        <Button onClick={handleEncode} className="flex-1">
                            {t('ui.encode')}
                        </Button>
                        <Button onClick={handleDecode} className="flex-1" variant="secondary">
                            {t('ui.decode')}
                        </Button>
                        <Button onClick={handleClear} variant="outline">
                            {t('ui.clear')}
                        </Button>
                    </div>
                </Card>

                {/* Output Section */}
                <Card padding="md" className="space-y-4 h-full flex flex-col bg-gray-50">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            {t('ui.output')}
                        </label>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopy}
                            className={copied ? "text-green-600 border-green-600" : ""}
                        >
                            {copied ? t('ui.copied') : t('ui.copy')}
                        </Button>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        className={`w-full flex-1 p-3 border rounded-md resize-none min-h-[200px] focus:outline-none ${error ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-300 bg-white'
                            }`}
                        placeholder={error || ""}
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </Card>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
