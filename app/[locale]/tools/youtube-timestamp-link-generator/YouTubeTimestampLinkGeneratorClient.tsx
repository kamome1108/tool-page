'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface YouTubeTimestampLinkGeneratorClientProps {
    locale: string;
}

export default function YouTubeTimestampLinkGeneratorClient({ locale }: YouTubeTimestampLinkGeneratorClientProps) {
    const t = useTranslations('Tools.youtube-timestamp-link-generator');
    const [url, setUrl] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    const generateLink = () => {
        if (!url) return;

        let videoId = '';
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes('youtube.com')) {
                videoId = urlObj.searchParams.get('v') || '';
            } else if (urlObj.hostname.includes('youtu.be')) {
                videoId = urlObj.pathname.slice(1);
            }
        } catch (e) {
            // Invalid URL
        }

        if (!videoId) {
            // Handle invalid URL or just append to original if simple
            // For now, let's assume valid input or just append parameter
        }

        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

        let newUrl = url;
        if (newUrl.includes('?')) {
            newUrl += `&t=${totalSeconds}s`;
        } else {
            newUrl += `?t=${totalSeconds}s`;
        }

        setGeneratedLink(newUrl);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleOpen = () => {
        window.open(generatedLink, '_blank');
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.url')}
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.time')}
                    </label>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <input
                                type="number"
                                min="0"
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-xs text-gray-500 mt-1 block">{t('ui.hours')}</span>
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={minutes}
                                onChange={(e) => setMinutes(Number(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-xs text-gray-500 mt-1 block">{t('ui.minutes')}</span>
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={seconds}
                                onChange={(e) => setSeconds(Number(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-xs text-gray-500 mt-1 block">{t('ui.seconds')}</span>
                        </div>
                    </div>
                </div>

                <Button onClick={generateLink} className="w-full" disabled={!url}>
                    {t('ui.generate')}
                </Button>
            </Card>

            {generatedLink && (
                <Card padding="lg" className="space-y-4 bg-gray-50">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.result')}
                        </label>
                        <div className="bg-white p-3 border border-gray-300 rounded-md break-all text-blue-600">
                            {generatedLink}
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Button
                            onClick={handleCopy}
                            variant="outline"
                            className={`flex-1 ${copied ? "bg-green-50 border-green-200 text-green-700" : ""}`}
                        >
                            {copied ? t('ui.copied') : t('ui.copy')}
                        </Button>
                        <Button onClick={handleOpen} className="flex-1">
                            {t('ui.open')}
                        </Button>
                    </div>
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
