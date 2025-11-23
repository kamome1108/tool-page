'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import SignatureCanvas from 'react-signature-canvas';

export default function SignatureGeneratorClient() {
    const t = useTranslations('Tools.signature-generator.ui');
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [penColor, setPenColor] = useState('#000000');
    const [penWidth, setPenWidth] = useState(2);
    const [backgroundColor, setBackgroundColor] = useState('transparent');

    const clear = () => {
        sigCanvas.current?.clear();
    };

    const download = () => {
        if (sigCanvas.current) {
            const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `signature-${new Date().toISOString()}.png`;
            link.click();
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 p-6 flex flex-col items-center justify-center bg-gray-50">
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm"
                        style={{ backgroundColor: backgroundColor === 'transparent' ? 'white' : backgroundColor }}
                    >
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor={penColor}
                            minWidth={penWidth}
                            maxWidth={penWidth}
                            backgroundColor={backgroundColor === 'transparent' ? 'rgba(0,0,0,0)' : backgroundColor}
                            canvasProps={{
                                width: 600,
                                height: 300,
                                className: 'cursor-crosshair'
                            }}
                        />
                    </div>
                </Card>

                <Card className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('penColor')}</label>
                        <div className="flex gap-2 flex-wrap">
                            {['#000000', '#0000FF', '#FF0000', '#008000'].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setPenColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 ${penColor === color ? 'border-gray-400 scale-110' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                            <input
                                type="color"
                                value={penColor}
                                onChange={(e) => setPenColor(e.target.value)}
                                className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium text-gray-700">{t('penWidth')}</label>
                            <span className="text-gray-500">{penWidth}px</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={penWidth}
                            onChange={(e) => setPenWidth(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{t('backgroundColor')}</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setBackgroundColor('transparent')}
                                className={`flex-1 py-2 px-3 text-sm rounded border ${backgroundColor === 'transparent' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}
                            >
                                {t('transparent')}
                            </button>
                            <button
                                onClick={() => setBackgroundColor('#ffffff')}
                                className={`flex-1 py-2 px-3 text-sm rounded border ${backgroundColor === '#ffffff' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}
                            >
                                {t('white')}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                        <Button
                            onClick={clear}
                            variant="outline"
                            className="w-full"
                        >
                            {t('clear')}
                        </Button>
                        <Button
                            onClick={download}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
                        >
                            {t('download')}
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
