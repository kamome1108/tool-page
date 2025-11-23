'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface AspectRatioCalculatorClientProps {
    locale: string;
}

export default function AspectRatioCalculatorClient({ locale }: AspectRatioCalculatorClientProps) {
    const t = useTranslations('Tools.aspect-ratio-calculator');
    const [width, setWidth] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>('');
    const [ratio, setRatio] = useState<string>('');
    const [newWidth, setNewWidth] = useState<number | ''>('');
    const [newHeight, setNewHeight] = useState<number | ''>('');
    const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);
    const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);

    const calculateRatio = () => {
        if (width && height) {
            const gcd = (a: number, b: number): number => {
                return b === 0 ? a : gcd(b, a % b);
            };
            const divisor = gcd(Number(width), Number(height));
            setRatio(`${Number(width) / divisor}:${Number(height) / divisor}`);
        }
    };

    const calculateNewDimensions = () => {
        if (!width || !height) return;

        const w = Number(width);
        const h = Number(height);
        const r = w / h;

        if (newWidth) {
            setCalculatedHeight(Math.round(Number(newWidth) / r));
            setCalculatedWidth(null);
        } else if (newHeight) {
            setCalculatedWidth(Math.round(Number(newHeight) * r));
            setCalculatedHeight(null);
        }
    };

    useEffect(() => {
        calculateRatio();
    }, [width, height]);

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.width')}
                        </label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="1920"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.height')}
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="1080"
                        />
                    </div>
                </div>

                {ratio && (
                    <div className="text-center p-4 bg-gray-50 rounded-md">
                        <div className="text-sm text-gray-500 mb-1">{t('ui.ratio')}</div>
                        <div className="text-2xl font-bold text-blue-600">{ratio}</div>
                    </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('ui.newWidth')}
                            </label>
                            <input
                                type="number"
                                value={newWidth}
                                onChange={(e) => {
                                    setNewWidth(e.target.value === '' ? '' : Number(e.target.value));
                                    setNewHeight('');
                                }}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="1280"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('ui.newHeight')}
                            </label>
                            <input
                                type="number"
                                value={newHeight}
                                onChange={(e) => {
                                    setNewHeight(e.target.value === '' ? '' : Number(e.target.value));
                                    setNewWidth('');
                                }}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="720"
                            />
                        </div>
                    </div>
                    <Button onClick={calculateNewDimensions} className="w-full">
                        {t('ui.calculate')}
                    </Button>
                </div>
            </Card>

            {(calculatedWidth !== null || calculatedHeight !== null) && (
                <Card padding="lg" className="bg-blue-50 border-blue-100 text-center">
                    <div className="text-sm text-gray-500 mb-1">{t('ui.result')}</div>
                    <div className="text-3xl font-bold text-blue-600">
                        {calculatedWidth !== null ? `${calculatedWidth} x ${newHeight}` : `${newWidth} x ${calculatedHeight}`}
                    </div>
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
