import { getToolContent } from '@/app/utils/tool-content';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import SvgPlaceholderGeneratorClient from './SvgPlaceholderGeneratorClient';

// export const runtime = 'edge';

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'svg-placeholder-generator');

    return {
        title: content.meta.title,
        description: content.meta.description,
    };
}

export default async function SvgPlaceholderGeneratorPage({ params }: PageProps) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'svg-placeholder-generator');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="svg-placeholder-generator"
            />
            <SvgPlaceholderGeneratorClient locale={locale} content={content} />
        </>
    );
}
