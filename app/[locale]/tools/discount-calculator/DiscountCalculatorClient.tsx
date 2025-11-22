'use client';

import { useState, useEffect } from 'react';
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
    const [savings, setSavings] = useState<number | null>(null);

    const calculate = () => {
        const price = Number(originalPrice) || 0;
        const discountRate = Number(discount) || 0;
        const taxRate = Number(tax) || 0;

        const discountAmount = price * (discountRate / 100);
        const priceAfterDiscount = price - discountAmount;
        const taxAmount = priceAfterDiscount * (taxRate / 100);
        const final = priceAfterDiscount + taxAmount;

        setFinalPrice(final);
        setSavings(price - final + taxAmount); // Savings is essentially discount amount, but let's show net difference if tax is involved? Usually savings = discount amount.
        // Let's define savings as simply the discount amount for clarity, or (Original + Tax on Original) - Final?
        // Standard simple calc: Savings = Original Price - Final Price (if tax is included in original? No).
        // Let's stick to: Savings = Discount Amount. Tax is extra cost.
        setSavings(discountAmount);
    };

    const handleReset = () => {
        setOriginalPrice('');
        setDiscount('');
        setTax('');
        setFinalPrice(null);
        setSavings(null);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card padding="md" className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('ui.originalPrice')}
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('ui.discount')}
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('ui.tax')}
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={tax}
                            onChange={(e) => setTax(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex space-x-4 pt-2">
                        <Button onClick={calculate} className="flex-1">
                            {t('ui.calculate')}
                        </Button>
                        <Button variant="secondary" onClick={handleReset}>
                            {t('ui.reset')}
                        </Button>
                    </div>
                </Card>

                {/* Result Section */}
                <Card padding="md" className="bg-gray-50 flex flex-col justify-center items-center space-y-6">
                    <div className="text-center">
                        <h3 className="text-gray-500 text-sm uppercase tracking-wide mb-1">{t('ui.finalPrice')}</h3>
                        <p className="text-4xl font-bold text-blue-600">
                            {finalPrice !== null ? finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-gray-500 text-sm uppercase tracking-wide mb-1">{t('ui.youSave')}</h3>
                        <p className="text-2xl font-semibold text-green-600">
                            {savings !== null ? savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
                        </p>
                    </div>
                </Card>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
