'use client';
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';
import { Toaster, toast } from 'react-hot-toast';
import { ToolContent } from '@/app/types/tool';

interface Props {
    locale: string;
    content: ToolContent;
}

export default function SvgPlaceholderGeneratorClient({ locale, content }: Props) {
    const t = useTranslations('Tools.svg-placeholder-generator');

    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(150);
    const [bgColor, setBgColor] = useState('#cccccc');
    const [textColor, setTextColor] = useState('#666666');
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(20);
    const [svgCode, setSvgCode] = useState('');

    useEffect(() => {
        const displayText = text || `${width} x ${height}`;
        const code = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dy=".3em">${displayText}</text>
</svg>`;
        setSvgCode(code);
    }, [width, height, bgColor, textColor, text, fontSize]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(svgCode);
        toast.success(t('ui.copied'));
    };

    const downloadSvg = () => {
        const blob = new Blob([svgCode], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `placeholder-${width}x${height}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <EnhancedToolLayout
            {...content}
            title={content.meta.title}
            toolId="svg-placeholder-generator"
            locale={locale}
        >
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('ui.width')}</label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('ui.height')}</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('ui.backgroundColor')}</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="h-10 w-10 rounded cursor-pointer border border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('ui.textColor')}</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="h-10 w-10 rounded cursor-pointer border border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('ui.text')}</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`${width} x ${height}`}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('ui.fontSize')}</label>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="pt-4 space-y-3">
                        <Button onClick={copyToClipboard} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            {t('ui.copy')}
                        </Button>
                        <Button onClick={downloadSvg} variant="secondary" className="w-full">
                            {t('ui.download')}
                        </Button>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2 bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="mb-4 text-sm text-gray-500 font-medium">Preview</div>
                    <div
                        className="shadow-lg max-w-full max-h-[500px] overflow-auto border border-gray-300 bg-white"
                        dangerouslySetInnerHTML={{ __html: svgCode }}
                    />
                    <div className="mt-8 w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">SVG Code</label>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono">
                            {svgCode}
                        </pre>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </EnhancedToolLayout>
    );
}
