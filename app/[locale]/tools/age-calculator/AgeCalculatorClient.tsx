'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface AgeCalculatorClientProps {
    locale: string;
}

export default function AgeCalculatorClient({ locale }: AgeCalculatorClientProps) {
    const t = useTranslations('Tools.age-calculator');
    const [dob, setDob] = useState('');
    const [result, setResult] = useState<{
        years: number;
        months: number;
        days: number;
        nextBirthday: string;
        daysUntil: number;
        totalDays: number;
    } | null>(null);

    const calculateAge = () => {
        if (!dob) return;

        const birthDate = new Date(dob);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Next Birthday
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // Total Days
        const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

        setResult({
            years,
            months,
            days,
            nextBirthday: nextBirthday.toLocaleDateString(locale),
            daysUntil,
            totalDays
        });
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.dob')}
                    </label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <Button onClick={calculateAge} className="w-full">
                    {t('ui.calculate')}
                </Button>
            </Card>

            {result && (
                <Card padding="lg" className="space-y-6 bg-blue-50 border-blue-100">
                    <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">{t('ui.result')}</div>
                        <div className="text-3xl font-bold text-blue-600">
                            {result.years} <span className="text-lg font-normal text-gray-600">{t('ui.years')}</span>
                        </div>
                        <div className="flex justify-center gap-4 mt-2 text-gray-600">
                            <div>
                                <span className="font-bold">{result.months}</span> {t('ui.months')}
                            </div>
                            <div>
                                <span className="font-bold">{result.days}</span> {t('ui.days')}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-blue-200 pt-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">{t('ui.nextBirthday')}</span>
                            <span className="font-medium">{result.nextBirthday}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">{t('ui.daysUntil')}</span>
                            <span className="font-medium">{result.daysUntil}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">{t('ui.totalDays')}</span>
                            <span className="font-medium">{result.totalDays.toLocaleString(locale)}</span>
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
