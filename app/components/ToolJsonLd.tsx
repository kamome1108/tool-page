import JsonLd from '@/app/components/JsonLd';
import { ToolContent } from '@/app/types/tool';

interface ToolJsonLdProps {
    content: ToolContent;
    baseUrl: string;
    locale: string;
    slug: string;
}

export default function ToolJsonLd({ content, baseUrl, locale, slug }: ToolJsonLdProps) {
    const url = `${baseUrl}/${locale}/tools/${slug}`;

    // Software Application Schema
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": content.meta.title,
        "description": content.tagline, // Use tagline for description as it's concise
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": content.features?.list || []
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
                "name": content.meta.title,
                "item": url
            }
        ]
    };

    // HowTo Schema
    const howToSchema = content.howTo ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": content.howTo.title,
        "step": content.howTo.steps.map((step, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": step,
            "text": step
        }))
    } : null;

    // FAQ Schema
    const faqSchema = content.faq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faq.questions.map(q => ({
            "@type": "Question",
            "name": q.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.a
            }
        }))
    } : null;

    return (
        <>
            <JsonLd data={softwareSchema} />
            <JsonLd data={breadcrumbSchema} />
            {howToSchema && <JsonLd data={howToSchema} />}
            {faqSchema && <JsonLd data={faqSchema} />}
        </>
    );
}
