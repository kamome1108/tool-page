import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Section } from '@/app/components/ui/Section';
import RelatedTools from '@/app/components/tools/RelatedTools';

interface EnhancedToolLayoutProps {
    title: string;
    tagline: string;
    toolId: string;
    locale: string;
    children: React.ReactNode;
    // Optional content sections - if provided, they will be rendered
    description?: {
        title: string;
        text: string;
    };
    howTo?: {
        title: string;
        steps: string[];
    };
    features?: {
        title: string;
        list: string[];
    };
    faq?: {
        title: string;
        questions: { q: string; a: string }[];
    };
}

export default function EnhancedToolLayout({
    title,
    tagline,
    toolId,
    locale,
    children,
    description,
    howTo,
    features,
    faq
}: EnhancedToolLayoutProps) {
    const tCommon = useTranslations('Common');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden w-full">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm overflow-hidden whitespace-nowrap">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 flex-shrink-0">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium truncate">{title}</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow w-full">
                {/* Hero Section (Above the Fold) */}
                <Section className="pt-8 pb-12 w-full">
                    <div className="text-center mb-8 px-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 break-words">
                            {title}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto break-words">
                            {tagline}
                        </p>
                    </div>

                    {/* Tool Interface Container */}
                    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 overflow-hidden">
                        {children}
                    </div>
                </Section>

                {/* Content Sections (Below the Fold) */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16 w-full">

                    {/* Description */}
                    {description && (
                        <section className="w-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {description.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg break-words">
                                {description.text}
                            </p>
                        </section>
                    )}

                    {/* How to Use */}
                    {howTo && (
                        <section className="w-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {howTo.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {howTo.steps.map((step, i) => (
                                    <div key={i} className="flex items-start space-x-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                                            {i + 1}
                                        </div>
                                        <p className="text-gray-700 pt-1 break-words">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Features */}
                    {features && (
                        <section className="w-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {features.title}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {features.list.map((feature, i) => (
                                    <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                        <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                                        <span className="text-gray-700 font-medium break-words">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* FAQ */}
                    {faq && (
                        <section className="w-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {faq.title}
                            </h2>
                            <div className="space-y-4">
                                {faq.questions.map((q, i) => (
                                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">
                                            {q.q}
                                        </h3>
                                        <p className="text-gray-600 break-words">
                                            {q.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Related Tools */}
                    <RelatedTools toolId={toolId} locale={locale} />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12 mt-auto w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
                    <p>{tCommon('footer.copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </footer>
        </div>
    );
}
