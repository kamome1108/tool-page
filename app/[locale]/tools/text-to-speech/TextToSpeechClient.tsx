'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

export default function TextToSpeechClient() {
    const t = useTranslations('Tools.text-to-speech.ui');
    const [text, setText] = useState('');
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [volume, setVolume] = useState(1);

    const synthRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;

            const loadVoices = () => {
                const availableVoices = synthRef.current?.getVoices() || [];
                setVoices(availableVoices);
                if (availableVoices.length > 0 && !selectedVoice) {
                    setSelectedVoice(availableVoices[0]);
                }
            };

            loadVoices();
            if (synthRef.current?.onvoiceschanged !== undefined) {
                synthRef.current.onvoiceschanged = loadVoices;
            }
        }
    }, [selectedVoice]);

    const handlePlay = () => {
        if (!synthRef.current || !text) return;

        if (isPaused) {
            synthRef.current.resume();
            setIsPaused(false);
            setIsPlaying(true);
            return;
        }

        if (synthRef.current.speaking) {
            synthRef.current.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error', event);
            setIsPlaying(false);
            setIsPaused(false);
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
        setIsPlaying(true);
    };

    const handlePause = () => {
        if (synthRef.current && isPlaying) {
            synthRef.current.pause();
            setIsPaused(true);
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsPlaying(false);
            setIsPaused(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 p-6">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={t('inputPlaceholder')}
                        className="w-full h-64 p-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                </Card>

                <Card className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('voice')}</label>
                        <select
                            value={selectedVoice?.name || ''}
                            onChange={(e) => {
                                const voice = voices.find(v => v.name === e.target.value);
                                if (voice) setSelectedVoice(voice);
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            disabled={voices.length === 0}
                        >
                            {voices.length === 0 ? (
                                <option>{t('noVoices')}</option>
                            ) : (
                                voices.map((voice) => (
                                    <option key={voice.name} value={voice.name}>
                                        {voice.name} ({voice.lang})
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium text-gray-700">{t('rate')}</label>
                            <span className="text-gray-500">{rate}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium text-gray-700">{t('pitch')}</label>
                            <span className="text-gray-500">{pitch}</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={pitch}
                            onChange={(e) => setPitch(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium text-gray-700">{t('volume')}</label>
                            <span className="text-gray-500">{Math.round(volume * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                        {!isPlaying ? (
                            <Button
                                onClick={handlePlay}
                                disabled={!text}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
                            >
                                {t('play')}
                            </Button>
                        ) : (
                            <Button
                                onClick={handlePause}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2"
                            >
                                {t('pause')}
                            </Button>
                        )}
                        <Button
                            onClick={handleStop}
                            disabled={!isPlaying && !isPaused}
                            variant="outline"
                            className="w-full"
                        >
                            {t('stop')}
                        </Button>
                    </div>
                </Card>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
