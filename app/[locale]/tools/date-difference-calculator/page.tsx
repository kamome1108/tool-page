import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DateDifferenceCalculatorClient from './DateDifferenceCalculatorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.date-difference-calculator.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function DateDifferenceCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <DateDifferenceCalculatorClient />;
}
