'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';
import { Button } from '@/app/components/ui/Button';
import toast from 'react-hot-toast';
import { ToolContent } from '@/app/types/tool';

interface Props {
    locale: string;
    content: ToolContent;
}

export default function Base64EncoderDecoderClient({ locale, content }: Props) {
    const t = useTranslations('Tools.base64-encoder-decoder');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleEncode = () => {
        try {
            const encoded = btoa(unescape(encodeURIComponent(input)));
            setOutput(encoded);
        } catch (e) {
            toast.error('Error encoding text');
        }
    };

    const handleDecode = () => {
        try {
            const decoded = decodeURIComponent(escape(atob(input)));
            setOutput(decoded);
        } catch (e) {
            toast.error('Invalid Base64 string');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success(t('ui.copied'));
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <EnhancedToolLayout
            {...content}
            title={content.meta.title}
            toolId="base64-encoder-decoder"
            locale={locale}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.inputLabel')}
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-64 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                            placeholder="Hello World"
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleEncode} variant="primary" className="flex-1">
                                {t('ui.encode')}
                            </Button>
                            <Button onClick={handleDecode} variant="secondary" className="flex-1">
                                {t('ui.decode')}
                            </Button>
                            <Button onClick={handleClear} variant="outline">
                                {t('ui.clear')}
                            </Button>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.outputLabel')}
                        </label>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-64 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
                        />
                        <Button onClick={handleCopy} variant="secondary" className="w-full" disabled={!output}>
                            {t('ui.copy')}
                        </Button>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {t('ui.processingNote')}
                </div>
            </div>
        </EnhancedToolLayout>
    );
}
