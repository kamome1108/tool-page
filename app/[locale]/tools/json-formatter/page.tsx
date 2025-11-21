import { setRequestLocale } from 'next-intl/server';
import JsonFormatterClient from './JsonFormatterClient';

export default async function JsonFormatterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <JsonFormatterClient locale={locale} />;
}
