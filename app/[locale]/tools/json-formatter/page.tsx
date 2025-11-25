import { setRequestLocale, getTranslations } from 'next-intl/server';
import JsonFormatterClient from './JsonFormatterClient';
import JsonLd from '@/app/components/JsonLd';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function JsonFormatterPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.json-formatter' });
    const baseUrl = 'https://tools.kamo-me.com';

    // Software Application Schema
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": t('meta.title'),
        "description": t('meta.description'),
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": [
            t('content.features.list.0'),
            t('content.features.list.1'),
            t('content.features.list.2')
        ]
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${baseUrl}/${locale}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": t('meta.title'),
                "item": `${baseUrl}/${locale}/tools/json-formatter`
            }
        ]
    };

    // HowTo Schema
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": t('content.howTo.title'),
        "step": [0, 1, 2, 3].map(i => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": t(`content.howTo.steps.${i}`),
            "text": t(`content.howTo.steps.${i}`)
        }))
    };

    // FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [0, 1, 2, 3, 4].map(i => ({
            "@type": "Question",
            "name": t(`content.faq.questions.${i}.q`),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": t(`content.faq.questions.${i}.a`)
            }
        }))
    };

    return (
        <div className="space-y-12">
            <JsonLd data={softwareSchema} />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={howToSchema} />
            <JsonLd data={faqSchema} />
            <JsonFormatterClient locale={locale} />
        </div>
    );
}

