'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Section } from '@/app/components/ui/Section';
import { Link } from '@/i18n/routing';
import RelatedTools from '@/app/components/tools/RelatedTools';

export default function JsonFormatterClient({ locale }: { locale: string }) {
    const t = useTranslations('Tools.json-formatter');
    const tCommon = useTranslations('Common');

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
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{t('meta.title')}</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow">
                {/* Hero Section (Above the Fold) */}
                <Section className="pt-8 pb-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                            {t('meta.title')}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('tagline')}
                        </p>
                    </div>

                    {/* Tool Interface */}
                    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                            {/* Input */}
                            <div className="flex flex-col h-full">
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
                                    className="flex-1 w-full bg-gray-50 text-gray-900 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none font-mono text-sm"
                                />
                            </div>

                            {/* Controls & Output */}
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-gray-700 font-medium text-sm">{t('ui.outputJson')}</label>
                                    <div className="flex space-x-2">
                                        <select
                                            value={indent}
                                            onChange={(e) => setIndent(Number(e.target.value))}
                                            className="bg-white text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value={2}>2 {t('ui.spaces')}</option>
                                            <option value={4}>4 {t('ui.spaces')}</option>
                                            <option value={8}>8 {t('ui.spaces')}</option>
                                        </select>
                                        <Button
                                            onClick={formatJson}
                                            variant="primary"
                                            size="sm"
                                            className="bg-purple-600 hover:bg-purple-700 border-transparent text-white"
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
                                            className="bg-blue-600 hover:bg-blue-700 border-transparent text-white"
                                        >
                                            {t('ui.copy')}
                                        </Button>
                                    </div>
                                </div>

                                <div className={`flex-1 bg-gray-50 p-4 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} overflow-auto`}>
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

                        <div className="mt-6 text-gray-500 text-xs text-center">
                            <p>{t('ui.processingNote')}</p>
                        </div>
                    </div>
                </Section>

                {/* Content Sections (Below the Fold) */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">

                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('content.description.title')}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t('content.description.text')}
                        </p>
                    </section>

                    {/* How to Use */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {t('content.howTo.title')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start space-x-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                                        {i + 1}
                                    </div>
                                    <p className="text-gray-700 pt-1">
                                        {t(`content.howTo.steps.${i}`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Features */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {t('content.features.title')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <span className="text-green-500 text-xl">✓</span>
                                    <span className="text-gray-700 font-medium">
                                        {t(`content.features.list.${i}`)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {t('content.faq.title')}
                        </h2>
                        <div className="space-y-4">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {t(`content.faq.questions.${i}.q`)}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t(`content.faq.questions.${i}.a`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Related Tools */}
                    <RelatedTools toolId="json-formatter" locale={locale} />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
                    <p>{tCommon('footer.copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </footer>
        </div>
    );
}

