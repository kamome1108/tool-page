import { setRequestLocale } from 'next-intl/server';
import PasswordGeneratorClient from './PasswordGeneratorClient';

export default async function PasswordGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PasswordGeneratorClient locale={locale} />;
}

