import { setRequestLocale } from 'next-intl/server';
import SearchClient from './SearchClient';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'ja' }];
}

export default async function SearchPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <SearchClient />;
}
