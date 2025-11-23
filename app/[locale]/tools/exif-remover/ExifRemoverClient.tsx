'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import * as piexif from 'piexifjs';
import { Toaster, toast } from 'react-hot-toast';

export default function ExifRemoverClient() {
    const t = useTranslations('Tools.exif-remover.ui');
    const [file, setFile] = useState<File | null>(null);
    const [cleanedFile, setCleanedFile] = useState<string | null>(null);
    const [metadataCount, setMetadataCount] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setCleanedFile(null);
            setMetadataCount(null);

            // Check for metadata
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result && typeof e.target.result === 'string') {
                    try {
                        const exifObj = piexif.load(e.target.result);
                        let count = 0;
                        for (const ifd in exifObj) {
                            if (ifd === 'thumbnail') continue;
                            // @ts-ignore
                            for (const tag in exifObj[ifd]) {
                                count++;
                            }
                        }
                        setMetadataCount(count);
                    } catch (error) {
                        console.error('Error reading Exif:', error);
                        setMetadataCount(0);
                    }
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const removeExif = async () => {
        if (!file) return;

        setIsProcessing(true);
        const loadingToast = toast.loading(t('processing'));

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result && typeof e.target.result === 'string') {
                    try {
                        const cleanData = piexif.remove(e.target.result);
                        setCleanedFile(cleanData);
                        toast.success(t('success'), { id: loadingToast });
                    } catch (error) {
                        console.error(error);
                        toast.error(t('error'), { id: loadingToast });
                    } finally {
                        setIsProcessing(false);
                    }
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error(error);
            toast.error(t('error'), { id: loadingToast });
            setIsProcessing(false);
        }
    };

    const downloadImage = () => {
        if (!cleanedFile || !file) return;

        const link = document.createElement('a');
        link.href = cleanedFile;
        link.download = `clean-${file.name}`;
        link.click();
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Toaster position="bottom-right" />
            <Card className="p-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                    <input
                        type="file"
                        accept="image/jpeg,image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-4"
                    >
                        <div className="bg-blue-50 p-4 rounded-full">
                            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xl font-semibold text-gray-700 block">
                                {t('selectImage')}
                            </span>
                            <span className="text-sm text-gray-500 block">
                                {t('dragDrop')}
                            </span>
                        </div>
                    </label>
                </div>

                {file && (
                    <div className="mt-8 space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-medium text-gray-700">{file.name}</span>
                                {metadataCount !== null && (
                                    <span className={`text-sm font-medium px-2 py-1 rounded ${metadataCount > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {metadataCount > 0 ? t('metadataFound', { count: metadataCount }) : t('noMetadata')}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                onClick={removeExif}
                                disabled={isProcessing}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3"
                            >
                                {isProcessing ? t('processing') : t('remove')}
                            </Button>

                            {cleanedFile && (
                                <Button
                                    onClick={downloadImage}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
                                >
                                    {t('download')}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
