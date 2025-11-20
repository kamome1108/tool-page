import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                category: {
                    security: '#3B82F6',      // Blue
                    dev: '#8B5CF6',           // Purple
                    design: '#EC4899',        // Pink
                    image: '#F97316',         // Orange
                    writing: '#10B981',       // Green
                    productivity: '#14B8A6',  // Teal
                    finance: '#059669',       // Emerald
                    education: '#6366F1',     // Indigo
                    web: '#06B6D4',           // Cyan
                    social: '#F43F5E',        // Rose
                    media: '#A855F7',         // Purple
                    utilities: '#64748B',     // Slate
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
};

export default config;
