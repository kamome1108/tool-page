import { setRequestLocale, getTranslations } from 'next-intl/server';
import MultiCropperClient from './MultiCropperClient';
import JsonLd from '@/app/components/JsonLd';
import { Section } from '@/app/components/ui/Section';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function MultiCropperPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.multi-cropper' });

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
            <Section>
                <MultiCropperClient locale={locale} />
            </Section>
        </div>
    );
}
