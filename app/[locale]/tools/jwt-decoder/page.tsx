import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import JwtDecoderClient from './JwtDecoderClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.jwt-decoder.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function JwtDecoderPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.jwt-decoder' });
    const content = getToolContent(t);

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="jwt-decoder"
            />
            <JwtDecoderClient locale={locale} content={content} />
        </>
    );
}
