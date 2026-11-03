import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
  Grid,
  Check,
  X,
  Move,
  Sparkles,
} from 'lucide-react';

interface PhotoCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  aspectRatio: number; // e.g. 16/10 = 1.6, 3/4 = 0.75
  frameLabel: string;
  onApply: (croppedDataUrl: string) => void;
  onClose: () => void;
}

export const PhotoCropModal: React.FC<PhotoCropModalProps> = ({
  isOpen,
  imageSrc,
  aspectRatio,
  frameLabel,
  onApply,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // High-resolution canvas dimensions
  // 1200px wide for landscape (16:10 = 1200x750), 900px wide for portrait (3:4 = 900x1200)
  const canvasWidth = aspectRatio >= 1 ? 1200 : 900;
  const canvasHeight = Math.round(canvasWidth / aspectRatio);

  // Load image object whenever imageSrc changes
  useEffect(() => {
    if (!imageSrc) {
      setImageObj(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageObj(img);
      // Reset transformations
      setZoom(1);
      setRotation(0);
      setPan({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Redraw the canvas on state change
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Compute base scale to cover the canvas viewport
    const isRotatedQuarter = rotation === 90 || rotation === 270;
    const effectiveImgW = isRotatedQuarter ? imageObj.naturalHeight : imageObj.naturalWidth;
    const effectiveImgH = isRotatedQuarter ? imageObj.naturalWidth : imageObj.naturalHeight;

    const scaleX = canvas.width / effectiveImgW;
    const scaleY = canvas.height / effectiveImgH;
    const coverScale = Math.max(scaleX, scaleY);

    const totalScale = coverScale * zoom;

    ctx.save();
    // Move to canvas center + pan
    ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);
    // Rotate
    ctx.rotate((rotation * Math.PI) / 180);

    // Image drawn around its center
    const drawW = imageObj.naturalWidth * totalScale;
    const drawH = imageObj.naturalHeight * totalScale;
    ctx.drawImage(imageObj, -drawW / 2, -drawH / 2, drawW, drawH);

    ctx.restore();
  }, [imageObj, zoom, rotation, pan]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Pointer event handlers for drag / pan
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    // Capture pointer
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !canvasRef.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleFactorX = canvas.width / rect.width;
    const scaleFactorY = canvas.height / rect.height;

    const deltaX = (e.clientX - dragStart.x) * scaleFactorX;
    const deltaY = (e.clientY - dragStart.y) * scaleFactorY;

    setPan((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(3.5, Math.max(1, prev + zoomDelta)));
  };

  // Reset to initial centered framing
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
  };

  // Rotate 90 degrees clockwise
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    setPan({ x: 0, y: 0 });
  };

  const [filterMode, setFilterMode] = useState<'bw' | 'color' | 'sepia'>('bw');

  // Final export and crop application
  const handleApply = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsProcessing(true);
    try {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (filterMode === 'bw') {
          // Convert canvas pixels to high-definition Black & White (B&W)
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            // Standard high-contrast luminance formula
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
          }
          ctx.putImageData(imgData, 0, 0);
        } else if (filterMode === 'sepia') {
          // Warm royal sepia tone
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
            data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
            data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
          }
          ctx.putImageData(imgData, 0, 0);
        }
        // if 'color', preserve natural pixels
      }

      // Export as crisp JPEG with high quality
      let quality = 0.88;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);

      // Safe Firestore size validation (<800KB)
      if (dataUrl.length > 800000) {
        quality = 0.72;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }
      if (dataUrl.length > 800000) {
        quality = 0.58;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      onApply(dataUrl);
      onClose();
    } catch (err) {
      console.error('Failed to crop frame:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const ratioDescription =
    aspectRatio >= 1.5 ? '16:10 Horizontal Frame' : '3:4 Vertical Frame';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9B1235]" />
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900 tracking-wide">
                  Set Frame &amp; Crop
                </h3>
                <p className="font-sans text-[10px] text-gray-500">
                  {frameLabel} • {ratioDescription}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Canvas Crop Viewport */}
          <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 bg-[#1F0712] overflow-hidden">
            {/* Instruction tooltip */}
            <div className="mb-2 flex items-center gap-1.5 text-[11px] text-[#FFE8B5]/90 font-sans tracking-wide">
              <Move className="w-3.5 h-3.5 text-[#C9962B]" />
              <span>Drag to position photo within frame • Scroll to zoom</span>
            </div>

            {/* Frame Viewport Container */}
            <div
              ref={containerRef}
              className="relative w-full max-w-[420px] mx-auto border-2 border-[#C9962B] shadow-[0_0_20px_rgba(201,150,43,0.35)] overflow-hidden cursor-grab active:cursor-grabbing select-none"
              style={{ aspectRatio: `${aspectRatio}` }}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className={`w-full h-full block object-cover transition-all ${
                  filterMode === 'bw'
                    ? 'filter grayscale contrast-[1.14]'
                    : filterMode === 'sepia'
                    ? 'filter sepia-[0.45] contrast-[1.08] brightness-[1.02]'
                    : 'filter contrast-[1.02]'
                }`}
              />

              {/* Composition Grid (Rule of Thirds) */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-[#C9962B]/35" />
                  <div className="border-r border-b border-[#C9962B]/35" />
                  <div className="border-b border-[#C9962B]/35" />
                  <div className="border-r border-b border-[#C9962B]/35" />
                  <div className="border-r border-b border-[#C9962B]/35" />
                  <div className="border-b border-[#C9962B]/35" />
                  <div className="border-r border-[#C9962B]/35" />
                  <div className="border-r border-[#C9962B]/35" />
                  <div />
                </div>
              )}
            </div>
          </div>

          {/* Controls Toolbar */}
          <div className="p-4 bg-white border-t border-gray-100 space-y-3">
            {/* Filter Mode Selector */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
              <span className="font-serif text-xs text-gray-700 font-semibold">
                Photo Filter:
              </span>
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFilterMode('bw')}
                  className={`px-2.5 py-1 rounded text-xs font-serif transition-colors cursor-pointer ${
                    filterMode === 'bw'
                      ? 'bg-[#9B1235] text-white font-medium shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Classic B&amp;W
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('color')}
                  className={`px-2.5 py-1 rounded text-xs font-serif transition-colors cursor-pointer ${
                    filterMode === 'color'
                      ? 'bg-[#9B1235] text-white font-medium shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Natural Color
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('sepia')}
                  className={`px-2.5 py-1 rounded text-xs font-serif transition-colors cursor-pointer ${
                    filterMode === 'sepia'
                      ? 'bg-[#9B1235] text-white font-medium shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Warm Sepia
                </button>
              </div>
            </div>

            {/* Zoom Slider & Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(2)))}
                  className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-gray-700" />
                </button>

                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-[#9B1235] cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)))}
                  className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                </button>

                <span className="font-serif text-xs text-gray-800 font-semibold min-w-[36px] text-right">
                  {zoom.toFixed(1)}x
                </span>
              </div>

              {/* Tool Buttons: Rotate, Grid, Reset */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRotate}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-sans text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                  title="Rotate 90° Clockwise"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#9B1235]" />
                  <span className="hidden sm:inline">Rotate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowGrid((g) => !g)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-sans rounded-lg border transition-colors cursor-pointer ${
                    showGrid
                      ? 'bg-[#9B1235] text-white border-[#9B1235]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                  title="Toggle Guidelines Grid"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-sans text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                  title="Reset Framing"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#9B1235]" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-serif text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApply}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-serif uppercase tracking-wider bg-[#9B1235] hover:bg-[#800D2A] text-white rounded-lg shadow-sm transition-all cursor-pointer font-semibold disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-white" />
                <span>{isProcessing ? 'Setting Frame...' : 'Apply & Set Frame'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
