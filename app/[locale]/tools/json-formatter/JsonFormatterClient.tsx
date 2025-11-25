'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';

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

    // Prepare content data for the layout
    const description = {
        title: t('content.description.title'),
        text: t('content.description.text')
    };

    const howTo = {
        title: t('content.howTo.title'),
        steps: [0, 1, 2, 3].map(i => t(`content.howTo.steps.${i}`))
    };

    const features = {
        title: t('content.features.title'),
        list: [0, 1, 2, 3, 4, 5].map(i => t(`content.features.list.${i}`))
    };

    const faq = {
        title: t('content.faq.title'),
        questions: [0, 1, 2, 3, 4].map(i => ({
            q: t(`content.faq.questions.${i}.q`),
            a: t(`content.faq.questions.${i}.a`)
        }))
    };

    return (
        <EnhancedToolLayout
            title={t('meta.title')}
            tagline={t('tagline')}
            toolId="json-formatter"
            locale={locale}
            description={description}
            howTo={howTo}
            features={features}
            faq={faq}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
                {/* Input */}
                <div className="flex flex-col h-[400px] lg:h-full min-w-0">
                    <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
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
                        className="flex-1 w-full bg-gray-50 text-gray-900 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none font-mono text-sm min-w-0"
                    />
                </div>

                {/* Controls & Output */}
                <div className="flex flex-col h-[400px] lg:h-full min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
                        <label className="text-gray-700 font-medium text-sm">{t('ui.outputJson')}</label>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <select
                                value={indent}
                                onChange={(e) => setIndent(Number(e.target.value))}
                                className="bg-white text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow sm:flex-grow-0"
                            >
                                <option value={2}>2 {t('ui.spaces')}</option>
                                <option value={4}>4 {t('ui.spaces')}</option>
                                <option value={8}>8 {t('ui.spaces')}</option>
                            </select>
                            <Button
                                onClick={formatJson}
                                variant="primary"
                                size="sm"
                                className="bg-purple-600 hover:bg-purple-700 border-transparent text-white flex-grow sm:flex-grow-0"
                            >
                                {t('ui.format')}
                            </Button>
                            <Button
                                onClick={minifyJson}
                                variant="secondary"
                                size="sm"
                                className="flex-grow sm:flex-grow-0"
                            >
                                {t('ui.minify')}
                            </Button>
                            <Button
                                onClick={() => navigator.clipboard.writeText(output)}
                                disabled={!output}
                                variant="primary"
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 border-transparent text-white flex-grow sm:flex-grow-0"
                            >
                                {t('ui.copy')}
                            </Button>
                        </div>
                    </div>

                    <div className={`flex-1 bg-gray-50 p-4 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} overflow-auto min-w-0`}>
                        {error ? (
                            <div className="text-red-600 font-mono text-sm break-words">
                                <p className="font-bold mb-2">{t('ui.errorParsing')}</p>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <pre className="text-purple-600 font-mono text-sm whitespace-pre-wrap break-all min-w-0">
                                {output}
                            </pre>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 text-gray-500 text-xs text-center">
                <p>{t('ui.processingNote')}</p>
            </div>
        </EnhancedToolLayout>
    );
}
