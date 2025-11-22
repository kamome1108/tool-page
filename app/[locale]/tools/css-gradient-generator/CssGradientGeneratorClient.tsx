'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface CssGradientGeneratorClientProps {
    locale: string;
}

export default function CssGradientGeneratorClient({ locale }: CssGradientGeneratorClientProps) {
    const t = useTranslations('Tools.css-gradient-generator');
    const [color1, setColor1] = useState('#4F46E5'); // Indigo 600
    const [color2, setColor2] = useState('#EC4899'); // Pink 500
    const [direction, setDirection] = useState('to right');
    const [cssCode, setCssCode] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const gradient = `linear-gradient(${direction}, ${color1}, ${color2})`;
        setCssCode(`background: ${gradient};`);
    }, [color1, color2, direction]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const directions = [
        'to right', 'to left', 'to bottom', 'to top',
        'to bottom right', 'to bottom left', 'to top right', 'to top left'
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Controls */}
                <Card padding="md" className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('ui.color1')}
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={color1}
                                    onChange={(e) => setColor1(e.target.value)}
                                    className="h-10 w-10 p-1 border border-gray-300 rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={color1}
                                    onChange={(e) => setColor1(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md text-sm uppercase"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('ui.color2')}
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={color2}
                                    onChange={(e) => setColor2(e.target.value)}
                                    className="h-10 w-10 p-1 border border-gray-300 rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={color2}
                                    onChange={(e) => setColor2(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md text-sm uppercase"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.direction')}
                        </label>
                        <select
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            {directions.map((dir) => (
                                <option key={dir} value={dir}>
                                    {t(`ui.directions.${dir}`)}
                                </option>
                            ))}
                        </select>
                    </div>
                </Card>

                {/* Preview */}
                <Card padding="md" className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {t('ui.preview')}
                    </label>
                    <div
                        className="w-full h-48 rounded-md shadow-inner border border-gray-200"
                        style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
                    ></div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('ui.cssCode')}
                        </label>
                        <div className="flex space-x-2">
                            <code className="flex-1 p-3 bg-gray-100 rounded-md text-sm font-mono break-all">
                                {cssCode}
                            </code>
                            <Button onClick={handleCopy} className={copied ? "bg-green-600 hover:bg-green-700" : ""}>
                                {copied ? t('ui.copied') : t('ui.copy')}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
