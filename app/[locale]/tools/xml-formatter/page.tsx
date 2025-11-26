import { setRequestLocale, getTranslations } from 'next-intl/server';
import XmlFormatterClient from './XmlFormatterClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function XmlFormatterPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.xml-formatter' });
    const content = getToolContent(t);

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="xml-formatter"
            />
            <XmlFormatterClient locale={locale} content={content} />
        </>
    );
}
