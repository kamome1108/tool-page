import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import SearchInput from './SearchInput';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
    locale: string;
}

export default function Header({ locale }: HeaderProps) {
    const t = useTranslations('Common');

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <div className="text-2xl">🛠️</div>
                            <h1 className="text-xl font-bold text-gray-900">{t('title')}</h1>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SearchInput />
                        <LanguageSwitcher locale={locale} />
                    </div>
                </div>
            </div>
        </header>
    );
}
