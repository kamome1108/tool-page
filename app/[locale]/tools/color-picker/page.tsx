import { setRequestLocale, getTranslations } from 'next-intl/server';
import ColorPickerClient from './ColorPickerClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ColorPickerPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.color-picker' });
    const content = getToolContent(t);

    return (
        <>
            <ToolJsonLd
                content={content}
                baseUrl="https://tools.kamo-me.com"
                locale={locale}
                slug="color-picker"
            />
            <ColorPickerClient locale={locale} content={content} />
        </>
    );
}
