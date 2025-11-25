import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonMinifierClient from './JsonMinifierClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.json-minifier.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function JsonMinifierPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <JsonMinifierClient />;
}
