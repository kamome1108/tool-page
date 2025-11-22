'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface LoremIpsumGeneratorClientProps {
    locale: string;
}

export default function LoremIpsumGeneratorClient({ locale }: LoremIpsumGeneratorClientProps) {
    const t = useTranslations('Tools.lorem-ipsum-generator');
    const [count, setCount] = useState(3);
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [generatedText, setGeneratedText] = useState('');
    const [copied, setCopied] = useState(false);

    const generateText = () => {
        // Simple Lorem Ipsum generator logic
        const words = [
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
            "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
            "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
            "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
            "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
            "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
            "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
            "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
        ];

        const generateSentence = () => {
            const length = Math.floor(Math.random() * 10) + 5;
            let sentence = "";
            for (let i = 0; i < length; i++) {
                sentence += words[Math.floor(Math.random() * words.length)] + " ";
            }
            return sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1) + ".";
        };

        const generateParagraph = () => {
            const length = Math.floor(Math.random() * 5) + 3;
            let paragraph = "";
            for (let i = 0; i < length; i++) {
                paragraph += generateSentence() + " ";
            }
            return paragraph.trim();
        };

        let result = "";
        if (type === 'words') {
            for (let i = 0; i < count; i++) {
                result += words[Math.floor(Math.random() * words.length)] + " ";
            }
            result = result.trim();
        } else if (type === 'sentences') {
            for (let i = 0; i < count; i++) {
                result += generateSentence() + " ";
            }
            result = result.trim();
        } else {
            for (let i = 0; i < count; i++) {
                result += generateParagraph() + "\n\n";
            }
            result = result.trim();
        }

        setGeneratedText(result);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card padding="lg" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.count')}
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.type')}
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as any)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="paragraphs">{t('ui.paragraphs')}</option>
                            <option value="sentences">{t('ui.sentences')}</option>
                            <option value="words">{t('ui.words')}</option>
                        </select>
                    </div>
                </div>

                <Button onClick={generateText} className="w-full">
                    {t('ui.generate')}
                </Button>
            </Card>

            {generatedText && (
                <Card padding="lg" className="space-y-4 relative">
                    <div className="absolute top-4 right-4">
                        <Button
                            onClick={handleCopy}
                            variant="outline"
                            size="sm"
                            className={copied ? "bg-green-50 border-green-200 text-green-700" : ""}
                        >
                            {copied ? t('ui.copied') : t('ui.copy')}
                        </Button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.result')}
                        </label>
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md whitespace-pre-wrap h-64 overflow-y-auto">
                            {generatedText}
                        </div>
                    </div>
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
