'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/app/components/ui/Card';

interface PasswordStrengthCheckerClientProps {
    locale: string;
}

export default function PasswordStrengthCheckerClient({ locale }: PasswordStrengthCheckerClientProps) {
    const t = useTranslations('Tools.password-strength-checker');
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [feedback, setFeedback] = useState<string[]>([]);

    const checkStrength = (pass: string) => {
        let score = 0;
        const issues: string[] = [];

        if (!pass) {
            setStrength(0);
            setFeedback([]);
            return;
        }

        // Length
        if (pass.length >= 8) score++;
        else issues.push('length');

        // Uppercase
        if (/[A-Z]/.test(pass)) score++;
        else issues.push('uppercase');

        // Lowercase
        if (/[a-z]/.test(pass)) score++;
        else issues.push('lowercase');

        // Numbers
        if (/[0-9]/.test(pass)) score++;
        else issues.push('numbers');

        // Symbols
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        else issues.push('symbols');

        setStrength(Math.min(score, 4));
        setFeedback(issues);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPassword(val);
        checkStrength(val);
    };

    const getStrengthColor = (score: number) => {
        switch (score) {
            case 0: return 'bg-gray-300';
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4: return 'bg-green-500';
            default: return 'bg-gray-300';
        }
    };

    const getStrengthLabel = (score: number) => {
        return t(`ui.levels.${score}`);
    };

    return (
        <div className="space-y-6">
            <Card padding="md" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.input')}
                    </label>
                    <input
                        type="text" // Using text type for visibility as requested in plan (toggle visibility is better but simple text is fine for tool)
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        placeholder="P@ssw0rd123"
                    />
                </div>

                {password && (
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{t('ui.strength')}</span>
                                <span className="text-sm font-medium text-gray-700">{getStrengthLabel(strength)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full transition-all duration-300 ${getStrengthColor(strength)}`}
                                    style={{ width: `${(strength / 4) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {feedback.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                <h4 className="text-sm font-semibold text-yellow-800 mb-2">{t('ui.suggestions')}</h4>
                                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                                    {feedback.map((issue) => (
                                        <li key={issue}>{t(`ui.criteria.${issue}`)}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
