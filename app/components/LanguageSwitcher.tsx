'use client';

import { usePathname, useRouter, Link } from '@/i18n/routing';

interface LanguageSwitcherProps {
    locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    return (
        <div className="flex items-center space-x-4">
            <Link
                href={pathname}
                locale="en"
                className={`text-sm ${locale === 'en' ? 'font-bold text-blue-600' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
                EN
            </Link>
            <span className="text-gray-300">|</span>
            <Link
                href={pathname}
                locale="ja"
                className={`text-sm ${locale === 'ja' ? 'font-bold text-blue-600' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
                JA
            </Link>
        </div>
    );
}
