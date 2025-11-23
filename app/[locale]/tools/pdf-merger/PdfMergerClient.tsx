'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { PDFDocument } from 'pdf-lib';
import { Toaster, toast } from 'react-hot-toast';

export default function PdfMergerClient() {
    const t = useTranslations('Tools.pdf-merger.ui');
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const mergePdfs = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        const loadingToast = toast.loading(t('processing'));

        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `merged-${new Date().toISOString()}.pdf`;
            link.click();

            toast.success(t('success'), { id: loadingToast });
        } catch (error) {
            console.error(error);
            toast.error(t('error'), { id: loadingToast });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Toaster position="bottom-right" />
            <Card className="p-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                    <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="pdf-upload"
                    />
                    <label
                        htmlFor="pdf-upload"
                        className="cursor-pointer flex flex-col items-center gap-4"
                    >
                        <div className="bg-blue-50 p-4 rounded-full">
                            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xl font-semibold text-gray-700 block">
                                {t('selectFiles')}
                            </span>
                            <span className="text-sm text-gray-500 block">
                                {t('dragDrop')}
                            </span>
                        </div>
                    </label>
                </div>

                {files.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-700 mb-2">
                                {t('filesSelected', { count: files.length })}
                            </h3>
                            <ul className="text-sm text-gray-600 space-y-1 max-h-40 overflow-y-auto">
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        {file.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button
                            onClick={mergePdfs}
                            disabled={isProcessing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                        >
                            {isProcessing ? t('processing') : t('merge')}
                        </Button>
                    </div>
                )}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
