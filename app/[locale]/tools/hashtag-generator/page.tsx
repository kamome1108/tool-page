import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import HashtagGeneratorClient from './HashtagGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.hashtag-generator' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function HashtagGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.hashtag-generator' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <HashtagGeneratorClient locale={locale} />
        </ToolLayout>
    );
}
