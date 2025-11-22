import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import Base64EncoderDecoderClient from './Base64EncoderDecoderClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.base64-encoder-decoder' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function Base64EncoderDecoderPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.base64-encoder-decoder' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <Base64EncoderDecoderClient locale={locale} />
        </ToolLayout>
    );
}
