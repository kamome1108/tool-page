import { setRequestLocale, getTranslations } from 'next-intl/server';
import JsonFormatterClient from './JsonFormatterClient';
import JsonLd from '@/app/components/JsonLd';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function JsonFormatterPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.JsonFormatter' });

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
        <div className="space-y-12">
            <JsonLd data={jsonLd} />
            <JsonFormatterClient locale={locale} />
        </div>
    );
}
