import { DrawingTools } from "./DrawingTools";
import { useDrawingCanvas } from "../hooks/useDrawingCanvas";

export function Canvas() {
  const {
    canvasRef,
    color,
    size,
    tool,
    setColor,
    setSize,
    setTool,
    startDrawing,
    draw,
    stopDrawing,
    undo,
    redo,
    downloadCanvas,
    isLoading,
  } = useDrawingCanvas();

  return (
    <div className="flex flex-col items-center gap-4">
      <DrawingTools
        color={color}
        size={size}
        tool={tool}
        onColorChange={setColor}
        onSizeChange={setSize}
        onToolChange={setTool}
        onUndo={undo}
        onRedo={redo}
        onDownload={downloadCanvas}
        isLoading={isLoading}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border border-gray-300 rounded bg-white shadow-md cursor-crosshair"
      />
    </div>
  );
}
