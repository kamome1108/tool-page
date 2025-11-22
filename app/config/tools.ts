import type { CategoryId } from './categories';

export interface Tool {
    id: string;
    slug: string;
    category: CategoryId;
    icon: string;
}

export const tools: Tool[] = [
    {
        id: 'password-generator',
        slug: 'password-generator',
        category: 'security',
        icon: '🔒',
    },
    {
        id: 'character-counter',
        slug: 'character-counter',
        category: 'writing',
        icon: '📝',
    },
    {
        id: 'aspect-ratio-calculator',
        slug: 'aspect-ratio-calculator',
        category: 'design',
        icon: '📐',
    },
    {
        id: 'json-formatter',
        slug: 'json-formatter',
        category: 'dev',
        icon: '💻',
    },
    {
        id: 'multi-cropper',
        slug: 'multi-cropper',
        category: 'image',
        icon: '✂️',
    },
    {
        id: 'image-resizer',
        slug: 'image-resizer',
        category: 'image',
        icon: '🖼️',
    },
    {
        id: 'image-converter',
        slug: 'image-converter',
        category: 'image',
        icon: '🔄',
    },
    {
        id: 'image-compressor',
        slug: 'image-compressor',
        category: 'image',
        icon: '📉',
    },
    {
        id: 'color-picker',
        slug: 'color-picker',
        category: 'image',
        icon: '🎨',
    },
    {
        id: 'image-blur',
        slug: 'image-blur',
        category: 'image',
        icon: '🌫️',
    },
    {
        id: 'image-rotate',
        slug: 'image-rotate',
        category: 'image',
        icon: '↻',
    },
    {
        id: 'qr-code-generator',
        slug: 'qr-code-generator',
        category: 'utilities',
        icon: '📱',
    },
];
