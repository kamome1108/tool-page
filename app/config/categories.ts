export const categories = [
    {
        id: 'security',
        icon: '🔒',
        color: 'security',
    },
    {
        id: 'dev',
        icon: '💻',
        color: 'dev',
    },
    {
        id: 'design',
        icon: '🎨',
        color: 'design',
    },
    {
        id: 'image',
        icon: '🖼️',
        color: 'image',
    },
    {
        id: 'writing',
        icon: '✍️',
        color: 'writing',
    },
    {
        id: 'productivity',
        icon: '📊',
        color: 'productivity',
    },
    {
        id: 'finance',
        icon: '💰',
        color: 'finance',
    },
    {
        id: 'education',
        icon: '📚',
        color: 'education',
    },
    {
        id: 'web',
        icon: '🌐',
        color: 'web',
    },
    {
        id: 'social',
        icon: '📱',
        color: 'social',
    },
    {
        id: 'media',
        icon: '🎵',
        color: 'media',
    },
    {
        id: 'utilities',
        icon: '🔧',
        color: 'utilities',
    },
    {
        id: 'converter',
        icon: '🔄',
        color: 'converter',
    },
] as const;

export type CategoryId = typeof categories[number]['id'];
