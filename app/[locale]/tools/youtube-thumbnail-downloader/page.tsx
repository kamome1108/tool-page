import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import YouTubeThumbnailDownloaderClient from './YouTubeThumbnailDownloaderClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.youtube-thumbnail-downloader' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function YouTubeThumbnailDownloaderPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.youtube-thumbnail-downloader' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <YouTubeThumbnailDownloaderClient locale={locale} />
        </ToolLayout>
    );
}
