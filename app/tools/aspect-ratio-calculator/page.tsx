"use client";

import { useState, useEffect } from "react";

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
        // Trigger recalculation based on current active field
        if (activeField === "width" && width !== "") {
            setHeight(Math.round((Number(width) * h) / w));
        } else if (height !== "") {
            setWidth(Math.round((Number(height) * w) / h));
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                Aspect Ratio Calculator
            </h1>

            <div className="w-full max-w-2xl bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
                {/* Common Ratios */}
                <div className="mb-8">
                    <label className="block text-gray-400 text-sm mb-3">Common Presets</label>
                    <div className="flex flex-wrap gap-3">
                        {commonRatios.map((r) => (
                            <button
                                key={r.label}
                                onClick={() => handleRatioClick(r.w, r.h)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${ratioW === r.w && ratioH === r.h
                                        ? "bg-pink-600 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Calculator Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Dimensions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Dimensions (px)</h3>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Width</label>
                            <input
                                type="number"
                                value={width}
                                onFocus={() => setActiveField("width")}
                                onChange={(e) => {
                                    setWidth(e.target.value === "" ? "" : Number(e.target.value));
                                    setActiveField("width");
                                }}
                                className={`w-full bg-gray-900 text-white p-3 rounded-lg border focus:outline-none transition-colors ${activeField === "width" ? "border-pink-500 ring-1 ring-pink-500" : "border-gray-600"
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Height</label>
                            <input
                                type="number"
                                value={height}
                                onFocus={() => setActiveField("height")}
                                onChange={(e) => {
                                    setHeight(e.target.value === "" ? "" : Number(e.target.value));
                                    setActiveField("height");
                                }}
                                className={`w-full bg-gray-900 text-white p-3 rounded-lg border focus:outline-none transition-colors ${activeField === "height" ? "border-pink-500 ring-1 ring-pink-500" : "border-gray-600"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Ratio */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Ratio</h3>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1">
                                <label className="block text-gray-400 text-xs mb-1">W</label>
                                <input
                                    type="number"
                                    value={ratioW}
                                    onChange={(e) => setRatioW(e.target.value === "" ? "" : Number(e.target.value))}
                                    className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-pink-500"
                                />
                            </div>
                            <span className="text-2xl text-gray-500 mt-4">:</span>
                            <div className="flex-1">
                                <label className="block text-gray-400 text-xs mb-1">H</label>
                                <input
                                    type="number"
                                    value={ratioH}
                                    onChange={(e) => setRatioH(e.target.value === "" ? "" : Number(e.target.value))}
                                    className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-pink-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="mt-8 p-4 bg-gray-900/50 rounded-xl flex items-center justify-center h-48 border border-gray-700 border-dashed">
                    <div
                        className="bg-pink-500/20 border-2 border-pink-500 transition-all duration-300"
                        style={{
                            width: `${Math.min(100, (Number(ratioW) / Math.max(Number(ratioW), Number(ratioH))) * 100)}%`,
                            aspectRatio: `${ratioW} / ${ratioH}`,
                            maxHeight: "100%",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
