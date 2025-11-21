import { Section } from '@/app/components/ui/Section';
import { Card } from '@/app/components/ui/Card';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface ToolLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function ToolLayout({ title, description, children }: ToolLayoutProps) {
    const t = useTranslations('Common');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{title}</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <Section padding="md" className="flex-grow">
                <div className="max-w-4xl mx-auto">
                    {/* Tool Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            {title}
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Ad Placement - Top */}
                    <div className="mb-8 bg-gray-100 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200">
                        Ad Space (Top)
                    </div>

                    {/* Tool Interface */}
                    <Card padding="lg" className="shadow-sm border border-gray-200">
                        {children}
                    </Card>

                    {/* Ad Placement - Bottom */}
                    <div className="mt-8 bg-gray-100 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200">
                        Ad Space (Bottom)
                    </div>
                </div>
            </Section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
                    <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </footer>
        </div>
    );
}
