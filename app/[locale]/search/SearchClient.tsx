'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { tools } from '@/app/config/tools';
import { Card } from '@/app/components/ui/Card';
import { Section } from '@/app/components/ui/Section';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const t = useTranslations('Common.search');
    const tTools = useTranslations('Tools');
    const tCommon = useTranslations('Common');

    // Filter tools based on query
    const filteredTools = tools.filter((tool) => {
        if (!query) return false;

        const title = tTools(`${tool.id}.meta.title`).toLowerCase();
        const description = tTools(`${tool.id}.meta.description`).toLowerCase();
        const searchTerms = query.toLowerCase().split(' ');

        return searchTerms.every(term =>
            title.includes(term) || description.includes(term)
        );
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Section padding="md">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {t('resultsTitle', { query })}
                    </h1>
                    {query && (
                        <Link href="/search" className="text-sm text-gray-500 hover:text-gray-700">
                            {t('clear')}
                        </Link>
                    )}
                </div>

                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredTools.map((tool) => (
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
                                        <span>{tCommon('openTool')}</span>
                                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {t('noResults', { query })}
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search terms or browse by category.
                        </p>
                        <div className="mt-6">
                            <Link href="/" className="text-blue-600 hover:underline">
                                {tCommon('backToHome')}
                            </Link>
                        </div>
                    </div>
                )}
            </Section>
        </div>
    );
}

export default function SearchClient() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <SearchContent />
        </Suspense>
    );
}
