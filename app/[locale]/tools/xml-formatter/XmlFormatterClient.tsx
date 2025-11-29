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

export default function XmlFormatterClient({ locale, content }: Props) {
    const t = useTranslations('Tools.xml-formatter');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [formatter, setFormatter] = useState<any>(null);

    useEffect(() => {
        const loadFormatter = async () => {
            const xmlFormatter = await import('xml-formatter');
            setFormatter(() => xmlFormatter.default);
        };
        loadFormatter();
    }, []);

    const format = () => {
        try {
            if (!input.trim() || !formatter) {
                setOutput('');
                return;
            }

            const formatted = formatter(input, {
                indentation: '  ',
                collapseContent: true,
                lineSeparator: '\n'
            });

            setOutput(formatted);
            toast.success(t('ui.success'));
        } catch (error) {
            toast.error(t('ui.error'));
        }
    };

    const minify = () => {
        try {
            if (!input.trim() || !formatter) {
                setOutput('');
                return;
            }

            const minified = formatter(input, {
                indentation: '',
                collapseContent: true,
                lineSeparator: ''
            });

            setOutput(minified);
            toast.success(t('ui.minifySuccess'));
        } catch (error) {
            toast.error(t('ui.error'));
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success(t('ui.copied'));
    };

    const clear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <EnhancedToolLayout
            {...content}
            title={content.meta.title}
            toolId="xml-formatter"
            locale={locale}
        >
            <div className="space-y-6">
                {/* Input Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('ui.inputLabel')}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-64 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                        placeholder={t('ui.inputPlaceholder')}
                        spellCheck={false}
                    />
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-4">
                    <Button onClick={format} variant="primary">
                        {t('ui.format')}
                    </Button>
                    <Button onClick={minify} variant="secondary">
                        {t('ui.minify')}
                    </Button>
                    <Button onClick={clear} variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        {t('ui.clear')}
                    </Button>
                </div>

                {/* Output Section */}
                {output && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.outputLabel')}
                        </label>
                        <div className="relative">
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-64 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm resize-none"
                            />
                            <div className="absolute top-2 right-2">
                                <Button
                                    onClick={copyToClipboard}
                                    variant="secondary"
                                    size="sm"
                                >
                                    {t('ui.copy')}
                                </Button>
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
