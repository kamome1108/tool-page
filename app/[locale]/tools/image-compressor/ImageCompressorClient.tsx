'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import EnhancedToolLayout from '@/app/components/EnhancedToolLayout';
import { Button } from '@/app/components/ui/Button';
import imageCompression from 'browser-image-compression';
import { Toaster, toast } from 'react-hot-toast';
import { ToolContent } from '@/app/types/tool';

interface Props {
    locale: string;
    content: ToolContent;
}

export default function ImageCompressorClient({ locale, content }: Props) {
    const t = useTranslations('Tools.image-compressor.ui');
    const [file, setFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [quality, setQuality] = useState(80);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setCompressedFile(null);
        }
    };

    const compressImage = async () => {
        if (!file) return;

        setIsProcessing(true);
        const loadingToast = toast.loading(t('processing'));

        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: quality / 100,
            };

            const compressed = await imageCompression(file, options);
            setCompressedFile(compressed);

            toast.success(t('success'), { id: loadingToast });
        } catch (error) {
            console.error(error);
            toast.error(t('error'), { id: loadingToast });
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadImage = () => {
        if (!compressedFile) return;

        const url = URL.createObjectURL(compressedFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = `compressed-${file?.name}`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <EnhancedToolLayout
            {...content}
            title={content.meta.title}
            toolId="image-compressor"
            locale={locale}
        >
            <div className="space-y-6">
                <Toaster position="bottom-right" />

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-800">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-4"
                    >
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full">
                            <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xl font-semibold text-gray-700 dark:text-gray-200 block">
                                {t('selectImage')}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 block">
                                {t('dragDrop')}
                            </span>
                        </div>
                    </label>
                </div>

                {file && (
                    <div className="mt-8 space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700 dark:text-gray-200">{file.name}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{t('originalSize', { size: formatSize(file.size) })}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                    <span>{t('quality', { value: quality })}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={quality}
                                    onChange={(e) => setQuality(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                onClick={compressImage}
                                disabled={isProcessing}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
                            >
                                {isProcessing ? t('processing') : t('compress')}
                            </Button>

                            {compressedFile && (
                                <Button
                                    onClick={downloadImage}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
                                >
                                    {t('download')}
                                </Button>
                            )}
                        </div>

                        {compressedFile && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-green-700 dark:text-green-400 font-medium">
                                        {t('compressedSize', { size: formatSize(compressedFile.size) })}
                                    </span>
                                    <span className="text-green-600 dark:text-green-400 text-sm font-bold bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">
                                        {t('reduction', { percent: Math.round((1 - compressedFile.size / file.size) * 100) })}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {t('processingNote')}
                </div>
            </div>
        </EnhancedToolLayout>
    );
}
