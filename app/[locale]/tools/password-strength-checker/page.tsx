import { setRequestLocale, getTranslations } from 'next-intl/server';
import ToolLayout from '@/app/components/ToolLayout';
import PasswordStrengthCheckerClient from './PasswordStrengthCheckerClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.password-strength-checker' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function PasswordStrengthCheckerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Tools.password-strength-checker' });

    return (
        <ToolLayout
            title={t('title')}
            description={t('description')}
        >
            <PasswordStrengthCheckerClient locale={locale} />
        </ToolLayout>
    );
}
