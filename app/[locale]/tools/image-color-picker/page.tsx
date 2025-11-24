import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ImageColorPickerClient from './ImageColorPickerClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.image-color-picker.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function ImageColorPickerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <ImageColorPickerClient />;
}
