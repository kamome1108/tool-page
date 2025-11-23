'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

export default function BpmTapperClient() {
    const t = useTranslations('Tools.bpm-tapper.ui');
    const [taps, setTaps] = useState<number[]>([]);
    const [bpm, setBpm] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);

    const handleTap = useCallback(() => {
        const now = Date.now();

        setTaps(prevTaps => {
            // Reset if it's been more than 2 seconds since last tap
            if (prevTaps.length > 0 && now - prevTaps[prevTaps.length - 1] > 2000) {
                return [now];
            }

            // Keep only last 10 taps for rolling average
            const newTaps = [...prevTaps, now];
            if (newTaps.length > 10) {
                return newTaps.slice(newTaps.length - 10);
            }
            return newTaps;
        });

        setIsActive(true);

        // Add visual feedback class
        const button = document.getElementById('tap-button');
        if (button) {
            button.classList.add('scale-95');
            setTimeout(() => button.classList.remove('scale-95'), 50);
        }
    }, []);

    useEffect(() => {
        if (taps.length > 1) {
            // Calculate intervals between taps
            const intervals = [];
            for (let i = 1; i < taps.length; i++) {
                intervals.push(taps[i] - taps[i - 1]);
            }

            // Calculate average interval
            const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

            // Calculate BPM
            const calculatedBpm = 60000 / avgInterval;
            setBpm(calculatedBpm);
        } else {
            setBpm(null);
        }
    }, [taps]);

    const handleReset = () => {
        setTaps([]);
        setBpm(null);
        setIsActive(false);
    };

    // Handle spacebar
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && !e.repeat) {
                e.preventDefault(); // Prevent scrolling
                handleTap();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleTap]);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-8 text-center">
                <div className="mb-8">
                    <div className="text-6xl font-bold text-blue-600 mb-2 font-mono">
                        {bpm ? bpm.toFixed(2) : '--'}
                    </div>
                    <div className="text-gray-500 uppercase tracking-wider text-sm">
                        {t('bpm')}
                    </div>
                    {bpm && (
                        <div className="mt-2 text-gray-400 text-sm">
                            {t('nearestWhole')}: <span className="font-bold text-gray-600">{Math.round(bpm)}</span>
                        </div>
                    )}
                </div>

                <button
                    id="tap-button"
                    onClick={handleTap}
                    className={`
            w-64 h-64 rounded-full border-8 transition-all duration-100 focus:outline-none
            flex flex-col items-center justify-center mx-auto mb-8
            ${isActive
                            ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-lg scale-100'
                            : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-blue-300 hover:text-blue-400'
                        }
          `}
                >
                    <span className="text-2xl font-bold">{t('tapHere')}</span>
                    <span className="text-sm mt-2 opacity-70 px-4">{t('tapInstruction')}</span>
                </button>

                <div className="flex justify-center items-center gap-8">
                    <div className="text-gray-500">
                        {t('count')}: <span className="font-bold text-gray-900">{taps.length}</span>
                    </div>

                    <Button
                        onClick={handleReset}
                        variant="outline"
                        size="sm"
                    >
                        {t('reset')}
                    </Button>
                </div>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
