import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SignatureGeneratorClient from './SignatureGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.signature-generator.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function SignatureGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <SignatureGeneratorClient />;
}
