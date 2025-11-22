'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface MetaTagGeneratorClientProps {
    locale: string;
}

export default function MetaTagGeneratorClient({ locale }: MetaTagGeneratorClientProps) {
    const t = useTranslations('Tools.meta-tag-generator');
    const [siteTitle, setSiteTitle] = useState('');
    const [siteDescription, setSiteDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [author, setAuthor] = useState('');
    const [viewport, setViewport] = useState('width=device-width, initial-scale=1.0');
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [copied, setCopied] = useState(false);

    const generateTags = () => {
        let tags = '';

        if (siteTitle) tags += `<title>${siteTitle}</title>\n`;
        if (siteDescription) tags += `<meta name="description" content="${siteDescription}">\n`;
        if (keywords) tags += `<meta name="keywords" content="${keywords}">\n`;
        if (author) tags += `<meta name="author" content="${author}">\n`;
        if (viewport) tags += `<meta name="viewport" content="${viewport}">\n`;

        tags += `<meta charset="UTF-8">`;

        setGeneratedHtml(tags);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedHtml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card padding="lg" className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.siteTitle')}
                        </label>
                        <input
                            type="text"
                            value={siteTitle}
                            onChange={(e) => setSiteTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.siteDescription')}
                        </label>
                        <textarea
                            value={siteDescription}
                            onChange={(e) => setSiteDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.keywords')}
                        </label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('ui.author')}
                            </label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('ui.viewport')}
                            </label>
                            <input
                                type="text"
                                value={viewport}
                                onChange={(e) => setViewport(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <Button onClick={generateTags} className="w-full">
                        {t('ui.generate')}
                    </Button>
                </Card>

                <Card padding="lg" className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.result')}
                    </label>
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-md p-4 font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
                        {generatedHtml || <span className="text-gray-400 italic">...</span>}
                    </div>
                    <Button
                        onClick={handleCopy}
                        className={`mt-4 w-full ${copied ? "bg-green-600 hover:bg-green-700" : ""}`}
                        disabled={!generatedHtml}
                    >
                        {copied ? t('ui.copied') : t('ui.copy')}
                    </Button>
                </Card>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
