'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import Papa from 'papaparse';
import { Toaster, toast } from 'react-hot-toast';

export default function JsonToCsvClient() {
    const t = useTranslations('Tools.json-to-csv.ui');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleConvert = () => {
        try {
            const jsonData = JSON.parse(input);
            const csv = Papa.unparse(jsonData);
            setOutput(csv);
        } catch (error) {
            console.error(error);
            toast.error(t('error'));
        }
    };

    const handleDownload = () => {
        if (!output) return;
        const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `converted-${new Date().toISOString()}.csv`;
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
                        <h3 className="font-medium text-gray-700">JSON Input</h3>
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
                        <h3 className="font-medium text-gray-700">CSV Output</h3>
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

            <div className="flex justify-center">
                <Button
                    onClick={handleConvert}
                    disabled={!input}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                    {t('convert')}
                </Button>
            </div>
        </div>
    );
}
