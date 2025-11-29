import { setRequestLocale, getTranslations } from 'next-intl/server';
import Base64EncoderDecoderClient from './Base64EncoderDecoderClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Base64EncoderDecoderPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'base64-encoder-decoder');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="base64-encoder-decoder"
            />
            <Base64EncoderDecoderClient locale={locale} content={content} />
        </>
    );
}
