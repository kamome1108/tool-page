import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JpgToPngClient from './JpgToPngClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.jpg-to-png.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function JpgToPngPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <JpgToPngClient />;
}
