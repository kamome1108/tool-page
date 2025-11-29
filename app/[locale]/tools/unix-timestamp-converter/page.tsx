import { setRequestLocale, getTranslations } from 'next-intl/server';
import UnixTimestampConverterClient from './UnixTimestampConverterClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function UnixTimestampConverterPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'unix-timestamp-converter');

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="unix-timestamp-converter"
            />
            <UnixTimestampConverterClient locale={locale} content={content} />
        </>
    );
}
