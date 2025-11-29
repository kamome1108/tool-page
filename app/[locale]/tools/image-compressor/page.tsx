import { setRequestLocale, getTranslations } from 'next-intl/server';
import ImageCompressorClient from './ImageCompressorClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ImageCompressorPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'image-compressor');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="image-compressor"
            />
            <ImageCompressorClient locale={locale} content={content} />
        </>
    );
}
