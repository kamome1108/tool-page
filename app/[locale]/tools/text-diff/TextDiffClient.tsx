'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';
import { Button } from '@/app/components/ui/Button';
import * as Diff from 'diff';
import { ToolContent } from '@/app/types/tool';

interface Props {
    locale: string;
    content: ToolContent;
}

export default function TextDiffClient({ locale, content }: Props) {
    const t = useTranslations('Tools.text-diff');
    const [original, setOriginal] = useState('');
    const [modified, setModified] = useState('');
    const [diffResult, setDiffResult] = useState<Diff.Change[]>([]);
    const [hasDiff, setHasDiff] = useState(false);

    const handleCompare = () => {
        const diff = Diff.diffChars(original, modified);
        setDiffResult(diff);
        setHasDiff(true);
    };

    const handleClear = () => {
        setOriginal('');
        setModified('');
        setDiffResult([]);
        setHasDiff(false);
    };

    return (
        <EnhancedToolLayout
            {...content}
            title={content.meta.title}
            toolId="text-diff"
            locale={locale}
        >
            <div className="space-y-6">
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.original')}
                        </label>
                        <textarea
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                            className="w-full h-[300px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                            spellCheck={false}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.modified')}
                        </label>
                        <textarea
                            value={modified}
                            onChange={(e) => setModified(e.target.value)}
                            className="w-full h-[300px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handleClear}
                        variant="secondary"
                        className="px-8"
                    >
                        {t('ui.clear')}
                    </Button>
                    <Button
                        onClick={handleCompare}
                        variant="primary"
                        className="px-8"
                    >
                        {t('ui.compare')}
                    </Button>
                </div>

                {/* Diff Result */}
                {hasDiff && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {t('ui.diff')}
                            </h3>
                            <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded"></span>
                                    <span className="text-gray-600 dark:text-gray-400">{t('ui.removed')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded"></span>
                                    <span className="text-gray-600 dark:text-gray-400">{t('ui.added')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="font-mono text-sm whitespace-pre-wrap break-words bg-gray-50 dark:bg-gray-900 p-4 rounded-lg min-h-[100px] border border-gray-200 dark:border-gray-700">
                            {diffResult.length === 0 || (diffResult.length === 1 && !diffResult[0].added && !diffResult[0].removed) ? (
                                <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                                    {t('ui.noDiff')}
                                </div>
                            ) : (
                                diffResult.map((part, index) => {
                                    const color = part.added
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                                        : part.removed
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                                            : 'text-gray-600 dark:text-gray-400';
                                    return (
                                        <span key={index} className={color}>
                                            {part.value}
                                        </span>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {t('ui.processingNote')}
                </div>
            </div>
        </EnhancedToolLayout>
    );
}
