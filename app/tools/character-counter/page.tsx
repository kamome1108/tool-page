"use client";

import { useState, useEffect } from "react";

export default function CharacterCounter() {
    const [text, setText] = useState("");
    const [stats, setStats] = useState({
        chars: 0,
        charsNoSpace: 0,
        lines: 0,
        paragraphs: 0,
    });

    useEffect(() => {
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, "").length;
        const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
        // Simple paragraph detection: split by double newlines or more
        const paragraphs = text
            ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
            : 0;

        setStats({ chars, charsNoSpace, lines, paragraphs });
    }, [text]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                Character & Line Counter
            </h1>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Input Area */}
                <div className="md:col-span-2">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste your text here..."
                        className="w-full h-96 bg-gray-800 text-gray-200 p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-green-500 transition-colors resize-none font-mono"
                    />
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => setText("")}
                            className="text-gray-500 hover:text-red-400 transition-colors text-sm"
                        >
                            Clear Text
                        </button>
                    </div>
                </div>

                {/* Stats Panel */}
                <div className="space-y-4">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                        <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Statistics</h2>

                        <div className="space-y-6">
                            <div>
                                <div className="text-4xl font-bold text-green-400">{stats.chars}</div>
                                <div className="text-gray-500 text-sm">Characters</div>
                            </div>

                            <div>
                                <div className="text-2xl font-bold text-emerald-400">{stats.charsNoSpace}</div>
                                <div className="text-gray-500 text-sm">Without Spaces</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                                <div>
                                    <div className="text-xl font-bold text-white">{stats.lines}</div>
                                    <div className="text-gray-500 text-xs">Lines</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">{stats.paragraphs}</div>
                                    <div className="text-gray-500 text-xs">Paragraphs</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 text-xs text-gray-500">
                        <p>Counts update instantly as you type. All processing happens in your browser.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
