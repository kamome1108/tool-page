export const categories = [
    {
        id: 'security',
        name: { en: 'Security & Privacy', ja: 'セキュリティ' },
        icon: '🔒',
        color: 'security',
        description: {
            en: 'Password generators, encryption tools, and privacy utilities',
            ja: 'パスワード生成、暗号化ツール、プライバシーユーティリティ'
        }
    },
    {
        id: 'dev',
        name: { en: 'Developer Tools', ja: '開発者向け' },
        icon: '💻',
        color: 'dev',
        description: {
            en: 'Code formatters, validators, and development utilities',
            ja: 'コード整形、バリデーター、開発ユーティリティ'
        }
    },
    {
        id: 'design',
        name: { en: 'Design & Creative', ja: 'デザイン' },
        icon: '🎨',
        color: 'design',
        description: {
            en: 'Design calculators, color tools, and creative utilities',
            ja: 'デザイン計算機、カラーツール、クリエイティブユーティリティ'
        }
    },
    {
        id: 'image',
        name: { en: 'Image & Photo', ja: '画像処理' },
        icon: '🖼️',
        color: 'image',
        description: {
            en: 'Image editors, converters, and photo manipulation tools',
            ja: '画像エディタ、コンバーター、写真編集ツール'
        }
    },
    {
        id: 'writing',
        name: { en: 'Writing & Text', ja: 'ライティング' },
        icon: '✍️',
        color: 'writing',
        description: {
            en: 'Text editors, counters, and writing assistance tools',
            ja: 'テキストエディタ、カウンター、ライティング支援ツール'
        }
    },
    {
        id: 'productivity',
        name: { en: 'Productivity', ja: '生産性' },
        icon: '📊',
        color: 'productivity',
        description: {
            en: 'Time trackers, calculators, and productivity boosters',
            ja: '時間管理、計算機、生産性向上ツール'
        }
    },
    {
        id: 'finance',
        name: { en: 'Finance & Business', ja: '金融・ビジネス' },
        icon: '💰',
        color: 'finance',
        description: {
            en: 'Financial calculators, converters, and business tools',
            ja: '金融計算機、コンバーター、ビジネスツール'
        }
    },
    {
        id: 'education',
        name: { en: 'Education & Learning', ja: '教育' },
        icon: '📚',
        color: 'education',
        description: {
            en: 'Learning tools, quiz generators, and educational utilities',
            ja: '学習ツール、クイズ生成、教育ユーティリティ'
        }
    },
    {
        id: 'web',
        name: { en: 'Web & SEO', ja: 'Web・SEO' },
        icon: '🌐',
        color: 'web',
        description: {
            en: 'SEO tools, meta tag generators, and web utilities',
            ja: 'SEOツール、メタタグ生成、Webユーティリティ'
        }
    },
    {
        id: 'social',
        name: { en: 'Social Media', ja: 'SNS' },
        icon: '📱',
        color: 'social',
        description: {
            en: 'Social media tools, hashtag generators, and content planners',
            ja: 'SNSツール、ハッシュタグ生成、コンテンツプランナー'
        }
    },
    {
        id: 'media',
        name: { en: 'Audio & Video', ja: '音声・動画' },
        icon: '🎵',
        color: 'media',
        description: {
            en: 'Audio editors, video converters, and media tools',
            ja: '音声エディタ、動画コンバーター、メディアツール'
        }
    },
    {
        id: 'utilities',
        name: { en: 'Utilities', ja: 'ユーティリティ' },
        icon: '🔧',
        color: 'utilities',
        description: {
            en: 'General utilities, converters, and miscellaneous tools',
            ja: '汎用ユーティリティ、コンバーター、その他ツール'
        }
    },
] as const;

export type CategoryId = typeof categories[number]['id'];
