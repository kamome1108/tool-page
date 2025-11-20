import Link from "next/link";
import { categories } from "../../config/categories";
import { tools } from "../../config/tools";

export async function generateStaticParams() {
    return categories.map((category) => ({
        id: category.id,
    }));
}

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const resolvedParams = await params;
    const category = categories.find((c) => c.id === resolvedParams.id);
    const categoryTools = tools.filter((t) => t.category === resolvedParams.id);

    // Debug view when category is not found
    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Debug: Category Not Found</h1>
                    <div className="space-y-4 font-mono text-sm">
                        <div>
                            <p className="font-bold text-gray-700">Received ID (resolvedParams.id):</p>
                            <p className="bg-gray-100 p-2 rounded border border-gray-300">{resolvedParams.id || 'undefined'}</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">Available Categories:</p>
                            <pre className="bg-gray-100 p-2 rounded border border-gray-300 overflow-auto max-h-60">
                                {JSON.stringify(categories.map(c => ({ id: c.id, name: c.name.en })), null, 2)}
                            </pre>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">Comparison Check:</p>
                            <p className="bg-gray-100 p-2 rounded border border-gray-300">
                                Is 'security' === resolvedParams.id? {String('security' === resolvedParams.id)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <div className="text-2xl">🛠️</div>
                            <h1 className="text-xl font-bold text-gray-900">Tool Suite</h1>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{category.name.en}</span>
                    </nav>
                </div>
            </div>

            {/* Category Header */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="text-5xl">{category.icon}</div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                {category.name.en}
                            </h1>
                            <p className="text-lg text-gray-600 mt-2">
                                {category.description.en}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {categoryTools.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryTools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    href={`/tools/${tool.slug}`}
                                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-4xl">{tool.icon}</div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                                        {tool.meta.title.en}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {tool.meta.description.en}
                                    </p>
                                    <div className="mt-4 flex items-center text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                                        <span>Open tool</span>
                                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔨</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No tools yet
                            </h3>
                            <p className="text-gray-600">
                                Tools in this category are coming soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} Tool Suite. All tools are free and open source.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
