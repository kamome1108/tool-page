'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface CompoundInterestCalculatorClientProps {
    locale: string;
}

type Frequency = 'daily' | 'monthly' | 'quarterly' | 'annually';

export default function CompoundInterestCalculatorClient({ locale }: CompoundInterestCalculatorClientProps) {
    const t = useTranslations('Tools.compound-interest-calculator');
    const [principal, setPrincipal] = useState<number | ''>('');
    const [rate, setRate] = useState<number | ''>('');
    const [time, setTime] = useState<number | ''>('');
    const [frequency, setFrequency] = useState<Frequency>('annually');
    const [result, setResult] = useState<{ totalAmount: number; interestEarned: number } | null>(null);

    const frequencies: Frequency[] = ['daily', 'monthly', 'quarterly', 'annually'];

    const calculate = () => {
        const p = Number(principal);
        const r = Number(rate) / 100;
        const tVal = Number(time);
        let n = 1;

        switch (frequency) {
            case 'daily': n = 365; break;
            case 'monthly': n = 12; break;
            case 'quarterly': n = 4; break;
            case 'annually': n = 1; break;
        }

        if (p > 0 && r >= 0 && tVal > 0) {
            const amount = p * Math.pow((1 + r / n), n * tVal);
            const interest = amount - p;
            setResult({
                totalAmount: amount,
                interestEarned: interest
            });
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'USD', // Defaulting to USD for simplicity, could be dynamic
            maximumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card padding="lg" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.principal')}
                        </label>
                        <input
                            type="number"
                            value={principal}
                            onChange={(e) => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="10000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.rate')}
                        </label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="5"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.time')}
                        </label>
                        <input
                            type="number"
                            value={time}
                            onChange={(e) => setTime(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.frequency')}
                        </label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value as Frequency)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {frequencies.map((freq) => (
                                <option key={freq} value={freq}>
                                    {t(`ui.frequencies.${freq}`)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Button onClick={calculate} className="w-full">
                    {t('ui.calculate')}
                </Button>
            </Card>

            {result && (
                <Card padding="lg" className="bg-blue-50 border-blue-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">{t('ui.result')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <div className="text-sm text-gray-500 mb-1">{t('ui.totalAmount')}</div>
                            <div className="text-2xl font-bold text-blue-600">{formatCurrency(result.totalAmount)}</div>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <div className="text-sm text-gray-500 mb-1">{t('ui.interestEarned')}</div>
                            <div className="text-2xl font-bold text-green-600">{formatCurrency(result.interestEarned)}</div>
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
