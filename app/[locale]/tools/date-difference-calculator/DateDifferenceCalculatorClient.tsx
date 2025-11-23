'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

export default function DateDifferenceCalculatorClient() {
    const t = useTranslations('Tools.date-difference-calculator.ui');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);

    const calculateDifference = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calculate total days difference
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Calculate years, months, days
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            // Get days in previous month
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Handle case where end date is before start date
        if (end < start) {
            // Simple swap logic for display, or just use absolute values as above logic handles positive diffs mostly
            // But for precise Y/M/D it's better to ensure start < end for calculation
            const tempStart = new Date(Math.min(start.getTime(), end.getTime()));
            const tempEnd = new Date(Math.max(start.getTime(), end.getTime()));

            let y = tempEnd.getFullYear() - tempStart.getFullYear();
            let m = tempEnd.getMonth() - tempStart.getMonth();
            let d = tempEnd.getDate() - tempStart.getDate();

            if (d < 0) {
                m--;
                const prevMonth = new Date(tempEnd.getFullYear(), tempEnd.getMonth(), 0);
                d += prevMonth.getDate();
            }
            if (m < 0) {
                y--;
                m += 12;
            }
            years = y;
            months = m;
            days = d;
        }

        setResult({ years, months, days, totalDays });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('startDate')}
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('endDate')}
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        onClick={calculateDifference}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                        disabled={!startDate || !endDate}
                    >
                        {t('calculate')}
                    </Button>
                </div>

                {result && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                            {t('result')}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl font-bold text-blue-600">{result.years}</div>
                                <div className="text-sm text-gray-500">{t('years')}</div>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl font-bold text-blue-600">{result.months}</div>
                                <div className="text-sm text-gray-500">{t('months')}</div>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl font-bold text-blue-600">{result.days}</div>
                                <div className="text-sm text-gray-500">{t('days')}</div>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-indigo-500">
                                <div className="text-2xl font-bold text-indigo-600">{result.totalDays.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">{t('totalDays')}</div>
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
