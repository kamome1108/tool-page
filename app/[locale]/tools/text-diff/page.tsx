import { setRequestLocale, getTranslations } from 'next-intl/server';
import TextDiffClient from './TextDiffClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function TextDiffPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'text-diff');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="text-diff"
            />
            <TextDiffClient locale={locale} content={content} />
        </>
    );
}
