"use client";

import { useState, useEffect } from "react";
import ToolLayout from "../../components/ToolLayout";

export default function AspectRatioCalculator() {
    const [width, setWidth] = useState<number | "">(1920);
    const [height, setHeight] = useState<number | "">(1080);
    const [ratioW, setRatioW] = useState<number | "">(16);
    const [ratioH, setRatioH] = useState<number | "">(9);
    const [activeField, setActiveField] = useState<"width" | "height">("width");

    const commonRatios = [
        { w: 16, h: 9, label: "16:9 (HD/4K)" },
        { w: 4, h: 3, label: "4:3 (SD/iPad)" },
        { w: 1, h: 1, label: "1:1 (Square)" },
        { w: 21, h: 9, label: "21:9 (Ultrawide)" },
        { w: 9, h: 16, label: "9:16 (Mobile)" },
    ];

    useEffect(() => {
        if (width === "" || height === "" || ratioW === "" || ratioH === "") return;

        const rW = Number(ratioW);
        const rH = Number(ratioH);

        if (activeField === "width") {
            const newHeight = Math.round((Number(width) * rH) / rW);
            if (newHeight !== height) setHeight(newHeight);
        } else {
            const newWidth = Math.round((Number(height) * rW) / rH);
            if (newWidth !== width) setWidth(newWidth);
        }
    }, [width, height, ratioW, ratioH, activeField]);

    const handleRatioClick = (w: number, h: number) => {
        setRatioW(w);
        setRatioH(h);
        if (activeField === "width" && width !== "") {
            setHeight(Math.round((Number(width) * h) / w));
        } else if (height !== "") {
            setWidth(Math.round((Number(height) * w) / h));
        }
    };

    return (
        <ToolLayout
            title="Aspect Ratio Calculator"
            description="Calculate dimensions for 16:9, 4:3, and custom ratios."
        >
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                    {/* Common Ratios */}
                    <div className="mb-8">
                        <label className="block text-gray-700 font-medium text-sm mb-3">Common Presets</label>
                        <div className="flex flex-wrap gap-3">
                            {commonRatios.map((r) => (
                                <button
                                    key={r.label}
                                    onClick={() => handleRatioClick(r.w, r.h)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-11 ${ratioW === r.w && ratioH === r.h
                                            ? "bg-pink-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Calculator Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Dimensions */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-gray-200 pb-2">Dimensions (px)</h3>
                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Width</label>
                                <input
                                    type="number"
                                    value={width}
                                    onFocus={() => setActiveField("width")}
                                    onChange={(e) => {
                                        setWidth(e.target.value === "" ? "" : Number(e.target.value));
                                        setActiveField("width");
                                    }}
                                    className={`w-full bg-gray-50 text-gray-900 p-3 rounded-xl border-2 focus:outline-none transition-colors ${activeField === "width" ? "border-pink-500 ring-2 ring-pink-200" : "border-gray-200"
                                        }`}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Height</label>
                                <input
                                    type="number"
                                    value={height}
                                    onFocus={() => setActiveField("height")}
                                    onChange={(e) => {
                                        setHeight(e.target.value === "" ? "" : Number(e.target.value));
                                        setActiveField("height");
                                    }}
                                    className={`w-full bg-gray-50 text-gray-900 p-3 rounded-xl border-2 focus:outline-none transition-colors ${activeField === "height" ? "border-pink-500 ring-2 ring-pink-200" : "border-gray-200"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Ratio */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-gray-200 pb-2">Ratio</h3>
                            <div className="flex items-center space-x-3">
                                <div className="flex-1">
                                    <label className="block text-gray-600 text-sm mb-2">W</label>
                                    <input
                                        type="number"
                                        value={ratioW}
                                        onChange={(e) => setRatioW(e.target.value === "" ? "" : Number(e.target.value))}
                                        className="w-full bg-gray-50 text-gray-900 p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-pink-500"
                                    />
                                </div>
                                <span className="text-3xl text-gray-400 mt-6">:</span>
                                <div className="flex-1">
                                    <label className="block text-gray-600 text-sm mb-2">H</label>
                                    <input
                                        type="number"
                                        value={ratioH}
                                        onChange={(e) => setRatioH(e.target.value === "" ? "" : Number(e.target.value))}
                                        className="w-full bg-gray-50 text-gray-900 p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-pink-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visualizer */}
                    <div className="mt-8 p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl flex items-center justify-center h-48 border-2 border-dashed border-pink-200">
                        <div
                            className="bg-pink-500/20 border-2 border-pink-500 rounded-lg transition-all duration-300"
                            style={{
                                width: `${Math.min(100, (Number(ratioW) / Math.max(Number(ratioW), Number(ratioH))) * 100)}%`,
                                aspectRatio: `${ratioW} / ${ratioH}`,
                                maxHeight: "100%",
                            }}
                        ></div>
                    </div>
                </div>

                <div className="mt-8 text-gray-600 text-sm text-center bg-pink-50 p-4 rounded-xl">
                    <p>📐 Visual preview updates in real-time. All calculations happen in your browser.</p>
                </div>
            </div>
        </ToolLayout>
    );
}
