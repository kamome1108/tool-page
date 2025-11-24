'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import Papa from 'papaparse';
import { Toaster, toast } from 'react-hot-toast';

export default function CsvToJsonClient() {
    const t = useTranslations('Tools.csv-to-json.ui');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [header, setHeader] = useState(true);
    const [skipEmptyLines, setSkipEmptyLines] = useState(true);

    const handleConvert = () => {
        try {
            const result = Papa.parse(input, {
                header: header,
                skipEmptyLines: skipEmptyLines,
            });

            if (result.errors.length > 0) {
                console.error(result.errors);
                toast.error(t('error'));
                return;
            }

            setOutput(JSON.stringify(result.data, null, 2));
        } catch (error) {
            console.error(error);
            toast.error(t('error'));
        }
    };

    const handleDownload = () => {
        if (!output) return;
        const blob = new Blob([output], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `converted-${new Date().toISOString()}.json`;
        link.click();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        toast.success(t('copied'));
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-700">CSV Input</h3>
                        <Button
                            onClick={handleClear}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500"
                        >
                            {t('clear')}
                        </Button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('inputPlaceholder')}
                        className="w-full h-[400px] p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        spellCheck={false}
                    />
                </Card>

                <Card className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-700">JSON Output</h3>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleCopy}
                                disabled={!output}
                                variant="outline"
                                size="sm"
                            >
                                {t('copy')}
                            </Button>
                            <Button
                                onClick={handleDownload}
                                disabled={!output}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                {t('download')}
                            </Button>
                        </div>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder={t('outputPlaceholder')}
                        className="w-full h-[400px] p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg resize-none"
                    />
                </Card>
            </div>

            <Card className="p-4">
                <div className="flex flex-wrap items-center gap-6 justify-center">
                    <span className="font-medium text-gray-700">{t('options')}:</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={header}
                            onChange={(e) => setHeader(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">{t('header')}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={skipEmptyLines}
                            onChange={(e) => setSkipEmptyLines(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">{t('skipEmptyLines')}</span>
                    </label>
                    <Button
                        onClick={handleConvert}
                        disabled={!input}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    >
                        {t('convert')}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
