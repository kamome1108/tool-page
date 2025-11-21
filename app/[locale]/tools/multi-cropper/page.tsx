import { setRequestLocale } from 'next-intl/server';
import MultiCropperClient from './MultiCropperClient';

export default async function MultiCropperPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <MultiCropperClient locale={locale} />;
}
