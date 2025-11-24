'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function OpenGraphGeneratorClient() {
    const t = useTranslations('Tools.open-graph-generator.ui');
    const [values, setValues] = useState({
        title: '',
        type: 'website',
        url: '',
        image: '',
        description: '',
        siteName: '',
    });
    const [generatedCode, setGeneratedCode] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const generateTags = () => {
        let code = '';
        if (values.title) code += `<meta property="og:title" content="${values.title}" />\n`;
        if (values.type) code += `<meta property="og:type" content="${values.type}" />\n`;
        if (values.url) code += `<meta property="og:url" content="${values.url}" />\n`;
        if (values.image) code += `<meta property="og:image" content="${values.image}" />\n`;
        if (values.description) code += `<meta property="og:description" content="${values.description}" />\n`;
        if (values.siteName) code += `<meta property="og:site_name" content="${values.siteName}" />\n`;
        setGeneratedCode(code.trim());
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        toast.success(t('copied'));
    };

    const handleClear = () => {
        setValues({
            title: '',
            type: 'website',
            url: '',
            image: '',
            description: '',
            siteName: '',
        });
        setGeneratedCode('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('ogTitle')}</label>
                        <input
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Article Title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('ogType')}</label>
                        <select
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="website">{t('types.website')}</option>
                            <option value="article">{t('types.article')}</option>
                            <option value="book">{t('types.book')}</option>
                            <option value="profile">{t('types.profile')}</option>
                            <option value="music.song">{t('types.music.song')}</option>
                            <option value="music.album">{t('types.music.album')}</option>
                            <option value="video.movie">{t('types.video.movie')}</option>
                            <option value="video.episode">{t('types.video.episode')}</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('ogUrl')}</label>
                        <input
                            type="text"
                            name="url"
                            value={values.url}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com/page"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('ogImage')}</label>
                        <input
                            type="text"
                            name="image"
                            value={values.image}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('ogDescription')}</label>
                        <textarea
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
                            placeholder="Description of the content..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('ogSiteName')}</label>
                        <input
                            type="text"
                            name="siteName"
                            value={values.siteName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="My Website"
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
                        {generatedCode || '<!-- OG tags will appear here -->'}
                    </div>
                </Card>
            </div>
        </div>
    );
}
