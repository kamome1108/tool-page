'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function SitemapGeneratorClient() {
    const t = useTranslations('Tools.sitemap-generator.ui');
    const [values, setValues] = useState({
        urls: '',
        frequency: 'monthly',
        priority: '0.5',
        lastmod: new Date().toISOString().split('T')[0],
    });
    const [generatedCode, setGeneratedCode] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const generateSitemap = () => {
        const urls = values.urls.split('\n').filter(u => u.trim());

        if (urls.length === 0) {
            toast.error('Please enter at least one URL');
            return;
        }

        let code = '<?xml version="1.0" encoding="UTF-8"?>\n';
        code += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        urls.forEach(url => {
            code += '  <url>\n';
            code += `    <loc>${url.trim()}</loc>\n`;
            if (values.lastmod) code += `    <lastmod>${values.lastmod}</lastmod>\n`;
            if (values.frequency) code += `    <changefreq>${values.frequency}</changefreq>\n`;
            if (values.priority) code += `    <priority>${values.priority}</priority>\n`;
            code += '  </url>\n';
        });

        code += '</urlset>';
        setGeneratedCode(code);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        toast.success(t('copied'));
    };

    const handleDownload = () => {
        const blob = new Blob([generatedCode], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setValues({
            urls: '',
            frequency: 'monthly',
            priority: '0.5',
            lastmod: new Date().toISOString().split('T')[0],
        });
        setGeneratedCode('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('urls')}</label>
                        <textarea
                            name="urls"
                            value={values.urls}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md h-48 resize-none"
                            placeholder="https://example.com/&#10;https://example.com/about"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">{t('frequency')}</label>
                            <select
                                name="frequency"
                                value={values.frequency}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="always">{t('frequencies.always')}</option>
                                <option value="hourly">{t('frequencies.hourly')}</option>
                                <option value="daily">{t('frequencies.daily')}</option>
                                <option value="weekly">{t('frequencies.weekly')}</option>
                                <option value="monthly">{t('frequencies.monthly')}</option>
                                <option value="yearly">{t('frequencies.yearly')}</option>
                                <option value="never">{t('frequencies.never')}</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">{t('priority')}</label>
                            <input
                                type="number"
                                name="priority"
                                value={values.priority}
                                onChange={handleChange}
                                step="0.1"
                                min="0.0"
                                max="1.0"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('lastmod')}</label>
                        <input
                            type="date"
                            name="lastmod"
                            value={values.lastmod}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
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
                            onClick={generateSitemap}
                            className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {t('generate')}
                        </Button>
                    </div>
                </Card>

                <Card className="p-6 space-y-4 h-fit">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-medium text-gray-700">{t('preview')}</h3>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleCopy}
                                disabled={!generatedCode}
                                size="sm"
                                variant="outline"
                            >
                                {t('copy')}
                            </Button>
                            <Button
                                onClick={handleDownload}
                                disabled={!generatedCode}
                                size="sm"
                                variant="outline"
                            >
                                {t('download')}
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto min-h-[300px] whitespace-pre">
                        {generatedCode || '<!-- XML sitemap will appear here -->'}
                    </div>
                </Card>
            </div>
        </div>
    );
}
