import { getToolContent } from '@/app/utils/tool-content';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import ImageConverterClient from './ImageConverterClient';

// export const runtime = 'edge';

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'image-converter');

    return {
        title: content.meta.title,
        description: content.meta.description,
    };
}

export default async function ImageConverterPage({ params }: PageProps) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'image-converter');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="image-converter"
            />
            <ImageConverterClient locale={locale} content={content} />
        </>
    );
}
