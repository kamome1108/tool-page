'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/app/components/ui/Card';

interface UnitConverterClientProps {
    locale: string;
}

type Category = 'length' | 'weight' | 'temperature';

export default function UnitConverterClient({ locale }: UnitConverterClientProps) {
    const t = useTranslations('Tools.unit-converter');
    const [category, setCategory] = useState<Category>('length');
    const [fromUnit, setFromUnit] = useState('meters');
    const [toUnit, setToUnit] = useState('feet');
    const [inputValue, setInputValue] = useState<number | ''>('');
    const [result, setResult] = useState<number | null>(null);

    const categories: Category[] = ['length', 'weight', 'temperature'];

    const units: Record<Category, string[]> = {
        length: ['meters', 'kilometers', 'centimeters', 'millimeters', 'inches', 'feet', 'yards', 'miles'],
        weight: ['kilograms', 'grams', 'milligrams', 'pounds', 'ounces'],
        temperature: ['celsius', 'fahrenheit', 'kelvin']
    };

    // Reset units when category changes
    useEffect(() => {
        setFromUnit(units[category][0]);
        setToUnit(units[category][1]);
        setInputValue('');
        setResult(null);
    }, [category]);

    useEffect(() => {
        if (inputValue === '') {
            setResult(null);
            return;
        }

        const val = Number(inputValue);
        if (isNaN(val)) {
            setResult(null);
            return;
        }

        let converted = val;

        // Conversion logic
        if (category === 'length') {
            // Convert to meters first
            let meters = val;
            switch (fromUnit) {
                case 'kilometers': meters = val * 1000; break;
                case 'centimeters': meters = val / 100; break;
                case 'millimeters': meters = val / 1000; break;
                case 'inches': meters = val * 0.0254; break;
                case 'feet': meters = val * 0.3048; break;
                case 'yards': meters = val * 0.9144; break;
                case 'miles': meters = val * 1609.34; break;
            }

            // Convert from meters to target
            switch (toUnit) {
                case 'meters': converted = meters; break;
                case 'kilometers': converted = meters / 1000; break;
                case 'centimeters': converted = meters * 100; break;
                case 'millimeters': converted = meters * 1000; break;
                case 'inches': converted = meters / 0.0254; break;
                case 'feet': converted = meters / 0.3048; break;
                case 'yards': converted = meters / 0.9144; break;
                case 'miles': converted = meters / 1609.34; break;
            }
        } else if (category === 'weight') {
            // Convert to grams first
            let grams = val;
            switch (fromUnit) {
                case 'kilograms': grams = val * 1000; break;
                case 'milligrams': grams = val / 1000; break;
                case 'pounds': grams = val * 453.592; break;
                case 'ounces': grams = val * 28.3495; break;
            }

            // Convert from grams to target
            switch (toUnit) {
                case 'grams': converted = grams; break;
                case 'kilograms': converted = grams / 1000; break;
                case 'milligrams': converted = grams * 1000; break;
                case 'pounds': converted = grams / 453.592; break;
                case 'ounces': converted = grams / 28.3495; break;
            }
        } else if (category === 'temperature') {
            // Convert to Celsius first
            let celsius = val;
            if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5 / 9;
            else if (fromUnit === 'kelvin') celsius = val - 273.15;

            // Convert from Celsius to target
            if (toUnit === 'celsius') converted = celsius;
            else if (toUnit === 'fahrenheit') converted = (celsius * 9 / 5) + 32;
            else if (toUnit === 'kelvin') converted = celsius + 273.15;
        }

        setResult(converted);
    }, [inputValue, fromUnit, toUnit, category]);

    return (
        <div className="space-y-6">
            <Card padding="md" className="space-y-6">
                {/* Category Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.category')}
                    </label>
                    <div className="flex space-x-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${category === cat
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {t(`ui.categories.${cat}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* From Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            {t('ui.from')}
                        </label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            {units[category].map((unit) => (
                                <option key={unit} value={unit}>
                                    {t(`ui.units.${unit}`)}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                            placeholder="0"
                        />
                    </div>

                    {/* To Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            {t('ui.to')}
                        </label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            {units[category].map((unit) => (
                                <option key={unit} value={unit}>
                                    {t(`ui.units.${unit}`)}
                                </option>
                            ))}
                        </select>
                        <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md text-lg font-medium min-h-[54px] flex items-center">
                            {result !== null ? Number(result.toFixed(4)) : '-'}
                        </div>
                    </div>
                </div>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
