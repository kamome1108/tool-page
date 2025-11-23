import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ExifRemoverClient from './ExifRemoverClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.exif-remover.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function ExifRemoverPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <ExifRemoverClient />;
}
