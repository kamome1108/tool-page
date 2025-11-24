'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function TwitterCardGeneratorClient() {
    const t = useTranslations('Tools.twitter-card-generator.ui');
    const [values, setValues] = useState({
        cardType: 'summary',
        siteHandle: '',
        creatorHandle: '',
        title: '',
        description: '',
        image: '',
    });
    const [generatedCode, setGeneratedCode] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const generateTags = () => {
        let code = '';
        if (values.cardType) code += `<meta name="twitter:card" content="${values.cardType}" />\n`;
        if (values.siteHandle) code += `<meta name="twitter:site" content="${values.siteHandle}" />\n`;
        if (values.creatorHandle) code += `<meta name="twitter:creator" content="${values.creatorHandle}" />\n`;
        if (values.title) code += `<meta name="twitter:title" content="${values.title}" />\n`;
        if (values.description) code += `<meta name="twitter:description" content="${values.description}" />\n`;
        if (values.image) code += `<meta name="twitter:image" content="${values.image}" />\n`;
        setGeneratedCode(code.trim());
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        toast.success(t('copied'));
    };

    const handleClear = () => {
        setValues({
            cardType: 'summary',
            siteHandle: '',
            creatorHandle: '',
            title: '',
            description: '',
            image: '',
        });
        setGeneratedCode('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('cardType')}</label>
                        <select
                            name="cardType"
                            value={values.cardType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="summary">{t('types.summary')}</option>
                            <option value="summary_large_image">{t('types.summary_large_image')}</option>
                            <option value="app">{t('types.app')}</option>
                            <option value="player">{t('types.player')}</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('siteHandle')}</label>
                        <input
                            type="text"
                            name="siteHandle"
                            value={values.siteHandle}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="@username"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('creatorHandle')}</label>
                        <input
                            type="text"
                            name="creatorHandle"
                            value={values.creatorHandle}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="@creator"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('title')}</label>
                        <input
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Card Title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('description')}</label>
                        <textarea
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
                            placeholder="Card Description..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('image')}</label>
                        <input
                            type="text"
                            name="image"
                            value={values.image}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com/image.jpg"
                        />
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
                        {generatedCode || '<!-- Twitter Card tags will appear here -->'}
                    </div>
                </Card>
            </div>
        </div>
    );
}
