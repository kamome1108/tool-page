import { setRequestLocale, getTranslations } from 'next-intl/server';
import HtmlEntityEncoderDecoderClient from './HtmlEntityEncoderDecoderClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HtmlEntityEncoderDecoderPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'html-entity-encoder-decoder');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="html-entity-encoder-decoder"
            />
            <HtmlEntityEncoderDecoderClient locale={locale} content={content} />
        </>
    );
}
