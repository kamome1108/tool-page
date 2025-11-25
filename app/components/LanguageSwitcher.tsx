'use client';





import { usePathname, Link, routing } from '@/i18n/routing';

interface LanguageSwitcherProps {
    locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    return (
        <div className="flex items-center overflow-x-auto max-w-[150px] sm:max-w-none pb-1 sm:pb-0 scrollbar-hide">
            <div className="flex space-x-1 px-1">
                {routing.locales.map((cur) => (
                    <Link
                        key={cur}
                        href={pathname}
                        locale={cur}
                        className={`text-xs sm:text-sm px-2 py-1 rounded-md whitespace-nowrap ${locale === cur
                            ? 'font-bold text-white bg-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                            } transition-colors uppercase`}
                    >
                        {cur}
                    </Link>
                ))}
            </div>
        </div>
    );
}
