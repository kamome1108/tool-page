"use client";

import { useState, useEffect } from "react";
import ToolLayout from "../../components/ToolLayout";

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
        const paragraphs = text
            ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
            : 0;

        setStats({ chars, charsNoSpace, lines, paragraphs });
    }, [text]);

    return (
        <ToolLayout
            title="Character & Line Counter"
            description="Count characters, lines, and paragraphs in real-time."
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Input Area */}
                    <div className="lg:col-span-2">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type or paste your text here..."
                            className="w-full h-96 bg-white text-gray-900 p-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors resize-none font-mono shadow-sm"
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setText("")}
                                className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium min-h-11 px-4"
                            >
                                Clear Text
                            </button>
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-gray-500 text-sm uppercase tracking-wider mb-6 font-semibold">Statistics</h2>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-4xl font-bold text-green-600">{stats.chars}</div>
                                    <div className="text-gray-600 text-sm mt-1">Characters</div>
                                </div>

                                <div>
                                    <div className="text-2xl font-bold text-emerald-600">{stats.charsNoSpace}</div>
                                    <div className="text-gray-600 text-sm mt-1">Without Spaces</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                    <div>
                                        <div className="text-xl font-bold text-gray-900">{stats.lines}</div>
                                        <div className="text-gray-600 text-xs mt-1">Lines</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-gray-900">{stats.paragraphs}</div>
                                        <div className="text-gray-600 text-xs mt-1">Paragraphs</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-xs text-gray-600">
                            <p>✨ Counts update instantly as you type. All processing happens in your browser.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
