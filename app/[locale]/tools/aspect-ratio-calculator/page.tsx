import { setRequestLocale } from 'next-intl/server';
import AspectRatioCalculatorClient from './AspectRatioCalculatorClient';

export default async function AspectRatioCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <AspectRatioCalculatorClient locale={locale} />;
}
