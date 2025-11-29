import { setRequestLocale, getTranslations } from 'next-intl/server';
import CssMinifierClient from './CssMinifierClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function CssMinifierPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'css-minifier');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="css-minifier"
            />
            <CssMinifierClient locale={locale} content={content} />
        </>
    );
}
