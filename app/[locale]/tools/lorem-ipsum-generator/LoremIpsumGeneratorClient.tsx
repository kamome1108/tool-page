'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface LoremIpsumGeneratorClientProps {
    locale: string;
}

export default function LoremIpsumGeneratorClient({ locale }: LoremIpsumGeneratorClientProps) {
    const t = useTranslations('Tools.lorem-ipsum-generator');
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [count, setCount] = useState(5);
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    // Simple Lorem Ipsum Data
    const words = [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
        "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
        "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
        "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
        "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
        "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
        "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
        "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
        "est", "laborum"
    ];

    const generateText = () => {
        let result = "";

        // Helper to generate a sentence
        const generateSentence = () => {
            const length = Math.floor(Math.random() * 10) + 5; // 5-15 words
            let sentence = [];
            for (let i = 0; i < length; i++) {
                sentence.push(words[Math.floor(Math.random() * words.length)]);
            }
            // Capitalize first letter
            sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
            return sentence.join(" ") + ".";
        };

        // Helper to generate a paragraph
        const generateParagraph = () => {
            const length = Math.floor(Math.random() * 5) + 3; // 3-8 sentences
            let paragraph = [];
            for (let i = 0; i < length; i++) {
                paragraph.push(generateSentence());
            }
            return paragraph.join(" ");
        };

        if (type === 'words') {
            let generatedWords = [];
            for (let i = 0; i < count; i++) {
                generatedWords.push(words[Math.floor(Math.random() * words.length)]);
            }
            result = generatedWords.join(" ");
            if (startWithLorem) {
                result = "Lorem ipsum dolor sit amet " + result;
            } else {
                result = result.charAt(0).toUpperCase() + result.slice(1);
            }
        } else if (type === 'sentences') {
            let sentences = [];
            for (let i = 0; i < count; i++) {
                sentences.push(generateSentence());
            }
            result = sentences.join(" ");
            if (startWithLorem) {
                result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + result;
            }
        } else { // paragraphs
            let paragraphs = [];
            for (let i = 0; i < count; i++) {
                paragraphs.push(generateParagraph());
            }
            result = paragraphs.join("\n\n");
            if (startWithLorem) {
                result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + result;
            }
        }

        setOutput(result);
    };

    useEffect(() => {
        generateText();
    }, [type, count, startWithLorem]);

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-6">
            {/* Controls */}
            <Card padding="md" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.type')}
                        </label>
                        <div className="flex space-x-2">
                            {(['paragraphs', 'sentences', 'words'] as const).map((tType) => (
                                <button
                                    key={tType}
                                    onClick={() => setType(tType)}
                                    className={`px-3 py-2 text-sm rounded-md border ${type === tType
                                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {t(`ui.${tType}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Count Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.count')}
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Options */}
                    <div className="flex items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={startWithLorem}
                                onChange={(e) => setStartWithLorem(e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                            />
                            <span className="text-sm text-gray-700">{t('ui.startWith')}</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={generateText}>
                        {t('ui.generate')}
                    </Button>
                </div>
            </Card>

            {/* Output Section */}
            <Card padding="md" className="space-y-4 bg-gray-50">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('ui.type')}
                    </label>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopy}
                        className={copied ? "text-green-600 border-green-600" : ""}
                    >
                        {copied ? t('ui.copied') : t('ui.copy')}
                    </Button>
                </div>
                <textarea
                    readOnly
                    value={output}
                    className="w-full h-64 p-4 bg-white border border-gray-300 rounded-md resize-none font-serif text-base leading-relaxed focus:outline-none"
                />
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
