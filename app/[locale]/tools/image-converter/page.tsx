import { setRequestLocale, getTranslations } from 'next-intl/server';
import ImageConverterClient from './ImageConverterClient';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ImageConverterPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.image-converter' });

    return (
        <EnhancedToolLayout
            title={t('meta.title')}
            tagline={t('tagline')}
            toolId="image-converter"
            locale={locale}
            description={{
                title: t('content.description.title'),
                text: t('content.description.text')
            }}
            howTo={{
                title: t('content.howTo.title'),
                steps: [
                    t('content.howTo.steps.0'),
                    t('content.howTo.steps.1'),
                    t('content.howTo.steps.2'),
                    t('content.howTo.steps.3')
                ]
            }}
            features={{
                title: t('content.features.title'),
                list: [
                    t('content.features.list.0'),
                    t('content.features.list.1'),
                    t('content.features.list.2'),
                    t('content.features.list.3'),
                    t('content.features.list.4'),
                    t('content.features.list.5')
                ]
            }}
            faq={{
                title: t('content.faq.title'),
                questions: [
                    {
                        q: t('content.faq.questions.0.q'),
                        a: t('content.faq.questions.0.a')
                    },
                    {
                        q: t('content.faq.questions.1.q'),
                        a: t('content.faq.questions.1.a')
                    },
                    {
                        q: t('content.faq.questions.2.q'),
                        a: t('content.faq.questions.2.a')
                    },
                    {
                        q: t('content.faq.questions.3.q'),
                        a: t('content.faq.questions.3.a')
                    }
                ]
            }}
        >
            <ImageConverterClient locale={locale} />
        </EnhancedToolLayout>
    );
}
