import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import AudioBitrateCalculatorClient from './AudioBitrateCalculatorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.audio-bitrate-calculator' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function AudioBitrateCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.audio-bitrate-calculator' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <AudioBitrateCalculatorClient locale={locale} />
        </ToolLayout>
    );
}
