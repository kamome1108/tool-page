import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ScreenRecorderClient from './ScreenRecorderClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.screen-recorder.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function ScreenRecorderPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <ScreenRecorderClient />;
}
