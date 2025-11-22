import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import UnitConverterClient from './UnitConverterClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.unit-converter' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function UnitConverterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.unit-converter' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <UnitConverterClient locale={locale} />
        </ToolLayout>
    );
}
