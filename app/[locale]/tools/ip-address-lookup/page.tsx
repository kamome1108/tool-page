import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import IpAddressLookupClient from './IpAddressLookupClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.ip-address-lookup.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function IpAddressLookupPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <IpAddressLookupClient />;
}
