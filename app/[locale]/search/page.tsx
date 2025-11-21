import { setRequestLocale } from 'next-intl/server';
import SearchClient from './SearchClient';

type Props = {
    params: Promise<{ locale: string }>;
};

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function SearchPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <SearchClient />;
}
