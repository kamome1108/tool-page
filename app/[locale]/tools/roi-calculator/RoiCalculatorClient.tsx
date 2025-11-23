'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface RoiCalculatorClientProps {
    locale: string;
}

export default function RoiCalculatorClient({ locale }: RoiCalculatorClientProps) {
    const t = useTranslations('Tools.roi-calculator');
    const [invested, setInvested] = useState<number | ''>('');
    const [returned, setReturned] = useState<number | ''>('');
    const [duration, setDuration] = useState<number | ''>('');
    const [result, setResult] = useState<{ roi: number; annualized: number; gain: number } | null>(null);

    const calculateROI = () => {
        if (invested === '' || returned === '' || duration === '') return;

        const gain = Number(returned) - Number(invested);
        const roi = (gain / Number(invested)) * 100;
        const years = Number(duration);

        let annualized = 0;
        if (years > 0) {
            annualized = ((Math.pow((Number(returned) / Number(invested)), (1 / years))) - 1) * 100;
        }

        setResult({
            roi,
            annualized,
            gain
        });
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.invested')}
                    </label>
                    <input
                        type="number"
                        value={invested}
                        onChange={(e) => setInvested(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.returned')}
                    </label>
                    <input
                        type="number"
                        value={returned}
                        onChange={(e) => setReturned(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.duration')}
                    </label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1"
                    />
                </div>

                <Button onClick={calculateROI} className="w-full">
                    {t('ui.calculate')}
                </Button>
            </Card>

            {result && (
                <Card padding="lg" className="space-y-4 bg-blue-50 border-blue-100">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-gray-500">{t('ui.result')}</div>
                            <div className="text-2xl font-bold text-blue-600">{result.roi.toFixed(2)}%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">{t('ui.annualized')}</div>
                            <div className="text-2xl font-bold text-blue-600">{result.annualized.toFixed(2)}%</div>
                        </div>
                        <div className="col-span-2 pt-4 border-t border-blue-200">
                            <div className="text-sm text-gray-500">{t('ui.gain')}</div>
                            <div className={`text-xl font-bold ${result.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {result.gain >= 0 ? '+' : ''}{result.gain.toFixed(2)}
                            </div>
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
