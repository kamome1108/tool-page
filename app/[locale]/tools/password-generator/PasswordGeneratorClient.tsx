'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '@/app/components/ToolLayout';
import { Button } from '@/app/components/ui/Button';

export default function PasswordGeneratorClient({ locale }: { locale: string }) {
    const t = useTranslations('Tools.password-generator');

    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
        };

        let chars = '';
        if (options.uppercase) chars += charset.uppercase;
        if (options.lowercase) chars += charset.lowercase;
        if (options.numbers) chars += charset.numbers;
        if (options.symbols) chars += charset.symbols;

        if (chars === '') {
            setPassword('');
            return;
        }

        let newPassword = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            newPassword += chars[array[i] % chars.length];
        }

        setPassword(newPassword);
        setCopied(false);
    }, [length, options]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title={t('meta.title')}
            description={t('meta.description')}
        >
            <div className="space-y-8">
                {/* Password Display */}
                <div className="relative">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between group hover:border-blue-300 transition-colors">
                        <code className="text-xl sm:text-2xl font-mono break-all text-gray-800">
                            {password}
                        </code>
                        <Button
                            onClick={copyToClipboard}
                            variant={copied ? 'primary' : 'secondary'}
                            size="sm"
                            className={copied ? 'bg-green-600 hover:bg-green-700 border-transparent' : ''}
                        >
                            {copied ? t('ui.copied') : t('ui.copy')}
                        </Button>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Length Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">{t('ui.length')}</label>
                            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                {length}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="4"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">{t('ui.characters')}</label>
                        <div className="space-y-2">
                            {Object.entries(options).map(([key, value]) => (
                                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() =>
                                            setOptions((prev) => ({ ...prev, [key]: !prev[key as keyof typeof options] }))
                                        }
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700 capitalize">
                                        {t(`ui.${key}`)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <Button
                    onClick={generatePassword}
                    variant="primary"
                    size="lg"
                    className="w-full font-semibold shadow-sm hover:shadow-md active:transform active:scale-[0.99]"
                >
                    {t('ui.generate')}
                </Button>

                {/* Security Note */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 flex items-start">
                    <span className="mr-2">🔒</span>
                    {t('ui.secureMessage')}
                </div>
            </div>
        </ToolLayout>
    );
}
