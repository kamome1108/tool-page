'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

interface DiffResult {
    key: string;
    value: any;
    type: DiffType;
    oldValue?: any;
    children?: DiffResult[];
}

export default function JsonDiffClient() {
    const t = useTranslations('Tools.json-diff.ui');
    const [leftJson, setLeftJson] = useState('');
    const [rightJson, setRightJson] = useState('');
    const [diff, setDiff] = useState<DiffResult[] | null>(null);
    const [error, setError] = useState('');

    const compare = () => {
        setError('');
        setDiff(null);

        let obj1, obj2;

        try {
            obj1 = JSON.parse(leftJson);
        } catch (e) {
            setError(t('invalidJson', { side: t('leftLabel') }));
            return;
        }

        try {
            obj2 = JSON.parse(rightJson);
        } catch (e) {
            setError(t('invalidJson', { side: t('rightLabel') }));
            return;
        }

        const result = getDiff(obj1, obj2);
        if (result.length === 0) {
            // Check if objects are identical (empty diff means no changes)
            // But getDiff returns empty array if identical? Yes.
            // We want to show "No Diff" message.
        }
        setDiff(result);
    };

    const getDiff = (o1: any, o2: any, parentKey = ''): DiffResult[] => {
        const diffs: DiffResult[] = [];
        const keys1 = Object.keys(o1 || {});
        const keys2 = Object.keys(o2 || {});
        const allKeys = Array.from(new Set([...keys1, ...keys2]));

        for (const key of allKeys) {
            const val1 = o1 ? o1[key] : undefined;
            const val2 = o2 ? o2[key] : undefined;

            if (val1 === undefined && val2 !== undefined) {
                diffs.push({ key, value: val2, type: 'added' });
            } else if (val1 !== undefined && val2 === undefined) {
                diffs.push({ key, value: val1, type: 'removed' });
            } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
                if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
                    diffs.push({ key, value: null, type: 'modified', children: getDiff(val1, val2, key) });
                } else {
                    diffs.push({ key, value: val2, oldValue: val1, type: 'modified' });
                }
            } else {
                // Identical, we can skip or add as unchanged if we want to show full tree
                // For now, let's only show changes
            }
        }
        return diffs;
    };

    const renderDiff = (diffs: DiffResult[], depth = 0) => {
        return (
            <div className={`pl-${depth * 4}`}>
                {diffs.map((d, i) => (
                    <div key={i} className="font-mono text-sm mb-1">
                        {d.type === 'added' && (
                            <div className="bg-green-100 text-green-800 p-1 rounded">
                                + {d.key}: {JSON.stringify(d.value)}
                            </div>
                        )}
                        {d.type === 'removed' && (
                            <div className="bg-red-100 text-red-800 p-1 rounded">
                                - {d.key}: {JSON.stringify(d.value)}
                            </div>
                        )}
                        {d.type === 'modified' && (
                            <div className="bg-yellow-50 text-yellow-800 p-1 rounded">
                                {d.children ? (
                                    <>
                                        <div className="font-semibold text-gray-700">{d.key}:</div>
                                        <div className="pl-4 border-l-2 border-yellow-200">
                                            {renderDiff(d.children, depth + 1)}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        ~ {d.key}: <span className="bg-red-100 px-1 rounded">{JSON.stringify(d.oldValue)}</span>
                                        {' -> '}
                                        <span className="bg-green-100 px-1 rounded">{JSON.stringify(d.value)}</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('leftLabel')}
                    </label>
                    <textarea
                        value={leftJson}
                        onChange={(e) => setLeftJson(e.target.value)}
                        className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs"
                        placeholder='{"key": "value"}'
                    />
                </Card>
                <Card className="p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('rightLabel')}
                    </label>
                    <textarea
                        value={rightJson}
                        onChange={(e) => setRightJson(e.target.value)}
                        className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs"
                        placeholder='{"key": "newValue"}'
                    />
                </Card>
            </div>

            <div className="text-center">
                <Button
                    onClick={compare}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    disabled={!leftJson || !rightJson}
                >
                    {t('compare')}
                </Button>
            </div>

            {error && (
                <div className="text-red-500 text-center font-medium">
                    {error}
                </div>
            )}

            {diff && (
                <Card className="p-6 animate-fade-in">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                        {t('result')}
                    </h3>
                    {diff.length === 0 ? (
                        <div className="text-green-600 text-center py-4">
                            {t('noDiff')}
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                            {renderDiff(diff)}
                        </div>
                    )}
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
