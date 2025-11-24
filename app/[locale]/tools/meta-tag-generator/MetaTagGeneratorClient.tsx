'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function MetaTagGeneratorClient() {
    const t = useTranslations('Tools.meta-tag-generator.ui');
    const [values, setValues] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        viewport: 'width=device-width, initial-scale=1.0',
        charset: 'UTF-8',
    });
    const [generatedCode, setGeneratedCode] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const generateTags = () => {
        let code = '';
        if (values.charset) code += `<meta charset="${values.charset}">\n`;
        if (values.viewport) code += `<meta name="viewport" content="${values.viewport}">\n`;
        if (values.title) code += `<title>${values.title}</title>\n`;
        if (values.description) code += `<meta name="description" content="${values.description}">\n`;
        if (values.keywords) code += `<meta name="keywords" content="${values.keywords}">\n`;
        if (values.author) code += `<meta name="author" content="${values.author}">\n`;
        setGeneratedCode(code.trim());
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        toast.success(t('copied'));
    };

    const handleClear = () => {
        setValues({
            title: '',
            description: '',
            keywords: '',
            author: '',
            viewport: 'width=device-width, initial-scale=1.0',
            charset: 'UTF-8',
        });
        setGeneratedCode('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('siteTitle')}</label>
                        <input
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="My Awesome Website"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('siteDescription')}</label>
                        <textarea
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
                            placeholder="A brief description of your website..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('keywords')}</label>
                        <input
                            type="text"
                            name="keywords"
                            value={values.keywords}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="seo, tools, generator"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('author')}</label>
                        <input
                            type="text"
                            name="author"
                            value={values.author}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">{t('viewport')}</label>
                            <input
                                type="text"
                                name="viewport"
                                value={values.viewport}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">{t('charset')}</label>
                            <input
                                type="text"
                                name="charset"
                                value={values.charset}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            onClick={handleClear}
                            variant="outline"
                            className="w-1/3"
                        >
                            {t('clear')}
                        </Button>
                        <Button
                            onClick={generateTags}
                            className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {t('generate')}
                        </Button>
                    </div>
                </Card>

                <Card className="p-6 space-y-4 h-fit">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-medium text-gray-700">{t('preview')}</h3>
                        <Button
                            onClick={handleCopy}
                            disabled={!generatedCode}
                            size="sm"
                            variant="outline"
                        >
                            {t('copy')}
                        </Button>
                    </div>

                    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto min-h-[300px] whitespace-pre">
                        {generatedCode || '<!-- Meta tags will appear here -->'}
                    </div>
                </Card>
            </div>
        </div>
    );
}
