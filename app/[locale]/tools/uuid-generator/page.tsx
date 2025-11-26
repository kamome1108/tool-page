import { setRequestLocale, getTranslations } from 'next-intl/server';
import UuidGeneratorClient from './UuidGeneratorClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function UuidGeneratorPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.uuid-generator' });
    const content = getToolContent(t);

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="uuid-generator"
            />
            <UuidGeneratorClient locale={locale} content={content} />
        </>
    );
}
