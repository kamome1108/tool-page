'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function RobotsTxtGeneratorClient() {
    const t = useTranslations('Tools.robots-txt-generator.ui');
    const [values, setValues] = useState({
        userAgent: '*',
        allow: '',
        disallow: '',
        sitemap: '',
        crawlDelay: '',
    });
    const [generatedCode, setGeneratedCode] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const generateRobotsTxt = () => {
        let code = `User-agent: ${values.userAgent}\n`;

        if (values.crawlDelay) {
            code += `Crawl-delay: ${values.crawlDelay}\n`;
        }

        if (values.allow) {
            const allowPaths = values.allow.split('\n').filter(p => p.trim());
            allowPaths.forEach(path => {
                code += `Allow: ${path.trim()}\n`;
            });
        }

        if (values.disallow) {
            const disallowPaths = values.disallow.split('\n').filter(p => p.trim());
            disallowPaths.forEach(path => {
                code += `Disallow: ${path.trim()}\n`;
            });
        }

        if (values.sitemap) {
            code += `\nSitemap: ${values.sitemap}`;
        }

        setGeneratedCode(code.trim());
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        toast.success(t('copied'));
    };

    const handleDownload = () => {
        const blob = new Blob([generatedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'robots.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setValues({
            userAgent: '*',
            allow: '',
            disallow: '',
            sitemap: '',
            crawlDelay: '',
        });
        setGeneratedCode('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('userAgent')}</label>
                        <input
                            type="text"
                            name="userAgent"
                            value={values.userAgent}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="*"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('crawlDelay')}</label>
                        <input
                            type="number"
                            name="crawlDelay"
                            value={values.crawlDelay}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="10"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('allow')}</label>
                        <textarea
                            name="allow"
                            value={values.allow}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
                            placeholder="/public/&#10;/images/"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('disallow')}</label>
                        <textarea
                            name="disallow"
                            value={values.disallow}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
                            placeholder="/admin/&#10;/private/"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('sitemap')}</label>
                        <input
                            type="text"
                            name="sitemap"
                            value={values.sitemap}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com/sitemap.xml"
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
                            onClick={generateRobotsTxt}
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
                        {generatedCode || '# robots.txt content will appear here'}
                    </div>
                </Card>
            </div>
        </div>
    );
}
