import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import UserAgentParserClient from './UserAgentParserClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.user-agent-parser.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function UserAgentParserPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <UserAgentParserClient />;
}
