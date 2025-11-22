'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface FileDropzoneProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    icon?: React.ReactNode;
    label?: string;
    className?: string;
}

export function FileDropzone({
    onFileSelect,
    accept = "image/*",
    icon = <div className="text-6xl mb-4">🖼️</div>,
    label,
    className = ""
}: FileDropzoneProps) {
    const t = useTranslations('Common.ui'); // We might need to add this to common.json or pass label as prop
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                } ${className}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={accept}
                className="hidden"
            />
            {icon}
            <p className="text-lg text-gray-600">{label || 'Drop file here or click to upload'}</p>
        </div>
    );
}
