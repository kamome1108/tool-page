import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import YouTubeTimestampLinkGeneratorClient from './YouTubeTimestampLinkGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.youtube-timestamp-link-generator' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function YouTubeTimestampLinkGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.youtube-timestamp-link-generator' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <YouTubeTimestampLinkGeneratorClient locale={locale} />
        </ToolLayout>
    );
}
