import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import RandomPasswordGeneratorClient from './RandomPasswordGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.random-password-generator' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function RandomPasswordGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.random-password-generator' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <RandomPasswordGeneratorClient locale={locale} />
        </ToolLayout>
    );
}
