import { getTranslations } from 'next-intl/server';
import { ToolContent } from '@/app/types/tool';

export async function getToolContent(locale: string, toolId: string): Promise<ToolContent> {
    const t = await getTranslations({ locale, namespace: `Tools.${toolId}` });

    const content: ToolContent = {
        meta: {
            title: t('meta.title'),
            description: t('meta.description'),
        },
        tagline: t('tagline'),
    };

    // Description
    try {
        content.description = {
            title: t('content.description.title'),
            text: t('content.description.text')
        };
    } catch (e) { /* Ignore if missing */ }

    // HowTo
    try {
        const steps = t.raw('content.howTo.steps');
        if (Array.isArray(steps) && steps.length > 0) {
            content.howTo = {
                title: t('content.howTo.title'),
                steps
            };
        }
    } catch (e) { /* Ignore */ }

    // Features
    try {
        const list = t.raw('content.features.list');
        if (Array.isArray(list) && list.length > 0) {
            content.features = {
                title: t('content.features.title'),
                list
            };
        }
    } catch (e) { /* Ignore */ }

    // FAQ
    try {
        const rawQuestions = t.raw('content.faq.questions');
        if (Array.isArray(rawQuestions) && rawQuestions.length > 0) {
            const questions = rawQuestions.map((item: any) => ({
                q: item.q,
                a: item.a
            }));
            content.faq = {
                title: t('content.faq.title'),
                questions
            };
        }
    } catch (e) { /* Ignore */ }

    return content;
}
