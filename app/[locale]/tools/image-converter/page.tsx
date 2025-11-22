import { setRequestLocale, getTranslations } from 'next-intl/server';
import ImageConverterClient from './ImageConverterClient';
import JsonLd from '@/app/components/JsonLd';
import { Section } from '@/app/components/ui/Section';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ImageConverterPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.image-converter' });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": t('meta.title'),
        "description": t('meta.description'),
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <div className="space-y-12">
            <JsonLd data={jsonLd} />
            <Section>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
                </div>
                <ImageConverterClient locale={locale} />
            </Section>
        </div>
    );
}
