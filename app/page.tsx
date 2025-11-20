import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto p-8 sm:p-20">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Asset Tools Suite
          </h1>
          <p className="text-xl text-gray-400">
            Secure, fast, and private tools running entirely in your browser.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/tools/password-generator"
            className="group block p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gray-700 rounded-lg text-2xl group-hover:bg-cyan-900 group-hover:text-cyan-400 transition-colors">
                🔒
              </div>
              <h2 className="ml-4 text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                Password Generator
              </h2>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300">
              Generate strong, secure passwords instantly. 100% client-side, no data leaves your device.
            </p>
          </Link>

          {/* Placeholder for next tool */}
          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed flex flex-col items-center justify-center text-center opacity-50">
            <div className="text-4xl mb-2">🔜</div>
            <h2 className="text-xl font-semibold text-gray-500">More Tools Coming Soon</h2>
            <p className="text-sm text-gray-600 mt-2">Image Resizer, JSON Formatter, and more...</p>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Asset Tools Suite. Open Source & Privacy First.</p>
      </footer>
    </div>
  );
}
