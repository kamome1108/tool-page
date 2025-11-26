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

export default function UnixTimestampConverterClient({ locale, content }: Props) {
    const t = useTranslations('Tools.unix-timestamp-converter');
    const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [inputTimestamp, setInputTimestamp] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTimestamp(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const convertTimestamp = () => {
        const ts = parseInt(inputTimestamp);
        if (isNaN(ts)) {
            toast.error('Invalid timestamp');
            return;
        }

        // Check if milliseconds (roughly check digits)
        const isMs = inputTimestamp.length > 11;
        const date = new Date(isMs ? ts : ts * 1000);

        setResult(formatDate(date));
    };

    const convertDate = () => {
        const date = new Date(inputDate);
        if (isNaN(date.getTime())) {
            toast.error('Invalid date');
            return;
        }
        setResult(Math.floor(date.getTime() / 1000).toString());
    };

    const formatDate = (date: Date) => {
        return `
${t('ui.localTime')}: ${date.toLocaleString()}
${t('ui.gmtTime')}: ${date.toUTCString()}
${t('ui.relative')}: ${getRelativeTime(date)}
        `.trim();
    };

    const getRelativeTime = (date: Date) => {
        const diff = Math.floor((Date.now() - date.getTime()) / 1000);
        if (diff < 60) return `${diff} ${t('ui.seconds')} ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    };

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        toast.success(t('ui.copied'));
    };

    return (
        <EnhancedToolLayout
            {...content}
            toolId="unix-timestamp-converter"
            locale={locale}
        >
            <div className="space-y-8">
                {/* Current Timestamp */}
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                    <h2 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                        {t('ui.currentTimestamp')}
                    </h2>
                    <div className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400">
                        {currentTimestamp}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Timestamp to Date */}
                    <div className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {t('ui.convertTimestamp')}
                        </h3>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('ui.timestampInput')}
                            </label>
                            <input
                                type="number"
                                value={inputTimestamp}
                                onChange={(e) => setInputTimestamp(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                                placeholder="1678900000"
                            />
                            <Button onClick={convertTimestamp} variant="primary" className="w-full">
                                {t('ui.convert')}
                            </Button>
                        </div>
                    </div>

                    {/* Date to Timestamp */}
                    <div className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {t('ui.convertDate')}
                        </h3>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('ui.dateInput')}
                            </label>
                            <input
                                type="datetime-local"
                                value={inputDate}
                                onChange={(e) => setInputDate(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                            />
                            <Button onClick={convertDate} variant="primary" className="w-full">
                                {t('ui.convert')}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Result */}
                {result && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.result')}
                        </label>
                        <div className="relative">
                            <textarea
                                value={result}
                                readOnly
                                className="w-full h-32 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
                            />
                            <div className="absolute top-2 right-2">
                                <Button onClick={handleCopy} variant="secondary" size="sm">
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
