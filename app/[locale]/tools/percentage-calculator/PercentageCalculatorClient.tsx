'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface PercentageCalculatorClientProps {
    locale: string;
}

export default function PercentageCalculatorClient({ locale }: PercentageCalculatorClientProps) {
    const t = useTranslations('Tools.percentage-calculator');
    const [mode, setMode] = useState<'mode1' | 'mode2' | 'mode3'>('mode1');
    const [inputX, setInputX] = useState<number | ''>('');
    const [inputY, setInputY] = useState<number | ''>('');
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        if (inputX === '' || inputY === '') return;

        const x = Number(inputX);
        const y = Number(inputY);
        let res = 0;

        switch (mode) {
            case 'mode1': // What is X% of Y?
                res = (x / 100) * y;
                break;
            case 'mode2': // X is what % of Y?
                res = (x / y) * 100;
                break;
            case 'mode3': // Percentage change from X to Y
                res = ((y - x) / x) * 100;
                break;
        }

        setResult(res);
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.mode')}
                    </label>
                    <select
                        value={mode}
                        onChange={(e) => {
                            setMode(e.target.value as any);
                            setResult(null);
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="mode1">{t('ui.mode1')}</option>
                        <option value="mode2">{t('ui.mode2')}</option>
                        <option value="mode3">{t('ui.mode3')}</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.inputX')}
                        </label>
                        <input
                            type="number"
                            value={inputX}
                            onChange={(e) => setInputX(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.inputY')}
                        </label>
                        <input
                            type="number"
                            value={inputY}
                            onChange={(e) => setInputY(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full">
                    {t('ui.calculate')}
                </Button>
            </Card>

            {result !== null && (
                <Card padding="lg" className="bg-blue-50 border-blue-100 text-center">
                    <div className="text-sm text-gray-500 mb-1">{t('ui.result')}</div>
                    <div className="text-3xl font-bold text-blue-600">
                        {result.toFixed(2)}
                        {mode !== 'mode1' && '%'}
                    </div>
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
