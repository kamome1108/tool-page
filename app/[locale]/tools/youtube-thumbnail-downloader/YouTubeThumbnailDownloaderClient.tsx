'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface YouTubeThumbnailDownloaderClientProps {
    locale: string;
}

export default function YouTubeThumbnailDownloaderClient({ locale }: YouTubeThumbnailDownloaderClientProps) {
    const t = useTranslations('Tools.youtube-thumbnail-downloader');
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState<string | null>(null);
    const [error, setError] = useState('');

    const extractVideoId = (inputUrl: string) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = inputUrl.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    const handleGetThumbnails = () => {
        setError('');
        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
        } else {
            setVideoId(null);
            setError(t('ui.error'));
        }
    };

    const getThumbnailUrl = (id: string, quality: 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault') => {
        return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
    };

    const downloadImage = async (imageUrl: string, fileName: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            // Fallback for cross-origin issues if fetch fails (though img.youtube usually allows it, sometimes it blocks direct download via JS)
            window.open(imageUrl, '_blank');
        }
    };

    return (
        <div className="space-y-6">
            <Card padding="md" className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                    {t('ui.input')}
                </label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <Button onClick={handleGetThumbnails}>
                        {t('ui.getThumbnails')}
                    </Button>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
            </Card>

            {videoId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Max Resolution */}
                    <Card padding="sm" className="space-y-2">
                        <h3 className="font-medium text-gray-700">{t('ui.qualities.maxres')}</h3>
                        <img
                            src={getThumbnailUrl(videoId, 'maxresdefault')}
                            alt="Max Resolution Thumbnail"
                            className="w-full rounded-md"
                        />
                        <div className="flex space-x-2">
                            <Button size="sm" onClick={() => downloadImage(getThumbnailUrl(videoId, 'maxresdefault'), `thumbnail_maxres_${videoId}.jpg`)}>
                                {t('ui.download')}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => window.open(getThumbnailUrl(videoId, 'maxresdefault'), '_blank')}>
                                {t('ui.openNewTab')}
                            </Button>
                        </div>
                    </Card>

                    {/* High Quality */}
                    <Card padding="sm" className="space-y-2">
                        <h3 className="font-medium text-gray-700">{t('ui.qualities.high')}</h3>
                        <img
                            src={getThumbnailUrl(videoId, 'hqdefault')}
                            alt="High Quality Thumbnail"
                            className="w-full rounded-md"
                        />
                        <div className="flex space-x-2">
                            <Button size="sm" onClick={() => downloadImage(getThumbnailUrl(videoId, 'hqdefault'), `thumbnail_hq_${videoId}.jpg`)}>
                                {t('ui.download')}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => window.open(getThumbnailUrl(videoId, 'hqdefault'), '_blank')}>
                                {t('ui.openNewTab')}
                            </Button>
                        </div>
                    </Card>

                    {/* Medium Quality */}
                    <Card padding="sm" className="space-y-2">
                        <h3 className="font-medium text-gray-700">{t('ui.qualities.medium')}</h3>
                        <img
                            src={getThumbnailUrl(videoId, 'mqdefault')}
                            alt="Medium Quality Thumbnail"
                            className="w-full rounded-md"
                        />
                        <div className="flex space-x-2">
                            <Button size="sm" onClick={() => downloadImage(getThumbnailUrl(videoId, 'mqdefault'), `thumbnail_mq_${videoId}.jpg`)}>
                                {t('ui.download')}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => window.open(getThumbnailUrl(videoId, 'mqdefault'), '_blank')}>
                                {t('ui.openNewTab')}
                            </Button>
                        </div>
                    </Card>

                    {/* Standard Quality */}
                    <Card padding="sm" className="space-y-2">
                        <h3 className="font-medium text-gray-700">{t('ui.qualities.standard')}</h3>
                        <img
                            src={getThumbnailUrl(videoId, 'sddefault')}
                            alt="Standard Quality Thumbnail"
                            className="w-full rounded-md"
                        />
                        <div className="flex space-x-2">
                            <Button size="sm" onClick={() => downloadImage(getThumbnailUrl(videoId, 'sddefault'), `thumbnail_sd_${videoId}.jpg`)}>
                                {t('ui.download')}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => window.open(getThumbnailUrl(videoId, 'sddefault'), '_blank')}>
                                {t('ui.openNewTab')}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
