import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import UrlEncoderDecoderClient from './UrlEncoderDecoderClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.url-encoder-decoder' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function UrlEncoderDecoderPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.url-encoder-decoder' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <UrlEncoderDecoderClient locale={locale} />
        </ToolLayout>
    );
}
