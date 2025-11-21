import { MetadataRoute } from 'next';
import { categories } from '@/app/config/categories';
import { tools } from '@/app/config/tools';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tool-page-29b.pages.dev';
    // Hardcoded locales to avoid import issues during build
    const locales = ['en', 'ja', 'tl', 'hi', 'id', 'vi', 'th'];

    const sitemap: MetadataRoute.Sitemap = [];

    // Helper to generate entries for a path
    const generateEntries = (path: string) => {
        // Add entry for each locale
        locales.forEach((locale) => {
            sitemap.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: path === '' ? 1 : 0.8,
            });
        });
    };

    // 1. Home Page
    generateEntries('');

    // 2. Search Page
    generateEntries('/search');

    // 3. Category Pages
    categories.forEach((category) => {
        generateEntries(`/category/${category.id}`);
    });

    // 4. Tool Pages
    tools.forEach((tool) => {
        generateEntries(`/tools/${tool.slug}`);
    });

    return sitemap;
}
