import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import RobotsTxtGeneratorClient from './RobotsTxtGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.robots-txt-generator.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function RobotsTxtGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <RobotsTxtGeneratorClient />;
}
