'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function YouTubeTagExtractorClient() {
    const t = useTranslations('Tools.youtube-tag-extractor.ui');
    const [url, setUrl] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const extractTags = async () => {
        if (!url) return;
        setLoading(true);
        setError('');
        setTags([]);

        try {
            // Use a CORS proxy to fetch the YouTube page content
            // corsproxy.io is a reliable public proxy
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch video page');
            }

            const html = await response.text();

            // Extract keywords from meta tags
            // <meta name="keywords" content="tag1, tag2, tag3">
            const keywordsMatch = html.match(/<meta name="keywords" content="([^"]*)">/);

            if (keywordsMatch && keywordsMatch[1]) {
                const extractedTags = keywordsMatch[1].split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                setTags(extractedTags);
                if (extractedTags.length === 0) {
                    setError(t('noTagsFound'));
                }
            } else {
                // Fallback: Try to find "keywords": in the JSON config inside the HTML
                const jsonMatch = html.match(/"keywords":\[(.*?)\]/);
                if (jsonMatch && jsonMatch[1]) {
                    const extractedTags = jsonMatch[1].split(',').map(tag => tag.replace(/"/g, '').trim());
                    setTags(extractedTags);
                } else {
                    setError(t('noTagsFound'));
                }
            }
        } catch (err) {
            console.error(err);
            setError(t('error'));
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success(t('copied'));
        });
    };

    const copyAllTags = () => {
        if (tags.length > 0) {
            copyToClipboard(tags.join(', '));
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('inputLabel')}
                        </label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                    </div>

                    <Button
                        onClick={extractTags}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        disabled={!url || loading}
                    >
                        {loading ? 'Loading...' : t('extract')}
                    </Button>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                </div>

                {tags.length > 0 && (
                    <div className="mt-8 space-y-4 animate-fade-in">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {t('result')} ({tags.length})
                            </h3>
                            <Button
                                onClick={copyAllTags}
                                variant="outline"
                                size="sm"
                            >
                                {t('copyAll')}
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors flex items-center gap-2 group"
                                    onClick={() => copyToClipboard(tag)}
                                >
                                    <span>{tag}</span>
                                    <span className="opacity-0 group-hover:opacity-100 text-gray-500">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
