import { setRequestLocale, getTranslations } from 'next-intl/server';
import HtmlEntityEncoderDecoderClient from './HtmlEntityEncoderDecoderClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HtmlEntityEncoderDecoderPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.html-entity-encoder-decoder' });
    const content = getToolContent(t);

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
