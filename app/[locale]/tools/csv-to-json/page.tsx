import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CsvToJsonClient from './CsvToJsonClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.csv-to-json.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function CsvToJsonPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <CsvToJsonClient />;
}
