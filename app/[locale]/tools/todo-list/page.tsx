import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TodoListClient from './TodoListClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.todo-list.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function TodoListPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <TodoListClient />;
}
