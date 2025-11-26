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

export default function UuidGeneratorClient({ locale, content }: Props) {
    const t = useTranslations('Tools.uuid-generator');
    const [uuids, setUuids] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [version, setVersion] = useState('v4');

    const generateUUID = () => {
        const newUuids = [];
        for (let i = 0; i < quantity; i++) {
            newUuids.push(crypto.randomUUID());
        }
        setUuids(newUuids);
    };

    const handleCopy = () => {
        if (uuids.length === 0) return;
        navigator.clipboard.writeText(uuids.join('\n'));
        toast.success(t('ui.copied'));
    };

    const handleDownload = () => {
        if (uuids.length === 0) return;
        const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'uuids.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setUuids([]);
    };

    return (
        <EnhancedToolLayout
            {...content}
            toolId="uuid-generator"
            locale={locale}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.version')}
                        </label>
                        <select
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                            disabled
                        >
                            <option value="v4">{t('ui.v4')}</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.quantity')}
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.min(100, Math.max(1, Number(e.target.value))))}
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                        />
                    </div>

                    <div className="flex items-end">
                        <Button onClick={generateUUID} variant="primary" className="w-full">
                            {t('ui.generate')}
                        </Button>
                    </div>
                </div>

                {/* Output Section */}
                {uuids.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {t('ui.generated')} ({uuids.length})
                            </h3>
                            <div className="flex gap-2">
                                <Button onClick={handleCopy} variant="secondary" size="sm">
                                    {t('ui.copy')}
                                </Button>
                                <Button onClick={handleDownload} variant="outline" size="sm">
                                    {t('ui.download')}
                                </Button>
                                <Button onClick={handleClear} variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                    {t('ui.clear')}
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <textarea
                                value={uuids.join('\n')}
                                readOnly
                                className="w-full h-96 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm resize-none"
                            />
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
