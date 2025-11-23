import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import TextCaseConverterClient from './TextCaseConverterClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.text-case-converter' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function TextCaseConverterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.text-case-converter' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <TextCaseConverterClient locale={locale} />
        </ToolLayout>
    );
}
