import { setRequestLocale, getTranslations } from 'next-intl/server';
import SqlFormatterClient from './SqlFormatterClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function SqlFormatterPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'sql-formatter');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="sql-formatter"
            />
            <SqlFormatterClient locale={locale} content={content} />
        </>
    );
}
