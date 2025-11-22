import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import ColorConverterClient from './ColorConverterClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.color-converter' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function ColorConverterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.color-converter' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <ColorConverterClient locale={locale} />
        </ToolLayout>
    );
}
