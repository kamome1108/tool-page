import { setRequestLocale } from 'next-intl/server';
import SvgPlaceholderGeneratorClient from './SvgPlaceholderGeneratorClient';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function SvgPlaceholderGeneratorPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <SvgPlaceholderGeneratorClient locale={locale} />;
}
