'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '@/app/components/ToolLayout';
import { Button } from '@/app/components/ui/Button';

export default function JsonFormatterClient({ locale }: { locale: string }) {
    const t = useTranslations('Tools.json-formatter');

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [indent, setIndent] = useState(2);

    const formatJson = () => {
        if (!input.trim()) {
            setOutput('');
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, indent));
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(t('ui.invalidJson'));
            }
            setOutput('');
        }
    };

    const minifyJson = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(t('ui.invalidJson'));
            }
        }
    };

    return (
        <ToolLayout
            title={t('meta.title')}
            description={t('meta.description')}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)] min-h-[600px]">
                    {/* Input */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-gray-700 font-medium text-sm">{t('ui.inputJson')}</label>
                            <Button
                                onClick={() => setInput('')}
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-red-600"
                            >
                                {t('ui.clear')}
                            </Button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('ui.pastePlaceholder')}
                            className="flex-1 bg-white text-gray-900 p-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition-colors resize-none font-mono text-sm shadow-sm"
                        />
                    </div>

                    {/* Controls & Output */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-gray-700 font-medium text-sm">{t('ui.outputJson')}</label>
                            <div className="flex space-x-2">
                                <select
                                    value={indent}
                                    onChange={(e) => setIndent(Number(e.target.value))}
                                    className="bg-white text-sm text-gray-700 border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500"
                                >
                                    <option value={2}>2 {t('ui.spaces')}</option>
                                    <option value={4}>4 {t('ui.spaces')}</option>
                                    <option value={8}>8 {t('ui.spaces')}</option>
                                </select>
                                <Button
                                    onClick={formatJson}
                                    variant="primary"
                                    size="sm"
                                    className="bg-purple-600 hover:bg-purple-700 border-transparent"
                                >
                                    {t('ui.format')}
                                </Button>
                                <Button
                                    onClick={minifyJson}
                                    variant="secondary"
                                    size="sm"
                                >
                                    {t('ui.minify')}
                                </Button>
                                <Button
                                    onClick={() => navigator.clipboard.writeText(output)}
                                    disabled={!output}
                                    variant="primary"
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 border-transparent"
                                >
                                    {t('ui.copy')}
                                </Button>
                            </div>
                        </div>

                        <div className={`flex-1 bg-white p-4 rounded-2xl border-2 ${error ? 'border-red-500' : 'border-gray-200'} overflow-auto shadow-sm`}>
                            {error ? (
                                <div className="text-red-600 font-mono text-sm">
                                    <p className="font-bold mb-2">{t('ui.errorParsing')}</p>
                                    <p>{error}</p>
                                </div>
                            ) : (
                                <pre className="text-purple-600 font-mono text-sm whitespace-pre-wrap break-all">
                                    {output}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-gray-600 text-sm text-center bg-purple-50 p-4 rounded-xl">
                    <p>{t('ui.processingNote')}</p>
                </div>
            </div>
        </ToolLayout>
    );
}
