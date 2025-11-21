import { setRequestLocale, getTranslations } from 'next-intl/server';
import AspectRatioCalculatorClient from './AspectRatioCalculatorClient';
import JsonLd from '@/app/components/JsonLd';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function AspectRatioCalculatorPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.AspectRatioCalculator' });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": t('meta.title'),
        "description": t('meta.description'),
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <AspectRatioCalculatorClient locale={locale} />
        </>
    );
}
