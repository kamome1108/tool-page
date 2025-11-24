import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PdfToImageClient from './PdfToImageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.pdf-to-image.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function PdfToImagePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <PdfToImageClient />;
}
