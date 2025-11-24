import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SitemapGeneratorClient from './SitemapGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.sitemap-generator.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function SitemapGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <SitemapGeneratorClient />;
}
