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
];
