'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';
import CryptoJS from 'crypto-js';

export default function HashGeneratorClient() {
    const t = useTranslations('Tools.hash-generator.ui');
    const [inputText, setInputText] = useState('');
    const [hashes, setHashes] = useState<{ [key: string]: string } | null>(null);

    const generateHashes = () => {
        if (!inputText) return;

        const md5 = CryptoJS.MD5(inputText).toString();
        const sha1 = CryptoJS.SHA1(inputText).toString();
        const sha256 = CryptoJS.SHA256(inputText).toString();
        const sha512 = CryptoJS.SHA512(inputText).toString();

        setHashes({
            MD5: md5,
            'SHA-1': sha1,
            'SHA-256': sha256,
            'SHA-512': sha512,
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success(t('copied'));
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('inputLabel')}
                        </label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                            placeholder={t('inputLabel')}
                        />
                    </div>

                    <Button
                        onClick={generateHashes}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        disabled={!inputText}
                    >
                        {t('generate')}
                    </Button>
                </div>

                {hashes && (
                    <div className="mt-8 space-y-6 animate-fade-in">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                            {t('result')}
                        </h3>

                        <div className="space-y-4">
                            {Object.entries(hashes).map(([algo, hash]) => (
                                <div key={algo} className="bg-gray-50 p-4 rounded-lg border border-gray-100 relative group">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">{algo}</div>
                                    <div className="font-mono text-sm text-gray-900 break-all pr-8">{hash}</div>
                                    <button
                                        onClick={() => copyToClipboard(hash)}
                                        className="absolute top-1/2 -translate-y-1/2 right-2 p-2 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title={t('copy')}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
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
