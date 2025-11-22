import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import TweetPreviewClient from './TweetPreviewClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.tweet-preview' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function TweetPreviewPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.tweet-preview' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <TweetPreviewClient locale={locale} />
        </ToolLayout>
    );
}
