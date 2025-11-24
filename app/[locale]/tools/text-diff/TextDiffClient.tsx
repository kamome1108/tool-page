'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import * as Diff from 'diff';

export default function TextDiffClient() {
    const t = useTranslations('Tools.text-diff.ui');
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
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                    <h3 className="font-medium text-gray-700">{t('original')}</h3>
                    <textarea
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                        className="w-full h-[300px] p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        spellCheck={false}
                    />
                </Card>

                <Card className="p-6 space-y-4">
                    <h3 className="font-medium text-gray-700">{t('modified')}</h3>
                    <textarea
                        value={modified}
                        onChange={(e) => setModified(e.target.value)}
                        className="w-full h-[300px] p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        spellCheck={false}
                    />
                </Card>
            </div>

            <div className="flex justify-center gap-4">
                <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-8"
                >
                    {t('clear')}
                </Button>
                <Button
                    onClick={handleCompare}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                    {t('compare')}
                </Button>
            </div>

            {hasDiff && (
                <Card className="p-6 space-y-4">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h3 className="font-medium text-gray-700">{t('diff')}</h3>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-red-100 border border-red-200 rounded"></span>
                                <span>{t('removed')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 border border-green-200 rounded"></span>
                                <span>{t('added')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="font-mono text-sm whitespace-pre-wrap break-words bg-gray-50 p-4 rounded-lg min-h-[100px]">
                        {diffResult.length === 0 || (diffResult.length === 1 && !diffResult[0].added && !diffResult[0].removed) ? (
                            <div className="text-gray-500 text-center py-8">{t('noDiff')}</div>
                        ) : (
                            diffResult.map((part, index) => {
                                const color = part.added ? 'bg-green-100 text-green-800' : part.removed ? 'bg-red-100 text-red-800' : 'text-gray-600';
                                return (
                                    <span key={index} className={color}>
                                        {part.value}
                                    </span>
                                );
                            })
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
}
