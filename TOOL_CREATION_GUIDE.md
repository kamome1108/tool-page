# Tool Creation & Optimization Guide

This guide outlines the standard process for creating new tools or optimizing existing ones within the Asset Tools Suite platform. Adhering to these guidelines ensures consistency in UI/UX, mobile responsiveness, and SEO performance across all languages.

## 1. Architecture Overview

Each tool consists of two main parts:
1.  **Server Component (`page.tsx`)**: Handles data fetching (translations) and SEO metadata. It wraps the client component in the `EnhancedToolLayout`.
2.  **Client Component (`[ToolName]Client.tsx`)**: Contains the interactive logic and UI of the tool itself. It should be free of layout elements like headers or footers.

## 2. Directory Structure

```
asset-tools-suite/
├── app/
│   └── [locale]/
│       └── tools/
│           └── [tool-id]/          # e.g., image-converter
│               ├── page.tsx        # Server Component
│               └── Client.tsx      # Client Component (e.g., ImageConverterClient.tsx)
└── messages/
    ├── en/
    │   └── tools/
    │       └── [tool-id].json      # Translation file
    └── [other-locales]/...
```

## 3. Translation File Structure (`messages/[locale]/tools/[tool-id].json`)

The translation file MUST follow this structure to support `EnhancedToolLayout` and SEO requirements.

```json
{
    "meta": {
        "title": "SEO Title (60 chars max)",
        "description": "SEO Description (160 chars max)",
        "keywords": "comma, separated, keywords"
    },
    "tagline": "Short, catchy tagline displayed under the title",
    "ui": {
        "label": "Button Label",
        "placeholder": "Input Placeholder",
        "processingNote": "Privacy assurance note (e.g., 'Processing happens in browser')"
        // ... other tool-specific UI keys
    },
    "content": {
        "description": {
            "title": "What is [Tool Name]?",
            "text": "Detailed explanation of the tool..."
        },
        "howTo": {
            "title": "How to Use [Tool Name]",
            locale={locale}
            description={{
                title: t('content.description.title'),
                text: t('content.description.text')
            }}
            howTo={{
                title: t('content.howTo.title'),
                steps: [
                    t('content.howTo.steps.0'),
                    t('content.howTo.steps.1'),
                    // ... map all steps
                ]
            }}
            features={{
                title: t('content.features.title'),
                list: [
                    t('content.features.list.0'),
                    t('content.features.list.1'),
                    // ... map all features
                ]
            }}
            faq={{
                title: t('content.faq.title'),
                questions: [
                    { q: t('content.faq.questions.0.q'), a: t('content.faq.questions.0.a') },
                    // ... map all questions
                ]
            }}
        >
            <ToolClient locale={locale} />
        </EnhancedToolLayout>
    );
}
```

### Client Component (`ToolClient.tsx`)

*   **Do not** include `<h1>` titles or description paragraphs at the top (handled by layout).
*   **Do not** include `<Section>` wrappers (handled by layout).
*   Focus purely on the tool's functionality (inputs, outputs, buttons).
*   Use `t('ui.key')` for UI elements.

## 5. Development Workflow

1.  **English First**: Create/Update `messages/en/tools/[tool-id].json` with the full structure.
2.  **Japanese Second**: Create/Update `messages/ja/tools/[tool-id].json`.
3.  **Implementation**: Update `page.tsx` and `Client.tsx` to use the new structure.
4.  **Verification**: Test in English and Japanese. Check mobile layout and SEO meta tags.
5.  **Expansion**: Expand to other languages (`hi`, `id`, `th`, `tl`, `vi`) using the English content as a base (translate `tagline`, `ui`, and `content`).

## 6. Checklist Before Release

- [ ] `page.tsx` uses `EnhancedToolLayout`.
- [ ] `Client.tsx` is free of layout/SEO elements.
- [ ] `messages/en/...` has all `content` sections (Description, HowTo, Features, FAQ).
- [ ] `messages/ja/...` has all `content` sections.
- [ ] All other languages (`hi`, `id`, `th`, `tl`, `vi`) have the same structure and content.
- [ ] Mobile view is checked (no horizontal scroll, readable text).
- [ ] JSON syntax in translation files is valid (no markdown markers).
