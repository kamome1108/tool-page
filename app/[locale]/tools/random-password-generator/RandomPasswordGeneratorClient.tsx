'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface RandomPasswordGeneratorClientProps {
    locale: string;
}

export default function RandomPasswordGeneratorClient({ locale }: RandomPasswordGeneratorClientProps) {
    const t = useTranslations('Tools.random-password-generator');
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useLowercase, setUseLowercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('medium');

    const generatePassword = () => {
        let charset = '';
        if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (useNumbers) charset += '0123456789';
        if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (charset === '') {
            setPassword('');
            return;
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setPassword(newPassword);
        calculateStrength(newPassword);
    };

    const calculateStrength = (pwd: string) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.length >= 12) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        if (score < 3) setStrength('weak');
        else if (score < 5) setStrength('medium');
        else setStrength('strong');
    };

    useEffect(() => {
        generatePassword();
    }, []); // Generate on mount

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div className="relative">
                    <div className="bg-gray-100 p-4 rounded-md text-center font-mono text-xl break-all min-h-[3.5rem] flex items-center justify-center">
                        {password}
                    </div>
                    <div className={`absolute top-0 right-0 h-full w-2 rounded-r-md ${strength === 'weak' ? 'bg-red-500' :
                            strength === 'medium' ? 'bg-yellow-500' :
                                'bg-green-500'
                        }`} />
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                        {t('ui.strength')}: <span className={`${strength === 'weak' ? 'text-red-600' :
                                strength === 'medium' ? 'text-yellow-600' :
                                    'text-green-600'
                            }`}>{t(`ui.${strength}`)}</span>
                    </span>
                    <Button
                        onClick={handleCopy}
                        variant="outline"
                        size="sm"
                        className={copied ? "bg-green-50 border-green-200 text-green-700" : ""}
                    >
                        {copied ? t('ui.copied') : t('ui.copy')}
                    </Button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.length')}: {length}
                        </label>
                        <input
                            type="range"
                            min="4"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={useUppercase}
                                onChange={(e) => setUseUppercase(e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{t('ui.uppercase')}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={useLowercase}
                                onChange={(e) => setUseLowercase(e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{t('ui.lowercase')}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={useNumbers}
                                onChange={(e) => setUseNumbers(e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{t('ui.numbers')}</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={useSymbols}
                                onChange={(e) => setUseSymbols(e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{t('ui.symbols')}</span>
                        </label>
                    </div>
                </div>

                <Button onClick={generatePassword} className="w-full">
                    {t('ui.generate')}
                </Button>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
