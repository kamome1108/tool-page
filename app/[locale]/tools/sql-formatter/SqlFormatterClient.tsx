'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { format } from 'sql-formatter';
import { Toaster, toast } from 'react-hot-toast';

type Dialect = 'sql' | 'mysql' | 'postgresql' | 'sqlite' | 'mariadb' | 'plsql' | 'tsql';

export default function SqlFormatterClient() {
    const t = useTranslations('Tools.sql-formatter.ui');
    const [input, setInput] = useState('');
    const [dialect, setDialect] = useState<Dialect>('sql');
    const [indent, setIndent] = useState(2);
    const [useTabs, setUseTabs] = useState(false);

    const handleFormat = () => {
        try {
            const formatted = format(input, {
                language: dialect,
                tabWidth: indent,
                useTabs: useTabs,
                keywordCase: 'upper',
            });
            setInput(formatted);
        } catch (error) {
            console.error(error);
            toast.error(t('error'));
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(input);
        toast.success(t('copied'));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6 space-y-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 block">{t('dialect')}</label>
                            <select
                                value={dialect}
                                onChange={(e) => setDialect(e.target.value as Dialect)}
                                className="p-2 border border-gray-300 rounded-md text-sm min-w-[150px]"
                            >
                                <option value="sql">Standard SQL</option>
                                <option value="mysql">MySQL</option>
                                <option value="postgresql">PostgreSQL</option>
                                <option value="sqlite">SQLite</option>
                                <option value="mariadb">MariaDB</option>
                                <option value="plsql">PL/SQL (Oracle)</option>
                                <option value="tsql">T-SQL (SQL Server)</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 block">{t('indent')}</label>
                            <select
                                value={useTabs ? 'tab' : indent}
                                onChange={(e) => {
                                    if (e.target.value === 'tab') {
                                        setUseTabs(true);
                                    } else {
                                        setUseTabs(false);
                                        setIndent(Number(e.target.value));
                                    }
                                }}
                                className="p-2 border border-gray-300 rounded-md text-sm min-w-[150px]"
                            >
                                <option value="2">{t('spaces', { count: 2 })}</option>
                                <option value="4">{t('spaces', { count: 4 })}</option>
                                <option value="tab">{t('tabs')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleFormat}
                            disabled={!input}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {t('format')}
                        </Button>
                        <Button
                            onClick={handleCopy}
                            disabled={!input}
                            variant="outline"
                        >
                            {t('copy')}
                        </Button>
                    </div>
                </div>

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('inputPlaceholder')}
                    className="w-full h-[500px] p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                    spellCheck={false}
                />
            </Card>
        </div>
    );
}
