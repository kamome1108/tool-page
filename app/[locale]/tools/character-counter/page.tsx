import { setRequestLocale } from 'next-intl/server';
import CharacterCounterClient from './CharacterCounterClient';

export default async function CharacterCounterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <CharacterCounterClient locale={locale} />;
}
