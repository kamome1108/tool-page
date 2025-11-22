'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface HashtagGeneratorClientProps {
    locale: string;
}

export default function HashtagGeneratorClient({ locale }: HashtagGeneratorClientProps) {
    const t = useTranslations('Tools.hashtag-generator');
    const [input, setInput] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generateHashtags = () => {
        if (!input.trim()) {
            setHashtags([]);
            return;
        }

        // Simple logic: split by spaces/commas, remove empty/short, add #
        // In a real app, this would call an API or use a more sophisticated library
        const words = input
            .split(/[\s,]+/)
            .filter(w => w.length > 2)
            .map(w => w.replace(/[^a-zA-Z0-9]/g, ''))
            .filter(w => w.length > 0);

        // Generate some related variations (mocking "smart" generation)
        const generated = words.map(w => `#${w}`);

        // Add some generic popular tags if input is short (just for demo feel)
        if (generated.length > 0) {
            generated.push('#trending', '#viral', '#fyp', '#explore');
        }

        setHashtags([...new Set(generated)]); // Unique
    };

    const handleCopy = () => {
        if (hashtags.length > 0) {
            navigator.clipboard.writeText(hashtags.join(' '));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInput('');
        setHashtags([]);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card padding="md" className="space-y-4 h-full flex flex-col">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('ui.input')}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[200px]"
                        placeholder="travel, food, photography..."
                    />
                    <div className="flex space-x-2 pt-2">
                        <Button onClick={generateHashtags} className="flex-1">
                            {t('ui.generate')}
                        </Button>
                        <Button onClick={handleClear} variant="outline">
                            {t('ui.clear')}
                        </Button>
                    </div>
                </Card>

                {/* Results Section */}
                <Card padding="md" className="space-y-4 h-full flex flex-col bg-gray-50">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                            {t('ui.results')}
                        </label>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopy}
                            disabled={hashtags.length === 0}
                            className={copied ? "text-green-600 border-green-600" : ""}
                        >
                            {copied ? t('ui.copied') : t('ui.copy')}
                        </Button>
                    </div>

                    <div className="flex-1 p-4 bg-white border border-gray-200 rounded-md min-h-[200px] content-start flex flex-wrap gap-2">
                        {hashtags.length > 0 ? (
                            hashtags.map((tag, index) => (
                                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm w-full text-center self-center">
                                {t('ui.noResults')}
                            </p>
                        )}
                    </div>
                </Card>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
