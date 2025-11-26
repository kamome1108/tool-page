export const relatedTools: Record<string, string[]> = {
    'json-formatter': [
        'json-minifier',
        'json-to-yaml',
        'yaml-to-json',
        'xml-formatter'
    ],
    'image-converter': [
        'svg-placeholder-generator',
        'image-resizer',
        'image-compressor'
    ],
    'svg-placeholder-generator': [
        'image-converter',
        'image-resizer',
        'color-picker'
    ],
    'css-minifier': [
        'json-formatter',
        'html-entity-encoder-decoder',
        'color-converter'
    ],
    // Add other tools here as we implement them
};
