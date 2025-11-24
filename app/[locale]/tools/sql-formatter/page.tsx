import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SqlFormatterClient from './SqlFormatterClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.sql-formatter.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function SqlFormatterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <SqlFormatterClient />;
}
