'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function YamlToJsonClient() {
    const t = useTranslations('Tools.yaml-to-json.ui');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [yaml, setYaml] = useState<any>(null);

    useEffect(() => {
        const loadYaml = async () => {
            const jsYaml = await import('js-yaml');
            setYaml(jsYaml);
        };
        loadYaml();
    }, []);

    const convert = () => {
        try {
            if (!input.trim() || !yaml) {
                setOutput('');
                return;
            }

            const parsed = yaml.load(input);
            const json = JSON.stringify(parsed, null, 2);

            setOutput(json);
            toast.success(t('success'));
        } catch (error) {
            toast.error(t('error'));
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success(t('copied'));
    };

    const clear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('inputLabel')}</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('inputPlaceholder')}
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <Button onClick={convert} className="bg-blue-600 hover:bg-blue-700 text-white">
                        {t('convert')}
                    </Button>
                    <Button onClick={clear} variant="ghost" className="text-red-600 hover:text-red-700">
                        {t('clear')}
                    </Button>
                </div>

                {output && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('outputLabel')}</label>
                        <div className="relative">
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
                            />
                            <Button
                                onClick={copyToClipboard}
                                className="absolute top-2 right-2 bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
                                size="sm"
                            >
                                {t('copy')}
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
