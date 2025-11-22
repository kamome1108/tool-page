'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface ColorConverterClientProps {
    locale: string;
}

export default function ColorConverterClient({ locale }: ColorConverterClientProps) {
    const t = useTranslations('Tools.color-converter');
    const [input, setInput] = useState('#3B82F6');
    const [hex, setHex] = useState('#3B82F6');
    const [rgb, setRgb] = useState('rgb(59, 130, 246)');
    const [hsl, setHsl] = useState('hsl(217, 91%, 60%)');
    const [isValid, setIsValid] = useState(true);
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        convertColor(input);
    }, [input]);

    const convertColor = (color: string) => {
        // Basic validation and conversion logic
        // This is a simplified version. In a real app, use a library like 'tinycolor2' or 'colord'

        let r = 0, g = 0, b = 0;
        let valid = false;

        // Try HEX
        if (/^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(color)) {
            let hexVal = color.replace('#', '');
            if (hexVal.length === 3) {
                hexVal = hexVal.split('').map(c => c + c).join('');
            }
            r = parseInt(hexVal.substring(0, 2), 16);
            g = parseInt(hexVal.substring(2, 4), 16);
            b = parseInt(hexVal.substring(4, 6), 16);
            valid = true;
        }
        // Try RGB
        else if (/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(color)) {
            const parts = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
            if (parts) {
                r = parseInt(parts[1]);
                g = parseInt(parts[2]);
                b = parseInt(parts[3]);
                valid = true;
            }
        }
        // Try HSL (Simplified parsing)
        else if (/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/i.test(color)) {
            // HSL to RGB conversion would go here
            // For simplicity in this demo without external libs, we might skip full HSL->RGB implementation 
            // or implement a basic one.
            // Let's assume for now we just validate it exists, but for full functionality
            // we'd need the conversion math.
            // Implementing a basic HSL to RGB for completeness:
            const parts = color.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/i);
            if (parts) {
                const h = parseInt(parts[1]) / 360;
                const s = parseInt(parts[2]) / 100;
                const l = parseInt(parts[3]) / 100;

                let t2;
                if (l <= 0.5) t2 = l * (s + 1);
                else t2 = l + s - (l * s);
                const t1 = l * 2 - t2;

                const hueToRgb = (t1: number, t2: number, hue: number) => {
                    if (hue < 0) hue += 1;
                    if (hue > 1) hue -= 1;
                    if (hue < 1 / 6) return t1 + (t2 - t1) * 6 * hue;
                    if (hue < 1 / 2) return t2;
                    if (hue < 2 / 3) return t1 + (t2 - t1) * (2 / 3 - hue) * 6;
                    return t1;
                }

                r = Math.round(hueToRgb(t1, t2, h + 1 / 3) * 255);
                g = Math.round(hueToRgb(t1, t2, h) * 255);
                b = Math.round(hueToRgb(t1, t2, h - 1 / 3) * 255);
                valid = true;
            }
        }

        if (valid) {
            setIsValid(true);

            // Update HEX
            const toHex = (n: number) => {
                const hex = n.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            setHex(`#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase());

            // Update RGB
            setRgb(`rgb(${r}, ${g}, ${b})`);

            // Update HSL
            const rNorm = r / 255;
            const gNorm = g / 255;
            const bNorm = b / 255;
            const max = Math.max(rNorm, gNorm, bNorm);
            const min = Math.min(rNorm, gNorm, bNorm);
            let h = 0, s = 0, l = (max + min) / 2;

            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
                    case gNorm: h = (bNorm - rNorm) / d + 2; break;
                    case bNorm: h = (rNorm - gNorm) / d + 4; break;
                }
                h /= 6;
            }

            setHsl(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
        } else {
            setIsValid(false);
        }
    };

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <Card padding="lg" className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ui.inputLabel')}
                    </label>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isValid ? 'border-gray-300' : 'border-red-500 focus:ring-red-500'}`}
                        placeholder="#3B82F6"
                    />
                    {!isValid && (
                        <p className="mt-1 text-sm text-red-600">{t('ui.invalidColor')}</p>
                    )}
                </div>

                {isValid && (
                    <>
                        <div
                            className="w-full h-32 rounded-md shadow-inner border border-gray-200"
                            style={{ backgroundColor: hex }}
                        />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                <div>
                                    <div className="text-xs text-gray-500">{t('ui.hex')}</div>
                                    <div className="font-mono font-medium">{hex}</div>
                                </div>
                                <Button
                                    onClick={() => handleCopy(hex, 'hex')}
                                    variant="ghost"
                                    size="sm"
                                    className={copied === 'hex' ? "text-green-600" : ""}
                                >
                                    {copied === 'hex' ? t('ui.copied') : t('ui.copy')}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                <div>
                                    <div className="text-xs text-gray-500">{t('ui.rgb')}</div>
                                    <div className="font-mono font-medium">{rgb}</div>
                                </div>
                                <Button
                                    onClick={() => handleCopy(rgb, 'rgb')}
                                    variant="ghost"
                                    size="sm"
                                    className={copied === 'rgb' ? "text-green-600" : ""}
                                >
                                    {copied === 'rgb' ? t('ui.copied') : t('ui.copy')}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                <div>
                                    <div className="text-xs text-gray-500">{t('ui.hsl')}</div>
                                    <div className="font-mono font-medium">{hsl}</div>
                                </div>
                                <Button
                                    onClick={() => handleCopy(hsl, 'hsl')}
                                    variant="ghost"
                                    size="sm"
                                    className={copied === 'hsl' ? "text-green-600" : ""}
                                >
                                    {copied === 'hsl' ? t('ui.copied') : t('ui.copy')}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
