'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';
import { Button } from '@/app/components/ui/Button';
import toast from 'react-hot-toast';
import { ToolContent } from '@/app/types/tool';
import { format } from 'sql-formatter';

interface Props {
    locale: string;
    content: ToolContent;
}

const dialects = [
    { value: 'sql', label: 'Standard SQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'mariadb', label: 'MariaDB' },
    { value: 'tsql', label: 'T-SQL (SQL Server)' },
    { value: 'plsql', label: 'PL/SQL' },
];

export default function SqlFormatterClient({ locale, content }: Props) {
    const t = useTranslations('Tools.sql-formatter');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [dialect, setDialect] = useState('sql');
    const [indentSize, setIndentSize] = useState(2);
    const [useTabs, setUseTabs] = useState(false);

    const handleFormat = () => {
        try {
            const formatted = format(input, {
                language: dialect as any,
                tabWidth: indentSize,
                useTabs: useTabs,
                keywordCase: 'upper',
            });
            setOutput(formatted);
        } catch (e) {
            toast.error(t('ui.error'));
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success(t('ui.copied'));
    };

    return (
        <EnhancedToolLayout
            {...content}
            title={content.meta.title}
            toolId="sql-formatter"
            locale={locale}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.dialect')}
                        </label>
                        <select
                            value={dialect}
                            onChange={(e) => setDialect(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                        >
                            {dialects.map((d) => (
                                <option key={d.value} value={d.value}>
                                    {d.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ui.indent')}
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={indentSize}
                                onChange={(e) => setIndentSize(Number(e.target.value))}
                                className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                                disabled={useTabs}
                            >
                                {[2, 4, 8].map((size) => (
                                    <option key={size} value={size}>
                                        {t('ui.spaces', { count: size })}
                                    </option>
                                ))}
                            </select>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="useTabs"
                                    checked={useTabs}
                                    onChange={(e) => setUseTabs(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="useTabs" className="text-sm text-gray-700 dark:text-gray-300">
                                    {t('ui.tabs')}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end">
                        <Button onClick={handleFormat} variant="primary" className="w-full">
                            {t('ui.format')}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="space-y-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-96 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                            placeholder={t('ui.inputPlaceholder')}
                        />
                    </div>

                    {/* Output Section */}
                    <div className="space-y-2 relative">
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-96 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm"
                        />
                        <div className="absolute top-4 right-4">
                            <Button onClick={handleCopy} variant="secondary" size="sm" disabled={!output}>
                                {t('ui.copy')}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {t('ui.processingNote')}
                </div>
            </div>
        </EnhancedToolLayout>
    );
}
