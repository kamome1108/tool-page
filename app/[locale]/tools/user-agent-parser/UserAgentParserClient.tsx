'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { UAParser } from 'ua-parser-js';
import { Toaster, toast } from 'react-hot-toast';

export default function UserAgentParserClient() {
    const t = useTranslations('Tools.user-agent-parser.ui');
    const [uaString, setUaString] = useState('');
    const [result, setResult] = useState<UAParser.IResult | null>(null);

    useEffect(() => {
        // Set initial UA string to current browser's UA
        setUaString(navigator.userAgent);
    }, []);

    const handleParse = () => {
        if (!uaString) return;
        const parser = new UAParser(uaString);
        setResult(parser.getResult());
    };

    const handleUseMyUA = () => {
        setUaString(navigator.userAgent);
        const parser = new UAParser(navigator.userAgent);
        setResult(parser.getResult());
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success(t('copied'));
        });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('inputLabel')}
                        </label>
                        <textarea
                            value={uaString}
                            onChange={(e) => setUaString(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                            placeholder={t('inputLabel')}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={handleParse}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                            disabled={!uaString}
                        >
                            {t('parse')}
                        </Button>

                        <Button
                            onClick={handleUseMyUA}
                            variant="outline"
                        >
                            {t('useMyUA')}
                        </Button>
                    </div>
                </div>

                {result && (
                    <div className="mt-8 space-y-6 animate-fade-in">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                            {t('result')}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ResultItem
                                label={t('browser')}
                                value={`${result.browser.name || '-'} ${result.browser.version || ''}`}
                                onCopy={copyToClipboard}
                            />
                            <ResultItem
                                label={t('os')}
                                value={`${result.os.name || '-'} ${result.os.version || ''}`}
                                onCopy={copyToClipboard}
                            />
                            <ResultItem
                                label={t('device')}
                                value={`${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type || 'Desktop'})`}
                                onCopy={copyToClipboard}
                            />
                            <ResultItem
                                label={t('engine')}
                                value={`${result.engine.name || '-'} ${result.engine.version || ''}`}
                                onCopy={copyToClipboard}
                            />
                            <ResultItem
                                label={t('cpu')}
                                value={result.cpu.architecture || '-'}
                                onCopy={copyToClipboard}
                            />
                        </div>
                    </div>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}

function ResultItem({ label, value, onCopy }: { label: string, value: string, onCopy: (text: string) => void }) {
    if (!value || value.trim() === '') return null;

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 relative group">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
            <div className="font-medium text-gray-900 break-words">{value}</div>
            <button
                onClick={() => onCopy(value)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </button>
        </div>
    );
}
