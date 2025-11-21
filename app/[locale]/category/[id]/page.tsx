import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { categories } from "@/app/config/categories";
import { tools } from "@/app/config/tools";

export async function generateStaticParams() {
    const locales = ['en', 'ja'];
    const params = [];

    for (const locale of locales) {
        for (const category of categories) {
            params.push({ locale, id: category.id });
        }
    }

    return params;
}

interface PageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

import { Section } from '@/app/components/ui/Section';
import { Card } from '@/app/components/ui/Card';

// ... imports

export default async function CategoryPage({ params }: PageProps) {
    const resolvedParams = await params;
    setRequestLocale(resolvedParams.locale);

    const { getTranslations } = await import('next-intl/server');
    const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Common' });
    const tCategories = await getTranslations({ locale: resolvedParams.locale, namespace: 'Categories' });
    const tTools = await getTranslations({ locale: resolvedParams.locale, namespace: 'Tools' });

    const category = categories.find((c) => c.id === resolvedParams.id);
    const categoryTools = tools.filter((t) => t.category === resolvedParams.id);

    // Debug view when category is not found
    if (!category) {
        // ... (keep debug view as is for now, or componentize it later)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Debug: Category Not Found</h1>
                    {/* ... debug content ... */}
                    <div className="mt-6">
                        <Link href="/" className="text-blue-600 hover:underline">← {t('backToHome')}</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{tCategories(`${category.id}.name`)}</span>
                    </nav>
                </div>
            </div>

            {/* Category Header */}
            <Section padding="md">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="text-5xl">{category.icon}</div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            {tCategories(`${category.id}.name`)}
                        </h1>
                        <p className="text-lg text-gray-600 mt-2">
                            {tCategories(`${category.id}.description`)}
                        </p>
                    </div>
                </div>
            </Section>

            {/* Tools Grid */}
            <Section padding="none" className="pb-20">
                {categoryTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryTools.map((tool) => (
                            <Link
                                key={tool.id}
                                href={`/tools/${tool.slug}`}
                                className="group block h-full"
                            >
                                <Card hover padding="md" className="h-full">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-4xl">{tool.icon}</div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                                        {tTools(`${tool.id}.meta.title`)}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {tTools(`${tool.id}.meta.description`)}
                                    </p>
                                    <div className="mt-4 flex items-center text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                                        <span>{t('openTool')}</span>
                                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔨</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No tools yet
                        </h3>
                        <p className="text-gray-600">
                            Tools in this category are coming soon!
                        </p>
                    </div>
                )}
            </Section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-gray-600">
                        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
