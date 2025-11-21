'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function SearchInput() {
    const t = useTranslations('Common.search');
    const router = useRouter();
    const pathname = usePathname();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Extract locale from pathname (e.g., /en/...)
    const locale = pathname.split('/')[1];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
        }
    };

    // Close search on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {/* Mobile Search Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-700"
                aria-label="Search"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>

            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                className={`
                    absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg p-4 border border-gray-100
                    md:static md:w-64 md:p-0 md:shadow-none md:border-0 md:bg-transparent md:block
                    ${isOpen ? 'block' : 'hidden'}
                `}
            >
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('placeholder')}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </form>
        </div>
    );
}
