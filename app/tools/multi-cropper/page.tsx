"use client";

import { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ToolLayout from "../../components/ToolLayout";

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

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = imageRef.current;

        if (canvas && ctx && img) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            ctx.strokeStyle = "#3B82F6";
            ctx.lineWidth = 4;
            ctx.fillStyle = "rgba(59, 130, 246, 0.2)";

            crops.forEach((crop) => {
                ctx.strokeRect(crop.x, crop.y, crop.w, crop.h);
                ctx.fillRect(crop.x, crop.y, crop.w, crop.h);

                ctx.fillStyle = "#3B82F6";
                ctx.fillRect(crop.x, crop.y - 30, 40, 30);
                ctx.fillStyle = "white";
                ctx.font = "20px Arial";
                ctx.fillText(crop.id, crop.x + 10, crop.y - 8);
                ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
            });

            if (currentRect) {
                ctx.strokeStyle = "#EC4899";
                ctx.fillStyle = "rgba(236, 72, 153, 0.2)";
                ctx.strokeRect(currentRect.x, currentRect.y, currentRect.w, currentRect.h);
                ctx.fillRect(currentRect.x, currentRect.y, currentRect.w, currentRect.h);
            }
        }
    };

    useEffect(() => {
        drawCanvas();
    }, [crops, currentRect]);

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
        setCrops(newCrops);
    };

    return (
        <ToolLayout
            title="Multi-Image Cropper"
            description="Crop multiple areas from a single image and download them individually or as a ZIP file."
        >
            <div className="max-w-7xl mx-auto">
                {!imageSrc ? (
                    <div className="w-full max-w-2xl mx-auto h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-white hover:border-orange-400 transition-colors shadow-sm">
                        <label className="cursor-pointer flex flex-col items-center">
                            <span className="text-6xl mb-4">📁</span>
                            <span className="text-xl font-semibold text-gray-700">Click to Upload Image</span>
                            <span className="text-sm text-gray-500 mt-2">Supports JPG, PNG, WebP</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Canvas Area */}
                        <div className="lg:col-span-2 bg-white p-4 rounded-2xl border border-gray-200 overflow-auto shadow-sm">
                            <div className="relative" ref={containerRef}>
                                <canvas
                                    ref={canvasRef}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    className="cursor-crosshair max-w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-sm text-gray-600">✂️ Click and drag to create crop areas</p>
                                <button
                                    onClick={() => setImageSrc(null)}
                                    className="text-sm text-red-600 hover:text-red-700 font-medium min-h-8 px-3"
                                >
                                    Reset Image
                                </button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 h-fit shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Crops ({crops.length})</h2>
                                {crops.length > 0 && (
                                    <button
                                        onClick={downloadAll}
                                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm text-sm min-h-11"
                                    >
                                        📦 Download ZIP
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                {crops.map((crop, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-xl flex justify-between items-center border border-gray-200">
                                        <span className="font-mono text-blue-600 font-bold">#{crop.id}</span>
                                        <div className="text-xs text-gray-600">
                                            {Math.round(crop.w)} × {Math.round(crop.h)}
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => downloadSingle(crop)}
                                                className="text-green-600 hover:text-green-700 text-sm font-medium min-h-8 px-2"
                                                title="Download"
                                            >
                                                ⬇️
                                            </button>
                                            <button
                                                onClick={() => deleteCrop(index)}
                                                className="text-red-600 hover:text-red-700 text-sm font-medium min-h-8 px-2"
                                                title="Delete"
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

                <div className="mt-8 text-gray-600 text-sm text-center bg-orange-50 p-4 rounded-xl">
                    <p>✂️ All processing happens in your browser. Your images never leave your device.</p>
                </div>
            </div>
        </ToolLayout>
    );
}
