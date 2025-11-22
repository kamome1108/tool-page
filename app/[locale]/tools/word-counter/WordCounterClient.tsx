'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface WordCounterClientProps {
    locale: string;
}

export default function WordCounterClient({ locale }: WordCounterClientProps) {
    const t = useTranslations('Tools.word-counter');
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        characters: 0,
        sentences: 0,
        paragraphs: 0
    });

    useEffect(() => {
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const characters = text.length;
        const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;

        setStats({
            words,
            characters,
            sentences,
            paragraphs
        });
    }, [text]);

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card padding="sm" className="text-center bg-blue-50 border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">{stats.words}</div>
                    <div className="text-sm text-gray-600">{t('ui.stats.words')}</div>
                </Card>
                <Card padding="sm" className="text-center bg-green-50 border-green-100">
                    <div className="text-2xl font-bold text-green-600">{stats.characters}</div>
                    <div className="text-sm text-gray-600">{t('ui.stats.characters')}</div>
                </Card>
                <Card padding="sm" className="text-center bg-purple-50 border-purple-100">
                    <div className="text-2xl font-bold text-purple-600">{stats.sentences}</div>
                    <div className="text-sm text-gray-600">{t('ui.stats.sentences')}</div>
                </Card>
                <Card padding="sm" className="text-center bg-orange-50 border-orange-100 md:col-span-3">
                    <div className="text-2xl font-bold text-orange-600">{stats.paragraphs}</div>
                    <div className="text-sm text-gray-600">{t('ui.stats.paragraphs')}</div>
                </Card>
            </div>

            <Card padding="md" className="space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
                    placeholder={t('ui.input')}
                />
                <div className="flex justify-end">
                    <Button onClick={handleClear} variant="outline">
                        {t('ui.clear')}
                    </Button>
                </div>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
