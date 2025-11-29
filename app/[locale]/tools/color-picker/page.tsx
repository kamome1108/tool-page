
import ColorPickerClient from './ColorPickerClient';
import ToolJsonLd from '@/app/components/ToolJsonLd';
import { getToolContent } from '@/app/utils/tool-content';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ColorPickerPage({ params }: Props) {
    const { locale } = await params;
    const content = await getToolContent(locale, 'color-picker');

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
