'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface UnixTimestampConverterClientProps {
    locale: string;
}

export default function UnixTimestampConverterClient({ locale }: UnixTimestampConverterClientProps) {
    const t = useTranslations('Tools.unix-timestamp-converter');
    const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
    const [inputTimestamp, setInputTimestamp] = useState<string>('');
    const [inputDate, setInputDate] = useState<string>('');
    const [resultDate, setResultDate] = useState<string>('');
    const [resultTimestamp, setResultTimestamp] = useState<string>('');
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTimestamp(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const convertToDate = () => {
        if (!inputTimestamp) return;
        const ts = Number(inputTimestamp);
        // Check if it's seconds or milliseconds (heuristic: if > 10000000000, assume ms)
        const date = new Date(ts > 10000000000 ? ts : ts * 1000);
        setResultDate(date.toLocaleString(locale));
    };

    const convertToTimestamp = () => {
        if (!inputDate) return;
        const date = new Date(inputDate);
        setResultTimestamp(Math.floor(date.getTime() / 1000).toString());
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <Card padding="lg" className="text-center bg-blue-50 border-blue-100">
                <div className="text-sm text-gray-500 mb-2">{t('ui.currentTimestamp')}</div>
                <div className="text-4xl font-mono font-bold text-blue-600 tracking-wider">
                    {currentTimestamp}
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Timestamp to Date */}
                <Card padding="lg" className="space-y-4">
                    <h3 className="font-semibold text-gray-900">{t('ui.convertTimestamp')}</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.timestampInput')}
                        </label>
                        <input
                            type="number"
                            value={inputTimestamp}
                            onChange={(e) => setInputTimestamp(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                            placeholder="1672531200"
                        />
                    </div>
                    <Button onClick={convertToDate} className="w-full">
                        {t('ui.convert')}
                    </Button>
                    {resultDate && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200 relative">
                            <div className="text-sm text-gray-500 mb-1">{t('ui.result')}</div>
                            <div className="font-medium break-all">{resultDate}</div>
                            <button
                                onClick={() => handleCopy(resultDate, 'date')}
                                className="absolute top-2 right-2 text-xs text-blue-600 hover:text-blue-800"
                            >
                                {copied === 'date' ? t('ui.copied') : t('ui.copy')}
                            </button>
                        </div>
                    )}
                </Card>

                {/* Date to Timestamp */}
                <Card padding="lg" className="space-y-4">
                    <h3 className="font-semibold text-gray-900">{t('ui.convertDate')}</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.dateInput')}
                        </label>
                        <input
                            type="datetime-local"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <Button onClick={convertToTimestamp} className="w-full">
                        {t('ui.convert')}
                    </Button>
                    {resultTimestamp && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200 relative">
                            <div className="text-sm text-gray-500 mb-1">{t('ui.result')}</div>
                            <div className="font-mono font-medium">{resultTimestamp}</div>
                            <button
                                onClick={() => handleCopy(resultTimestamp, 'ts')}
                                className="absolute top-2 right-2 text-xs text-blue-600 hover:text-blue-800"
                            >
                                {copied === 'ts' ? t('ui.copied') : t('ui.copy')}
                            </button>
                        </div>
                    )}
                </Card>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
