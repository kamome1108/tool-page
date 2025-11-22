import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import LoremIpsumGeneratorClient from './LoremIpsumGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.lorem-ipsum-generator' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function LoremIpsumGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.lorem-ipsum-generator' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <LoremIpsumGeneratorClient locale={locale} />
        </ToolLayout>
    );
}
