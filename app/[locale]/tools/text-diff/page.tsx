import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TextDiffClient from './TextDiffClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.text-diff.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function TextDiffPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <TextDiffClient />;
}
