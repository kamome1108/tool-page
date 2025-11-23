'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function InstagramCaptionSpacerClient() {
    const t = useTranslations('Tools.instagram-caption-spacer.ui');
    const [text, setText] = useState('');

    const handleConvert = () => {
        if (!text) return;

        // Replace normal line breaks with line breaks containing invisible separator
        // Using the invisible separator (U+2800 Braille Pattern Blank) which is commonly used for this purpose
        const converted = text
            .split('\n')
            .map(line => line.trim() === '' ? '⠀' : line)
            .join('\n');

        navigator.clipboard.writeText(converted).then(() => {
            toast.success(t('converted'));
        });
    };

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('inputLabel')}
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                            placeholder={t('inputLabel')}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={handleConvert}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                            disabled={!text}
                        >
                            <span className="text-xl mr-2">✨</span>
                            {t('convert')}
                        </Button>

                        <Button
                            onClick={handleClear}
                            variant="outline"
                            disabled={!text}
                        >
                            {t('clear')}
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
