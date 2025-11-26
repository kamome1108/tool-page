import { setRequestLocale, getTranslations } from 'next-intl/server';
import MultiCropperClient from './MultiCropperClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function MultiCropperPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.multi-cropper' });
    const content = getToolContent(t);

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="multi-cropper"
            />
            <MultiCropperClient locale={locale} content={content} />
        </>
    );
}
