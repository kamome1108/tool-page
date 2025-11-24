import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import WebpToJpgClient from './WebpToJpgClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.webp-to-jpg.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function WebpToJpgPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <WebpToJpgClient />;
}
