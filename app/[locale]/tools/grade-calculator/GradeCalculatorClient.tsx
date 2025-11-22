'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface GradeCalculatorClientProps {
    locale: string;
}

export default function GradeCalculatorClient({ locale }: GradeCalculatorClientProps) {
    const t = useTranslations('Tools.grade-calculator');
    const [currentGrade, setCurrentGrade] = useState<number | ''>('');
    const [targetGrade, setTargetGrade] = useState<number | ''>('');
    const [finalWeight, setFinalWeight] = useState<number | ''>('');
    const [result, setResult] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const calculate = () => {
        const current = Number(currentGrade);
        const target = Number(targetGrade);
        const weight = Number(finalWeight);

        if (current >= 0 && target >= 0 && weight > 0 && weight <= 100) {
            const required = (target - current * (1 - weight / 100)) / (weight / 100);

            if (required > 100) {
                setResult(required);
                setMessage(t('ui.impossible'));
            } else if (required <= 0) {
                setResult(0);
                setMessage(t('ui.alreadyAchieved'));
            } else {
                setResult(required);
                setMessage(null);
            }
        }
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.currentGrade')}
                    </label>
                    <input
                        type="number"
                        value={currentGrade}
                        onChange={(e) => setCurrentGrade(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="85"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.targetGrade')}
                    </label>
                    <input
                        type="number"
                        value={targetGrade}
                        onChange={(e) => setTargetGrade(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="90"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.finalWeight')}
                    </label>
                    <input
                        type="number"
                        value={finalWeight}
                        onChange={(e) => setFinalWeight(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="20"
                    />
                </div>

                <Button onClick={calculate} className="w-full">
                    {t('ui.calculate')}
                </Button>
            </Card>

            {result !== null && (
                <Card padding="lg" className={`text-center ${result > 100 ? 'bg-red-50 border-red-100' : result <= 0 ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'}`}>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('ui.result')}</h3>
                    <div className={`text-4xl font-bold mb-2 ${result > 100 ? 'text-red-600' : result <= 0 ? 'text-green-600' : 'text-blue-600'}`}>
                        {result.toFixed(1)}%
                    </div>
                    {message && (
                        <div className={`text-sm ${result > 100 ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </div>
                    )}
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
