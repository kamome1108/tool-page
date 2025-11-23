import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import HtmlEntityEncoderDecoderClient from './HtmlEntityEncoderDecoderClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.html-entity-encoder-decoder' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function HtmlEntityEncoderDecoderPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.html-entity-encoder-decoder' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <HtmlEntityEncoderDecoderClient locale={locale} />
        </ToolLayout>
    );
}
