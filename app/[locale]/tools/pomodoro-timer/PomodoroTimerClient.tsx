'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface PomodoroTimerClientProps {
    locale: string;
}

export default function PomodoroTimerClient({ locale }: PomodoroTimerClientProps) {
    const t = useTranslations('Tools.pomodoro-timer');

    const [mode, setMode] = useState<'work' | 'break'>('work');
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            if (timerRef.current) clearInterval(timerRef.current);
            setIsActive(false);
            // Play sound (simple beep using AudioContext or just alert for now, let's try AudioContext for better UX)
            try {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                oscillator.connect(audioContext.destination);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
            } catch (e) {
                console.error("Audio play failed", e);
            }

            // Switch mode automatically or wait for user? Let's wait for user to start next phase but switch state
            if (mode === 'work') {
                setMode('break');
                setTimeLeft(breakDuration * 60);
            } else {
                setMode('work');
                setTimeLeft(workDuration * 60);
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, mode, workDuration, breakDuration]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'work') {
            setTimeLeft(workDuration * 60);
        } else {
            setTimeLeft(breakDuration * 60);
        }
    };

    const handleDurationChange = (type: 'work' | 'break', value: number) => {
        const newVal = Math.max(1, value);
        if (type === 'work') {
            setWorkDuration(newVal);
            if (mode === 'work' && !isActive) setTimeLeft(newVal * 60);
        } else {
            setBreakDuration(newVal);
            if (mode === 'break' && !isActive) setTimeLeft(newVal * 60);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            <Card padding="lg" className="flex flex-col items-center space-y-8">
                {/* Status & Timer Display */}
                <div className="text-center space-y-4">
                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${mode === 'work' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                        {t(`ui.status.${mode}`)}
                    </div>
                    <div className="text-8xl font-mono font-bold text-gray-800 tracking-wider">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex space-x-4">
                    <Button
                        onClick={toggleTimer}
                        size="lg"
                        className={isActive ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}
                    >
                        {isActive ? t('ui.pause') : t('ui.start')}
                    </Button>
                    <Button variant="outline" onClick={resetTimer} size="lg">
                        {t('ui.reset')}
                    </Button>
                </div>
            </Card>

            {/* Settings */}
            <Card padding="md" className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">{t('ui.settings')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('ui.workDuration')}
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={workDuration}
                            onChange={(e) => handleDurationChange('work', parseInt(e.target.value) || 25)}
                            disabled={isActive}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('ui.breakDuration')}
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={breakDuration}
                            onChange={(e) => handleDurationChange('break', parseInt(e.target.value) || 5)}
                            disabled={isActive}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                </div>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
