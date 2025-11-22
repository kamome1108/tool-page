import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import WordCounterClient from './WordCounterClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.word-counter' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function WordCounterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.word-counter' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <WordCounterClient locale={locale} />
        </ToolLayout>
    );
}
