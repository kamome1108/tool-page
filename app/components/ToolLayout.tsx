import Link from "next/link";
import { ReactNode } from "react";

interface ToolLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

export default function ToolLayout({ children, title, description }: ToolLayoutProps) {
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
                            <Link
                                href="/"
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Ad Placement - Top Banner (728x90 or responsive) */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 h-24 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Ad Space (728x90)</span>
                    </div>
                </div>
            </div>

            {/* Tool Content */}
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {description && (
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                            <p className="text-gray-600">{description}</p>
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Ad Placement - Bottom Banner (728x90 or responsive) */}
            <div className="bg-gray-100 border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 h-24 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Ad Space (728x90)</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} Tool Suite. All tools are free and open source.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
