import { setRequestLocale, getTranslations } from 'next-intl/server';
import JsonMinifierClient from './JsonMinifierClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function JsonMinifierPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.json-minifier' });
    const content = getToolContent(t);

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="json-minifier"
            />
            <JsonMinifierClient locale={locale} content={content} />
        </>
    );
}
