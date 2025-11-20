import type { CategoryId } from './categories';

export interface ToolMeta {
    title: { en: string; ja: string };
    description: { en: string; ja: string };
    keywords: string[];
    longDescription?: { en: string; ja: string };
    howToUse?: { en: string[]; ja: string[] };
    faq?: { en: Array<{ q: string; a: string }>; ja: Array<{ q: string; a: string }> };
}

export interface Tool {
    id: string;
    slug: string;
    category: CategoryId;
    icon: string;
    meta: ToolMeta;
}

export const tools: Tool[] = [
    {
        id: 'password-generator',
        slug: 'password-generator',
        category: 'security',
        icon: '🔒',
        meta: {
            title: {
                en: 'Secure Password Generator',
                ja: 'セキュアパスワード生成'
            },
            description: {
                en: 'Generate strong, secure passwords instantly. 100% client-side, no data leaves your device.',
                ja: '強力で安全なパスワードを即座に生成。100%クライアントサイドで、データは送信されません。'
            },
            keywords: ['password', 'security', 'generator', 'パスワード', 'セキュリティ', '生成'],
            longDescription: {
                en: 'Our Secure Password Generator uses cryptographically secure random number generation (crypto.getRandomValues()) to create strong passwords. All processing happens in your browser - no passwords are ever sent to a server. Customize length, character types, and generate unlimited passwords for free.',
                ja: '当社のセキュアパスワード生成ツールは、暗号学的に安全な乱数生成（crypto.getRandomValues()）を使用して強力なパスワードを作成します。すべての処理はブラウザ内で行われ、パスワードがサーバーに送信されることはありません。長さや文字タイプをカスタマイズし、無制限にパスワードを生成できます。'
            },
            howToUse: {
                en: [
                    'Adjust the password length using the slider (4-64 characters)',
                    'Select which character types to include (uppercase, lowercase, numbers, symbols)',
                    'Click "Generate New Password" to create a password',
                    'Click "Copy" to copy the password to your clipboard'
                ],
                ja: [
                    'スライダーでパスワードの長さを調整（4〜64文字）',
                    '含める文字タイプを選択（大文字、小文字、数字、記号）',
                    '「新しいパスワードを生成」をクリックしてパスワードを作成',
                    '「コピー」をクリックしてクリップボードにコピー'
                ]
            },
            faq: {
                en: [
                    { q: 'Is this password generator secure?', a: 'Yes, it uses crypto.getRandomValues() which is cryptographically secure and recommended for password generation.' },
                    { q: 'Are my passwords sent to a server?', a: 'No, all password generation happens in your browser. Nothing is sent to any server.' },
                    { q: 'How long should my password be?', a: 'We recommend at least 16 characters for strong security.' }
                ],
                ja: [
                    { q: 'このパスワード生成ツールは安全ですか？', a: 'はい、暗号学的に安全でパスワード生成に推奨されているcrypto.getRandomValues()を使用しています。' },
                    { q: 'パスワードはサーバーに送信されますか？', a: 'いいえ、すべてのパスワード生成はブラウザ内で行われます。サーバーには何も送信されません。' },
                    { q: 'パスワードはどのくらいの長さにすべきですか？', a: '強力なセキュリティのために、少なくとも16文字を推奨します。' }
                ]
            }
        },
    },
    {
        id: 'character-counter',
        slug: 'character-counter',
        category: 'writing',
        icon: '📝',
        meta: {
            title: {
                en: 'Character & Line Counter',
                ja: '文字数・行数カウンター'
            },
            description: {
                en: 'Count characters, lines, and paragraphs in real-time.',
                ja: '文字数、行数、段落数をリアルタイムでカウント。'
            },
            keywords: ['character', 'counter', 'writing', '文字数', 'カウント', 'ライティング'],
        },
    },
    {
        id: 'aspect-ratio-calculator',
        slug: 'aspect-ratio-calculator',
        category: 'design',
        icon: '📐',
        meta: {
            title: {
                en: 'Aspect Ratio Calculator',
                ja: 'アスペクト比計算機'
            },
            description: {
                en: 'Calculate dimensions for 16:9, 4:3, and custom ratios.',
                ja: '16:9、4:3、カスタム比率の寸法を計算。'
            },
            keywords: ['aspect', 'ratio', 'calculator', 'design', 'アスペクト比', '計算', 'デザイン'],
        },
    },
    {
        id: 'json-formatter',
        slug: 'json-formatter',
        category: 'dev',
        icon: '💻',
        meta: {
            title: {
                en: 'JSON Formatter & Validator',
                ja: 'JSON整形・バリデータ'
            },
            description: {
                en: 'Format, validate, and minify JSON data with syntax highlighting.',
                ja: 'JSONデータを整形、検証、圧縮。シンタックスハイライト付き。'
            },
            keywords: ['json', 'formatter', 'validator', 'developer', 'JSON', '整形', '開発者'],
        },
    },
    {
        id: 'multi-cropper',
        slug: 'multi-cropper',
        category: 'image',
        icon: '✂️',
        meta: {
            title: {
                en: 'Multi-Image Cropper',
                ja: 'マルチ画像クロップ'
            },
            description: {
                en: 'Crop multiple areas from a single image and download as ZIP.',
                ja: '1枚の画像から複数の領域を切り取り、ZIPでダウンロード。'
            },
            keywords: ['image', 'crop', 'multi', 'batch', '画像', 'クロップ', '一括'],
        },
    },
];
