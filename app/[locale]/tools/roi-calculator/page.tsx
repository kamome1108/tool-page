import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import RoiCalculatorClient from './RoiCalculatorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.roi-calculator' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function RoiCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.roi-calculator' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <RoiCalculatorClient locale={locale} />
        </ToolLayout>
    );
}
