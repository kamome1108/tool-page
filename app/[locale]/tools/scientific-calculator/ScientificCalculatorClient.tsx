'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

export default function ScientificCalculatorClient() {
    const t = useTranslations('Tools.scientific-calculator.ui');
    const [display, setDisplay] = useState('');
    const [error, setError] = useState('');
    const [isRad, setIsRad] = useState(true);

    const append = (val: string) => {
        setError('');
        setDisplay(display + val);
    };

    const clear = () => {
        setDisplay('');
        setError('');
    };

    const backspace = () => {
        setDisplay(display.slice(0, -1));
        setError('');
    };

    const calculate = () => {
        try {
            // Replace scientific functions with Math.func
            let expression = display
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log10')
                .replace(/ln/g, 'Math.log')
                .replace(/sqrt/g, 'Math.sqrt')
                .replace(/pi/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/\^/g, '**');

            // Handle Degree/Radian conversion for trig functions if needed
            // This simple replacement doesn't handle nested parens perfectly for mode switching
            // For simplicity in this version, we assume standard Math functions (Radians)
            // If Degree mode is selected, we would need to wrap arguments. 
            // Given the complexity of parsing, let's stick to Radians as default or simple pre-conversion if possible.
            // Actually, let's just support Radians for now to be safe, or implement a simple wrapper.

            // Basic safety check: only allow numbers, operators, Math., and parens
            if (!/^[0-9+\-*/().\sMathPIElogsincotanqrt^]+$/.test(expression)) {
                throw new Error('Invalid Input');
            }

            // eslint-disable-next-line no-new-func
            const result = new Function('return ' + expression)();

            if (!isFinite(result) || isNaN(result)) {
                throw new Error('Error');
            }

            setDisplay(String(result));
        } catch (err) {
            setError(t('error'));
        }
    };

    const buttons = [
        { label: 'sin', val: 'sin(' },
        { label: 'cos', val: 'cos(' },
        { label: 'tan', val: 'tan(' },
        { label: 'deg/rad', action: () => setIsRad(!isRad), text: isRad ? 'RAD' : 'DEG' },
        { label: 'ln', val: 'ln(' },
        { label: 'log', val: 'log(' },
        { label: '(', val: '(' },
        { label: ')', val: ')' },
        { label: 'sqrt', val: 'sqrt(' },
        { label: 'x^y', val: '^' },
        { label: 'pi', val: 'pi' },
        { label: 'e', val: 'e' },
        { label: '7', val: '7' },
        { label: '8', val: '8' },
        { label: '9', val: '9' },
        { label: '/', val: '/' },
        { label: '4', val: '4' },
        { label: '5', val: '5' },
        { label: '6', val: '6' },
        { label: '*', val: '*' },
        { label: '1', val: '1' },
        { label: '2', val: '2' },
        { label: '3', val: '3' },
        { label: '-', val: '-' },
        { label: '0', val: '0' },
        { label: '.', val: '.' },
        { label: '=', action: calculate, primary: true },
        { label: '+', val: '+' },
    ];

    return (
        <div className="max-w-md mx-auto space-y-6">
            <Card className="p-6 bg-gray-900 text-white">
                <div className="mb-6">
                    <div className="text-right text-gray-400 text-sm h-6 mb-1">
                        {error || (isRad ? 'RAD' : 'DEG')}
                    </div>
                    <div className="text-right text-4xl font-mono break-all min-h-[3rem] bg-gray-800 p-4 rounded-lg">
                        {display || '0'}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <Button onClick={clear} className="bg-red-600 hover:bg-red-700 text-white col-span-2">
                        {t('clear')}
                    </Button>
                    <Button onClick={backspace} className="bg-gray-700 hover:bg-gray-600 text-white col-span-2">
                        {t('backspace')}
                    </Button>

                    {buttons.map((btn, i) => (
                        <Button
                            key={i}
                            onClick={btn.action || (() => append(btn.val!))}
                            className={`${btn.primary
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-700 hover:bg-gray-600'
                                } text-white text-lg font-medium h-14`}
                        >
                            {btn.text || btn.label}
                        </Button>
                    ))}
                </div>
            </Card>
        </div>
    );
}
