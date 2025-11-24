'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function PdfToImageClient() {
    const t = useTranslations('Tools.pdf-to-image.ui');
    const [file, setFile] = useState<File | null>(null);
    const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [format, setFormat] = useState<'jpg' | 'png'>('jpg');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [pdfjs, setPdfjs] = useState<any>(null);

    useEffect(() => {
        const loadPdfJs = async () => {
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
            setPdfjs(pdfjsLib);
        };
        loadPdfJs();
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!pdfjs) {
            toast.error('PDF library not loaded yet. Please try again.');
            return;
        }

        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            try {
                const arrayBuffer = await selectedFile.arrayBuffer();
                const doc = await pdfjs.getDocument(arrayBuffer).promise;
                setPdfDoc(doc);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load PDF.');
            }
        } else if (selectedFile) {
            toast.error('Please select a valid PDF file.');
        }
    };

    const clear = () => {
        setFile(null);
        setPdfDoc(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const convertToImages = async () => {
        if (!pdfDoc) return;

        setIsConverting(true);
        const zip = new JSZip();

        try {
            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // High quality scale
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    await page.render({ canvasContext: context, viewport: viewport, canvas } as any).promise;

                    const blob = await new Promise<Blob | null>((resolve) => {
                        canvas.toBlob(resolve, format === 'jpg' ? 'image/jpeg' : 'image/png', 0.9);
                    });

                    if (blob) {
                        const ext = format === 'jpg' ? 'jpg' : 'png';
                        zip.file(`page-${i}.${ext}`, blob);
                    }
                }
            }

            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'converted-images.zip');
            toast.success('Images downloaded!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to convert PDF.');
        } finally {
            setIsConverting(false);
        }
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
                        const droppedFile = e.dataTransfer.files?.[0];
                        if (droppedFile && droppedFile.type === 'application/pdf') {
                            // Manually trigger change handler logic
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(droppedFile);
                            if (fileInputRef.current) {
                                fileInputRef.current.files = dataTransfer.files;
                                fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                        }
                    }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="space-y-2">
                        <div className="text-4xl">📄</div>
                        <p className="text-gray-600 font-medium">{t('upload')}</p>
                        <p className="text-sm text-gray-500">{t('uploadHelp')}</p>
                    </div>
                </div>

                {file && pdfDoc && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-700">{file.name}</p>
                                <p className="text-sm text-gray-500">{t('pages', { count: pdfDoc.numPages })}</p>
                            </div>
                            <Button onClick={clear} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                {t('clear')}
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">{t('format')}</label>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value as any)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="jpg">{t('formats.jpg')}</option>
                                <option value="png">{t('formats.png')}</option>
                            </select>
                        </div>

                        <Button
                            onClick={convertToImages}
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
