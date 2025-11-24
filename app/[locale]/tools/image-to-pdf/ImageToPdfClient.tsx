'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';
import jsPDF from 'jspdf';

interface ImageFile {
    id: string;
    file: File;
    preview: string;
}

export default function ImageToPdfClient() {
    const t = useTranslations('Tools.image-to-pdf.ui');
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'fit'>('a4');
    const [orientation, setOrientation] = useState<'p' | 'l'>('p');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages: ImageFile[] = Array.from(e.target.files).map((file) => ({
                id: crypto.randomUUID(),
                file,
                preview: URL.createObjectURL(file),
            }));
            setImages((prev) => [...prev, ...newImages]);
        }
    };

    const removeImage = (id: string) => {
        setImages((prev) => {
            const newImages = prev.filter((img) => img.id !== id);
            // Revoke URL for removed image to free memory
            const removedImage = prev.find((img) => img.id === id);
            if (removedImage) URL.revokeObjectURL(removedImage.preview);
            return newImages;
        });
    };

    const clearAll = () => {
        images.forEach((img) => URL.revokeObjectURL(img.preview));
        setImages([]);
    };

    const convertToPdf = async () => {
        if (images.length === 0) return;

        setIsConverting(true);
        try {
            const doc = new jsPDF({
                orientation: orientation,
                unit: 'mm',
                format: pageSize === 'fit' ? undefined : pageSize,
            });

            // Remove default first page if we are adding pages dynamically or if fit mode
            if (pageSize === 'fit') {
                doc.deletePage(1);
            }

            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const imgData = await readFileAsDataURL(img.file);

                const imgProps = doc.getImageProperties(imgData);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = doc.internal.pageSize.getHeight();

                let width = pdfWidth;
                let height = (imgProps.height * pdfWidth) / imgProps.width;

                // If 'fit' mode, add page with image dimensions
                if (pageSize === 'fit') {
                    // Convert pixels to mm (approx 96 DPI)
                    const mmWidth = imgProps.width * 0.264583;
                    const mmHeight = imgProps.height * 0.264583;
                    doc.addPage([mmWidth, mmHeight], mmWidth > mmHeight ? 'l' : 'p');
                    doc.addImage(imgData, 'JPEG', 0, 0, mmWidth, mmHeight);
                } else {
                    // Standard page size logic
                    if (i > 0) doc.addPage();

                    // Scale to fit page if needed
                    if (height > pdfHeight) {
                        height = pdfHeight;
                        width = (imgProps.width * pdfHeight) / imgProps.height;
                    }

                    // Center image
                    const x = (pdfWidth - width) / 2;
                    const y = (pdfHeight - height) / 2;

                    doc.addImage(imgData, 'JPEG', x, y, width, height);
                }
            }

            doc.save('converted.pdf');
            toast.success('PDF downloaded!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to convert images.');
        } finally {
            setIsConverting(false);
        }
    };

    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-6 space-y-6">
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files) {
                            const newImages: ImageFile[] = Array.from(e.dataTransfer.files)
                                .filter(file => file.type.startsWith('image/'))
                                .map((file) => ({
                                    id: crypto.randomUUID(),
                                    file,
                                    preview: URL.createObjectURL(file),
                                }));
                            setImages((prev) => [...prev, ...newImages]);
                        }
                    }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="space-y-2">
                        <div className="text-4xl">🖼️</div>
                        <p className="text-gray-600 font-medium">{t('upload')}</p>
                        <p className="text-sm text-gray-500">{t('uploadHelp')}</p>
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-700">{images.length} images selected</h3>
                            <Button onClick={clearAll} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                {t('clear')}
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map((img) => (
                                <div key={img.id} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                                    <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeImage(img.id)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">{t('pageSize')}</label>
                                <select
                                    value={pageSize}
                                    onChange={(e) => setPageSize(e.target.value as any)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="a4">{t('sizes.a4')}</option>
                                    <option value="letter">{t('sizes.letter')}</option>
                                    <option value="fit">{t('sizes.fit')}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">{t('orientation')}</label>
                                <select
                                    value={orientation}
                                    onChange={(e) => setOrientation(e.target.value as any)}
                                    disabled={pageSize === 'fit'}
                                    className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                                >
                                    <option value="p">{t('orientations.portrait')}</option>
                                    <option value="l">{t('orientations.landscape')}</option>
                                </select>
                            </div>
                        </div>

                        <Button
                            onClick={convertToPdf}
                            disabled={isConverting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                        >
                            {isConverting ? t('converting') : t('download')}
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
