import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonToCsvClient from './JsonToCsvClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.json-to-csv.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function JsonToCsvPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <JsonToCsvClient />;
}
