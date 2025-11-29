import { getToolContent } from '@/app/utils/tool-content';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import ImageBlurWrapper from './ImageBlurWrapper';

// export const runtime = 'edge';

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'image-blur');

    return {
        title: content.meta.title,
        description: content.meta.description,
    };
}

export default async function ImageBlurPage({ params }: PageProps) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'image-blur');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="image-blur"
            />
            <ImageBlurWrapper locale={locale} content={content} />
        </>
    );
}
