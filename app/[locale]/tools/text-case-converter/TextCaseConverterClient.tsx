'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface TextCaseConverterClientProps {
    locale: string;
}

export default function TextCaseConverterClient({ locale }: TextCaseConverterClientProps) {
    const t = useTranslations('Tools.text-case-converter');
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState(false);

    const convert = (type: string) => {
        let result = '';
        switch (type) {
            case 'uppercase':
                result = input.toUpperCase();
                break;
            case 'lowercase':
                result = input.toLowerCase();
                break;
            case 'titleCase':
                result = input.replace(
                    /\w\S*/g,
                    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
                break;
            case 'sentenceCase':
                result = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
                break;
            case 'camelCase':
                result = input
                    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                        index === 0 ? word.toLowerCase() : word.toUpperCase()
                    )
                    .replace(/\s+/g, '');
                break;
            case 'snakeCase':
                result = input
                    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                    ?.map((x) => x.toLowerCase())
                    .join('_') || '';
                break;
            case 'kebabCase':
                result = input
                    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                    ?.map((x) => x.toLowerCase())
                    .join('-') || '';
                break;
            // Add more cases as needed
        }
        setInput(result);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.inputLabel')}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-48 font-mono text-sm"
                        placeholder="Enter text to convert..."
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button onClick={() => convert('uppercase')} variant="outline">
                        {t('ui.uppercase')}
                    </Button>
                    <Button onClick={() => convert('lowercase')} variant="outline">
                        {t('ui.lowercase')}
                    </Button>
                    <Button onClick={() => convert('titleCase')} variant="outline">
                        {t('ui.titleCase')}
                    </Button>
                    <Button onClick={() => convert('sentenceCase')} variant="outline">
                        {t('ui.sentenceCase')}
                    </Button>
                    <Button onClick={() => convert('camelCase')} variant="outline">
                        {t('ui.camelCase')}
                    </Button>
                    <Button onClick={() => convert('snakeCase')} variant="outline">
                        {t('ui.snakeCase')}
                    </Button>
                    <Button onClick={() => convert('kebabCase')} variant="outline">
                        {t('ui.kebabCase')}
                    </Button>
                    <Button
                        onClick={handleCopy}
                        className={copied ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                        {copied ? t('ui.copied') : t('ui.copy')}
                    </Button>
                </div>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
