"use client";

import { useState } from "react";

export default function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [indent, setIndent] = useState(2);

    const formatJson = () => {
        if (!input.trim()) {
            setOutput("");
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, indent));
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Invalid JSON");
            }
            setOutput("");
        }
    };

    const minifyJson = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Invalid JSON");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                JSON Formatter & Validator
            </h1>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
                {/* Input */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-gray-400 text-sm">Input JSON</label>
                        <div className="space-x-2">
                            <button
                                onClick={() => setInput("")}
                                className="text-xs text-gray-500 hover:text-red-400"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Paste JSON here... {"key": "value"}'
                        className="flex-1 bg-gray-800 text-gray-200 p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-yellow-500 transition-colors resize-none font-mono text-sm"
                    />
                </div>

                {/* Controls & Output */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-gray-400 text-sm">Output</label>
                        <div className="flex space-x-2">
                            <select
                                value={indent}
                                onChange={(e) => setIndent(Number(e.target.value))}
                                className="bg-gray-800 text-xs text-white border border-gray-700 rounded px-2 py-1"
                            >
                                <option value={2}>2 Spaces</option>
                                <option value={4}>4 Spaces</option>
                                <option value={8}>8 Spaces</option>
                            </select>
                            <button
                                onClick={formatJson}
                                className="bg-yellow-600 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded transition-colors"
                            >
                                Format
                            </button>
                            <button
                                onClick={minifyJson}
                                className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition-colors"
                            >
                                Minify
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(output)}
                                disabled={!output}
                                className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition-colors disabled:opacity-50"
                            >
                                Copy
                            </button>
                        </div>
                    </div>

                    <div className={`flex-1 bg-gray-800 p-4 rounded-xl border ${error ? 'border-red-500' : 'border-gray-700'} overflow-auto relative`}>
                        {error ? (
                            <div className="text-red-400 font-mono text-sm">
                                <p className="font-bold mb-2">Error parsing JSON:</p>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap break-all">
                                {output}
                            </pre>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
