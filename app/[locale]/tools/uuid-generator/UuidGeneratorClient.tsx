'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

export default function UuidGeneratorClient() {
    const t = useTranslations('Tools.uuid-generator.ui');
    const [uuids, setUuids] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [version, setVersion] = useState('v4');

    const generateUuids = () => {
        const newUuids = [];
        for (let i = 0; i < quantity; i++) {
            newUuids.push(crypto.randomUUID());
        }
        setUuids(newUuids);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        toast.success(t('copied'));
    };

    const handleDownload = () => {
        const blob = new Blob([uuids.join('\n')], { type: 'text/plain;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `uuids-${new Date().toISOString()}.txt`;
        link.click();
    };

    const handleClear = () => {
        setUuids([]);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('quantity')}</label>
                        <input
                            type="number"
                            min="1"
                            max="1000"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('version')}</label>
                        <select
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled
                        >
                            <option value="v4">{t('v4')}</option>
                        </select>
                    </div>
                </div>

                <Button
                    onClick={generateUuids}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                >
                    {t('generate')}
                </Button>
            </Card>

            {uuids.length > 0 && (
                <Card className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-700">{t('generated')} ({uuids.length})</h3>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleClear}
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-red-500"
                            >
                                {t('clear')}
                            </Button>
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                size="sm"
                            >
                                {t('copy')}
                            </Button>
                            <Button
                                onClick={handleDownload}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                {t('download')}
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 max-h-[400px] overflow-y-auto font-mono text-sm">
                        {uuids.map((uuid, index) => (
                            <div key={index} className="py-1 border-b border-gray-200 last:border-0">
                                {uuid}
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
