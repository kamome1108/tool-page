import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import QRCodeGeneratorClient from './QRCodeGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.qr-code-generator' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        keywords: t('meta.keywords')
    };
}

export default async function QRCodeGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.qr-code-generator' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <QRCodeGeneratorClient locale={locale} />
        </ToolLayout>
    );
}
