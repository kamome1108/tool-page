import Link from "next/link";
import { categories } from "./config/categories";
import { tools } from "./config/tools";

export default function Home() {
  // Count tools per category
  const toolCountByCategory = tools.reduce((acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🛠️</div>
              <h1 className="text-xl font-bold text-gray-900">Tool Suite</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                🌐 EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Free Online Tools
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                For Everyone
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              100% free, privacy-focused tools that run entirely in your browser. No sign-up required.
            </p>
          </div>
        </section>

        {/* Category Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category) => {
                const toolCount = toolCountByCategory[category.id] || 0;
                const colorClass = `category-${category.color}`;

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-transparent overflow-hidden"
                    style={{
                      ['--category-color' as string]: `var(--color-category-${category.color})`,
                    }}
                  >
                    {/* Hover Background Effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{ backgroundColor: `var(--color-category-${category.color})` }}
                    />

                    {/* Content */}
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{category.icon}</div>
                        <div className="px-2.5 py-1 bg-gray-100 group-hover:bg-opacity-50 rounded-full text-xs font-medium text-gray-600">
                          {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {category.name.en}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {category.description.en}
                      </p>

                      {/* Arrow Icon */}
                      <div className="mt-4 flex items-center text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                        <span>Explore</span>
                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

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
