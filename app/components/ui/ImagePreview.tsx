'use client';

interface ImagePreviewProps {
    src: string;
    alt?: string;
    className?: string;
    imageStyle?: React.CSSProperties;
}

export function ImagePreview({ src, alt = "Preview", className = "", imageStyle }: ImagePreviewProps) {
    return (
        <div className={`flex justify-center bg-gray-100 rounded-lg p-4 overflow-hidden ${className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                className="max-h-[400px] object-contain transition-all duration-200"
                style={imageStyle}
            />
        </div>
    );
}
