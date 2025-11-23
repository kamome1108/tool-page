'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

export default function LoanCalculatorClient() {
    const t = useTranslations('Tools.loan-calculator.ui');
    const [amount, setAmount] = useState<number | ''>('');
    const [rate, setRate] = useState<number | ''>('');
    const [term, setTerm] = useState<number | ''>('');
    const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

    const calculateLoan = () => {
        if (!amount || !rate || !term) return;

        const principal = Number(amount);
        const annualRate = Number(rate) / 100;
        const monthlyRate = annualRate / 12;
        const months = Number(term) * 12;

        // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        let monthlyPayment = 0;

        if (monthlyRate === 0) {
            monthlyPayment = principal / months;
        } else {
            monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        }

        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - principal;

        setResult({
            monthly: monthlyPayment,
            total: totalPayment,
            interest: totalInterest,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value).replace('$', t('currency'));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('amount')}
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="10000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('interestRate')}
                        </label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="5.0"
                            step="0.1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('term')}
                        </label>
                        <input
                            type="number"
                            value={term}
                            onChange={(e) => setTerm(e.target.value ? Number(e.target.value) : '')}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="5"
                        />
                    </div>
                </div>

                <Button
                    onClick={calculateLoan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!amount || !rate || !term}
                >
                    {t('calculate')}
                </Button>

                {result && (
                    <div className="mt-8 space-y-6 animate-fade-in">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                            {t('result')}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                <div className="text-sm text-blue-600 font-medium mb-1">{t('monthlyPayment')}</div>
                                <div className="text-2xl font-bold text-blue-900">{formatCurrency(result.monthly)}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                                <div className="text-sm text-gray-500 font-medium mb-1">{t('totalInterest')}</div>
                                <div className="text-xl font-semibold text-gray-900">{formatCurrency(result.interest)}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                                <div className="text-sm text-gray-500 font-medium mb-1">{t('totalPayment')}</div>
                                <div className="text-xl font-semibold text-gray-900">{formatCurrency(result.total)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
