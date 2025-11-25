'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function JsonMinifierClient() {
    const t = useTranslations('Tools.json-minifier.ui');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const minify = () => {
        try {
            if (!input.trim()) {
                setOutput('');
                return;
            }
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            toast.success(t('success'));
        } catch (error) {
            toast.error(t('error'));
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success(t('copied'));
    };

    const clear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('inputLabel')}</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('inputPlaceholder')}
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <Button onClick={minify} className="bg-blue-600 hover:bg-blue-700 text-white">
                        {t('minify')}
                    </Button>
                    <Button onClick={clear} variant="ghost" className="text-red-600 hover:text-red-700">
                        {t('clear')}
                    </Button>
                </div>

                {output && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('outputLabel')}</label>
                        <div className="relative">
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
                            />
                            <Button
                                onClick={copyToClipboard}
                                className="absolute top-2 right-2 bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
                                size="sm"
                            >
                                {t('copy')}
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
