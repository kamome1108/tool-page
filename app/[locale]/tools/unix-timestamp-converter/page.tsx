import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import UnixTimestampConverterClient from './UnixTimestampConverterClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.unix-timestamp-converter' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function UnixTimestampConverterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.unix-timestamp-converter' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <UnixTimestampConverterClient locale={locale} />
        </ToolLayout>
    );
}
