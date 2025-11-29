import { setRequestLocale, getTranslations } from 'next-intl/server';
import JsonFormatterClient from './JsonFormatterClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function JsonFormatterPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'json-formatter');

    return (
        <div className="space-y-12">
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="json-formatter"
            />
            <JsonFormatterClient locale={locale} content={content} />
        </div>
    );
}

