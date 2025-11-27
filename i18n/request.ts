import { getRequestConfig } from 'next-intl/server';
import { tools } from '@/app/config/tools';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !['en', 'ja', 'tl', 'hi', 'id', 'vi', 'th'].includes(locale)) {
        locale = 'en';
    }

    const common = (await import(`../messages/${locale}/common.json`)).default;
    const home = (await import(`../messages/${locale}/home.json`)).default;
    const categories = (await import(`../messages/${locale}/categories.json`)).default;

    const toolsMessages: Record<string, any> = {};

    for (const tool of tools) {
        try {
            const toolMsg = (await import(`../messages/${locale}/tools/${tool.id}.json`)).default;
            toolsMessages[tool.id] = toolMsg;
        } catch (e) {
            console.error(`CRITICAL: Translation file not found for tool: ${tool.id} in locale: ${locale}`);
            throw new Error(`Translation file missing: ${tool.id} (${locale})`);
        }
    }

    return {
        locale,
        messages: {
            Common: common,
            Home: home,
            Categories: categories,
            Tools: toolsMessages
        },
        onError(error) {
            if (error.code === 'MISSING_MESSAGE') {
                console.error(`CRITICAL: Missing translation key: ${error.message}`);
                throw new Error(`Missing translation key: ${error.message}`);
            }
            console.error(error);
        }
    };
});
