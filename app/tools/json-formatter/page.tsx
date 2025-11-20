"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";

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
        <ToolLayout
            title="JSON Formatter & Validator"
            description="Format, validate, and minify JSON data with syntax highlighting."
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)] min-h-[600px]">
                    {/* Input */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-gray-700 font-medium text-sm">Input JSON</label>
                            <button
                                onClick={() => setInput("")}
                                className="text-xs text-gray-500 hover:text-red-600 font-medium min-h-8 px-3"
                            >
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Paste JSON here... {"key": "value"}'
                            className="flex-1 bg-white text-gray-900 p-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition-colors resize-none font-mono text-sm shadow-sm"
                        />
                    </div>

                    {/* Controls & Output */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-gray-700 font-medium text-sm">Output</label>
                            <div className="flex space-x-2">
                                <select
                                    value={indent}
                                    onChange={(e) => setIndent(Number(e.target.value))}
                                    className="bg-white text-sm text-gray-700 border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500"
                                >
                                    <option value={2}>2 Spaces</option>
                                    <option value={4}>4 Spaces</option>
                                    <option value={8}>8 Spaces</option>
                                </select>
                                <button
                                    onClick={formatJson}
                                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1.5 rounded-lg transition-colors font-medium min-h-8"
                                >
                                    Format
                                </button>
                                <button
                                    onClick={minifyJson}
                                    className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-1.5 rounded-lg transition-colors font-medium min-h-8"
                                >
                                    Minify
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(output)}
                                    disabled={!output}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed min-h-8"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <div className={`flex-1 bg-white p-4 rounded-2xl border-2 ${error ? 'border-red-500' : 'border-gray-200'} overflow-auto shadow-sm`}>
                            {error ? (
                                <div className="text-red-600 font-mono text-sm">
                                    <p className="font-bold mb-2">❌ Error parsing JSON:</p>
                                    <p>{error}</p>
                                </div>
                            ) : (
                                <pre className="text-purple-600 font-mono text-sm whitespace-pre-wrap break-all">
                                    {output}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-gray-600 text-sm text-center bg-purple-50 p-4 rounded-xl">
                    <p>💻 All processing happens in your browser. Your JSON data never leaves your device.</p>
                </div>
            </div>
        </ToolLayout>
    );
}
