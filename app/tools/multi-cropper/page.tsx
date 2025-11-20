"use client";

import { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface Crop {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export default function MultiCropper() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentRect, setCurrentRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    // Handle Image Upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target?.result as string);
                setCrops([]);
            };
            reader.readAsDataURL(file);
        }
    };

    // Initialize Image
    useEffect(() => {
        if (imageSrc) {
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                imageRef.current = img;
                drawCanvas();
            };
        }
    }, [imageSrc]);

    // Draw Canvas (Image + Overlays)
    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = imageRef.current;

        if (canvas && ctx && img) {
            // Resize canvas to match image (or fit container)
            // For simplicity, we'll match image dimensions but scale visually via CSS
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw Image
            ctx.drawImage(img, 0, 0);

            // Draw Crops
            ctx.strokeStyle = "#06b6d4"; // Cyan
            ctx.lineWidth = 4;
            ctx.fillStyle = "rgba(6, 182, 212, 0.2)";

            crops.forEach((crop) => {
                ctx.strokeRect(crop.x, crop.y, crop.w, crop.h);
                ctx.fillRect(crop.x, crop.y, crop.w, crop.h);

                // Draw ID
                ctx.fillStyle = "#06b6d4";
                ctx.fillRect(crop.x, crop.y - 30, 40, 30);
                ctx.fillStyle = "white";
                ctx.font = "20px Arial";
                ctx.fillText(crop.id, crop.x + 10, crop.y - 8);
                ctx.fillStyle = "rgba(6, 182, 212, 0.2)"; // Reset fill
            });

            // Draw Current Rect
            if (currentRect) {
                ctx.strokeStyle = "#f472b6"; // Pink
                ctx.fillStyle = "rgba(244, 114, 182, 0.2)";
                ctx.strokeRect(currentRect.x, currentRect.y, currentRect.w, currentRect.h);
                ctx.fillRect(currentRect.x, currentRect.y, currentRect.w, currentRect.h);
            }
        }
    };

    useEffect(() => {
        drawCanvas();
    }, [crops, currentRect]);

    // Mouse Events
    const getMousePos = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!imageSrc) return;
        setIsDrawing(true);
        const pos = getMousePos(e);
        setStartPos(pos);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const pos = getMousePos(e);
        setCurrentRect({
            x: Math.min(startPos.x, pos.x),
            y: Math.min(startPos.y, pos.y),
            w: Math.abs(pos.x - startPos.x),
            h: Math.abs(pos.y - startPos.y)
        });
    };

    const handleMouseUp = () => {
        if (!isDrawing || !currentRect) {
            setIsDrawing(false);
            return;
        }

        if (currentRect.w > 10 && currentRect.h > 10) {
            setCrops([...crops, { ...currentRect, id: (crops.length + 1).toString() }]);
        }

        setIsDrawing(false);
        setCurrentRect(null);
    };

    // Download Logic
    const getCroppedBlob = (crop: Crop): Promise<Blob> => {
        return new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            canvas.width = crop.w;
            canvas.height = crop.h;
            const ctx = canvas.getContext("2d");
            if (imageRef.current && ctx) {
                ctx.drawImage(
                    imageRef.current,
                    crop.x, crop.y, crop.w, crop.h,
                    0, 0, crop.w, crop.h
                );
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                }, "image/png");
            }
        });
    };

    const downloadSingle = async (crop: Crop) => {
        const blob = await getCroppedBlob(crop);
        saveAs(blob, `crop-${crop.id}.png`);
    };

    const downloadAll = async () => {
        const zip = new JSZip();
        const promises = crops.map(async (crop) => {
            const blob = await getCroppedBlob(crop);
            zip.file(`crop-${crop.id}.png`, blob);
        });

        await Promise.all(promises);
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "crops.zip");
    };

    const deleteCrop = (index: number) => {
        const newCrops = [...crops];
        newCrops.splice(index, 1);
        // Re-index IDs if needed, or just keep them unique. Let's keep simple.
        setCrops(newCrops);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                Multi-Image Cropper
            </h1>

            {!imageSrc ? (
                <div className="w-full max-w-2xl h-64 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center bg-gray-800 hover:border-cyan-500 transition-colors">
                    <label className="cursor-pointer flex flex-col items-center">
                        <span className="text-4xl mb-4">📁</span>
                        <span className="text-xl font-semibold text-gray-400">Click to Upload Image</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                </div>
            ) : (
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Canvas Area */}
                    <div className="lg:col-span-2 bg-gray-800 p-4 rounded-xl border border-gray-700 overflow-auto">
                        <div className="relative" ref={containerRef}>
                            <canvas
                                ref={canvasRef}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                className="cursor-crosshair max-w-full h-auto"
                            />
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm text-gray-400">Click and drag to create crop areas.</p>
                            <button
                                onClick={() => setImageSrc(null)}
                                className="text-sm text-red-400 hover:text-red-300"
                            >
                                Reset Image
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Crops ({crops.length})</h2>
                            {crops.length > 0 && (
                                <button
                                    onClick={downloadAll}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg text-sm"
                                >
                                    Download All (ZIP)
                                </button>
                            )}
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                            {crops.map((crop, index) => (
                                <div key={index} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center group">
                                    <span className="font-mono text-cyan-400 font-bold">#{crop.id}</span>
                                    <div className="text-xs text-gray-400">
                                        {Math.round(crop.w)} x {Math.round(crop.h)}
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => downloadSingle(crop)}
                                            className="text-green-400 hover:text-green-300 text-sm"
                                        >
                                            ⬇
                                        </button>
                                        <button
                                            onClick={() => deleteCrop(index)}
                                            className="text-red-400 hover:text-red-300 text-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {crops.length === 0 && (
                                <p className="text-gray-500 text-center py-8">No crops selected yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
