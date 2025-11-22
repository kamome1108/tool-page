import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import PomodoroTimerClient from './PomodoroTimerClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.pomodoro-timer' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function PomodoroTimerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.pomodoro-timer' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <PomodoroTimerClient locale={locale} />
        </ToolLayout>
    );
}
