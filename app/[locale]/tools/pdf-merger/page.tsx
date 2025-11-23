import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PdfMergerClient from './PdfMergerClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.pdf-merger.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function PdfMergerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <PdfMergerClient />;
}
