'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface DiscountCalculatorClientProps {
    locale: string;
}

export default function DiscountCalculatorClient({ locale }: DiscountCalculatorClientProps) {
    const t = useTranslations('Tools.discount-calculator');
    const [originalPrice, setOriginalPrice] = useState<number | ''>('');
    const [discount, setDiscount] = useState<number | ''>('');
    const [tax, setTax] = useState<number | ''>('');
    const [finalPrice, setFinalPrice] = useState<number | null>(null);
    const [savedAmount, setSavedAmount] = useState<number | null>(null);
    const [taxAmount, setTaxAmount] = useState<number | null>(null);

    const calculate = () => {
        const price = Number(originalPrice);
        const discountRate = Number(discount);
        const taxRate = Number(tax);

        if (isNaN(price) || isNaN(discountRate)) return;

        const discountValue = price * (discountRate / 100);
        const priceAfterDiscount = price - discountValue;

        let taxValue = 0;
        if (!isNaN(taxRate)) {
            taxValue = priceAfterDiscount * (taxRate / 100);
        }

        const total = priceAfterDiscount + taxValue;

        setSavedAmount(discountValue);
        setTaxAmount(taxValue);
        setFinalPrice(total);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'USD', // Default to USD, ideally this should be dynamic based on locale or user selection
            currencyDisplay: 'narrowSymbol',
        }).format(value).replace('$', ''); // Remove currency symbol for generic display if needed, or keep it
    };

    // Helper to just format number with 2 decimals
    const formatNumber = (value: number) => {
        return value.toLocaleString(locale, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.originalPrice')}
                    </label>
                    <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1000"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.discount')}
                        </label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.tax')}
                        </label>
                        <input
                            type="number"
                            value={tax}
                            onChange={(e) => setTax(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="10"
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full">
                    {t('ui.calculate')}
                </Button>
            </Card>

            {finalPrice !== null && (
                <div className="space-y-4">
                    <Card padding="lg" className="bg-blue-50 border-blue-100 text-center">
                        <div className="text-sm text-gray-500 mb-1">{t('ui.finalPrice')}</div>
                        <div className="text-4xl font-bold text-blue-600">
                            {formatNumber(finalPrice)}
                        </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card padding="md" className="text-center bg-green-50 border-green-100">
                            <div className="text-xs text-gray-500 mb-1">{t('ui.youSave')}</div>
                            <div className="text-xl font-bold text-green-600">
                                {savedAmount !== null ? formatNumber(savedAmount) : '-'}
                            </div>
                        </Card>
                        <Card padding="md" className="text-center bg-gray-50 border-gray-200">
                            <div className="text-xs text-gray-500 mb-1">{t('ui.taxAmount')}</div>
                            <div className="text-xl font-bold text-gray-600">
                                {taxAmount !== null ? formatNumber(taxAmount) : '-'}
                            </div>
                        </Card>
                    </div>
                </div>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
