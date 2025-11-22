'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface StopwatchClientProps {
    locale: string;
}

export default function StopwatchClient({ locale }: StopwatchClientProps) {
    const t = useTranslations('Tools.stopwatch');
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    const formatTime = (ms: number) => {
        const minutes = Math.floor((ms / 60000) % 60);
        const seconds = Math.floor((ms / 1000) % 60);
        const milliseconds = Math.floor((ms / 10) % 100);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="text-center space-y-8">
                <div className="text-6xl font-mono font-bold tracking-wider text-gray-800">
                    {formatTime(time)}
                </div>

                <div className="flex justify-center space-x-4">
                    <Button
                        onClick={handleStartStop}
                        className={`w-24 ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {isRunning ? t('ui.stop') : t('ui.start')}
                    </Button>
                    <Button
                        onClick={handleLap}
                        variant="outline"
                        disabled={!isRunning}
                        className="w-24"
                    >
                        {t('ui.lap')}
                    </Button>
                    <Button
                        onClick={handleReset}
                        variant="ghost"
                        className="w-24"
                    >
                        {t('ui.reset')}
                    </Button>
                </div>
            </Card>

            {laps.length > 0 && (
                <Card padding="md" className="max-h-64 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">{t('ui.laps')}</h3>
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 text-sm font-medium text-gray-500 border-b pb-2">
                            <div>{t('ui.lapHeader')}</div>
                            <div className="text-center">{t('ui.timeHeader')}</div>
                            <div className="text-right">{t('ui.totalHeader')}</div>
                        </div>
                        {laps.map((lapTime, index) => {
                            const prevLapTime = index > 0 ? laps[index - 1] : 0;
                            const lapSplit = lapTime - prevLapTime;
                            return (
                                <div key={index} className="grid grid-cols-3 text-sm py-2 border-b last:border-0">
                                    <div className="text-gray-600">#{index + 1}</div>
                                    <div className="text-center font-mono">{formatTime(lapSplit)}</div>
                                    <div className="text-right font-mono text-gray-500">{formatTime(lapTime)}</div>
                                </div>
                            );
                        }).reverse()}
                    </div>
                </Card>
            )}

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
