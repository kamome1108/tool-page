import Link from "next/link";

export default function Home() {
  const tools = [
    {
      href: "/tools/password-generator",
      icon: "🔒",
      title: "Password Generator",
      desc: "Generate strong, secure passwords instantly. 100% client-side.",
      color: "group-hover:text-cyan-400",
      bg: "group-hover:bg-cyan-900",
      border: "hover:border-cyan-500",
      shadow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
    },
    {
      href: "/tools/character-counter",
      icon: "📝",
      title: "Character Counter",
      desc: "Count characters, lines, and paragraphs in real-time.",
      color: "group-hover:text-green-400",
      bg: "group-hover:bg-green-900",
      border: "hover:border-green-500",
      shadow: "hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
    },
    {
      href: "/tools/aspect-ratio-calculator",
      icon: "📐",
      title: "Aspect Ratio Calculator",
      desc: "Calculate dimensions for 16:9, 4:3, and custom ratios.",
      color: "group-hover:text-pink-400",
      bg: "group-hover:bg-pink-900",
      border: "hover:border-pink-500",
      shadow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.3)]"
    },
    {
      href: "/tools/json-formatter",
      icon: "DATA",
      title: "JSON Formatter",
      desc: "Format, validate, and minify JSON data with syntax highlighting.",
      color: "group-hover:text-yellow-400",
      bg: "group-hover:bg-yellow-900",
      border: "hover:border-yellow-500",
      shadow: "hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
    },
    {
      href: "/tools/multi-cropper",
      icon: "✂️",
      title: "Multi-Image Cropper",
      desc: "Crop multiple areas from a single image and download as ZIP.",
      color: "group-hover:text-purple-400",
      bg: "group-hover:bg-purple-900",
      border: "hover:border-purple-500",
      shadow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.3)]"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto p-8 sm:p-20">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Asset Tools Suite
          </h1>
          <p className="text-xl text-gray-400">
            Secure, fast, and private tools running entirely in your browser.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group block p-6 bg-gray-800 rounded-xl border border-gray-700 transition-all ${tool.border} ${tool.shadow}`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 bg-gray-700 rounded-lg text-xl font-bold transition-colors ${tool.bg} ${tool.color}`}>
                  {tool.icon}
                </div>
                <h2 className={`ml-4 text-xl font-semibold text-white transition-colors ${tool.color}`}>
                  {tool.title}
                </h2>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 text-sm">
                {tool.desc}
              </p>
            </Link>
          ))}

          {/* Placeholder */}
          <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 border-dashed flex flex-col items-center justify-center text-center opacity-50 hover:opacity-75 transition-opacity">
            <div className="text-3xl mb-2">🚀</div>
            <h2 className="text-lg font-semibold text-gray-500">More Coming Soon</h2>
          </div>
        </div>
      </main>

      <footer className="text-center py-12 text-gray-600 text-sm border-t border-gray-800 mt-12">
        <p>© {new Date().getFullYear()} Asset Tools Suite. Open Source & Privacy First.</p>
      </footer>
    </div>
  );
}
