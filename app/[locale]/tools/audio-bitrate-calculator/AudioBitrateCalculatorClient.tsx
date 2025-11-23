'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface AudioBitrateCalculatorClientProps {
    locale: string;
}

export default function AudioBitrateCalculatorClient({ locale }: AudioBitrateCalculatorClientProps) {
    const t = useTranslations('Tools.audio-bitrate-calculator');
    const [mode, setMode] = useState<'size' | 'bitrate'>('size');
    const [minutes, setMinutes] = useState<number | ''>('');
    const [seconds, setSeconds] = useState<number | ''>('');
    const [bitrate, setBitrate] = useState<number | ''>('');
    const [fileSize, setFileSize] = useState<number | ''>('');
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const totalSeconds = (Number(minutes) || 0) * 60 + (Number(seconds) || 0);
        if (totalSeconds <= 0) return;

        if (mode === 'size') {
            if (bitrate === '') return;
            // File Size (MB) = (Bitrate (kbps) * Duration (s)) / 8 / 1024
            const size = (Number(bitrate) * totalSeconds) / 8 / 1024;
            setResult(size);
        } else {
            if (fileSize === '') return;
            // Bitrate (kbps) = (File Size (MB) * 8 * 1024) / Duration (s)
            const br = (Number(fileSize) * 8 * 1024) / totalSeconds;
            setResult(br);
        }
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.mode')}
                    </label>
                    <select
                        value={mode}
                        onChange={(e) => {
                            setMode(e.target.value as any);
                            setResult(null);
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="size">{t('ui.modeSize')}</option>
                        <option value="bitrate">{t('ui.modeBitrate')}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.duration')}
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Min"
                        />
                        <span className="self-center">:</span>
                        <input
                            type="number"
                            value={seconds}
                            onChange={(e) => setSeconds(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Sec"
                        />
                    </div>
                </div>

                {mode === 'size' ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.bitrate')}
                        </label>
                        <input
                            type="number"
                            value={bitrate}
                            onChange={(e) => setBitrate(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="320"
                        />
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.fileSize')}
                        </label>
                        <input
                            type="number"
                            value={fileSize}
                            onChange={(e) => setFileSize(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="10"
                        />
                    </div>
                )}

                <Button onClick={calculate} className="w-full">
                    {t('ui.calculate')}
                </Button>
            </Card>

            {result !== null && (
                <Card padding="lg" className="bg-blue-50 border-blue-100 text-center">
                    <div className="text-sm text-gray-500 mb-1">
                        {mode === 'size' ? t('ui.estimatedSize') : t('ui.requiredBitrate')}
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                        {result.toFixed(2)}
                        <span className="text-lg font-normal text-gray-600 ml-1">
                            {mode === 'size' ? 'MB' : 'kbps'}
                        </span>
                    </div>
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
