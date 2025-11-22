import { setRequestLocale, getTranslations } from 'next-intl/server';
import CharacterCounterClient from './CharacterCounterClient';
import JsonLd from '@/app/components/JsonLd';
import { Section } from '@/app/components/ui/Section';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function CharacterCounterPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.character-counter' });

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
                <CharacterCounterClient locale={locale} />
            </Section>
        </div>
    );
}
