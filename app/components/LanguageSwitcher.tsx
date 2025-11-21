'use client';





import { usePathname, Link, routing } from '@/i18n/routing';

interface LanguageSwitcherProps {
    locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    return (
        <div className="flex items-center space-x-2">
            {routing.locales.map((cur) => (
                <Link
                    key={cur}
                    href={pathname}
                    locale={cur}
                    className={`text-sm px-2 py-1 rounded-md ${locale === cur
                        ? 'font-bold text-white bg-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                        } transition-colors uppercase`}
                >
                    {cur}
                </Link>
            ))}
        </div>
    );
}
