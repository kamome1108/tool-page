import { setRequestLocale, getTranslations } from 'next-intl/server';
import ImageResizerClient from './ImageResizerClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ImageResizerPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'image-resizer');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="image-resizer"
            />
            <ImageResizerClient locale={locale} content={content} />
        </>
    );
}
