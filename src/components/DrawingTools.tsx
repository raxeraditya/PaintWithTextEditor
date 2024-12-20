import { Eraser, Pencil, Download, Undo, Redo, Loader } from "lucide-react";
import { ToolButton } from "./ToolButton";

interface DrawingToolsProps {
  color: string;
  size: number;
  tool: string;
  isLoading: boolean;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onToolChange: (tool: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onDownload: () => void;
}

export function DrawingTools({
  color,
  size,
  tool,
  isLoading,
  onColorChange,
  onSizeChange,
  onToolChange,
  onUndo,
  onRedo,
  onDownload,
}: DrawingToolsProps) {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <div className="top flex items-center gap-4 pt-3">
        <ToolButton
          active={tool === "pencil"}
          onClick={() => onToolChange("pencil")}
          icon={<Pencil size={20} />}
          className="hover:scale-110 transition-transform"
        />
        <ToolButton
          active={tool === "eraser"}
          onClick={() => onToolChange("eraser")}
          icon={<Eraser size={20} />}
          className="hover:scale-110 transition-transform"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer hover:scale-110 transition-transform"
        />
        <input
          type="range"
          min="1"
          max="20"
          value={size}
          onChange={(e) => onSizeChange(parseInt(e.target.value))}
          className="w-32 hover:scale-105 transition-transform"
        />
      </div>
      <div className="bottom flex items-center gap-4 pb-3">
        <ToolButton
          onClick={onUndo}
          icon={<Undo size={20} />}
          className="hover:scale-110 transition-transform"
        />
        <ToolButton
          onClick={onRedo}
          icon={<Redo size={20} />}
          className="hover:scale-110 transition-transform"
        />
        <ToolButton
          onClick={onDownload}
          icon={<Download size={20} />}
          className="hover:scale-110 transition-transform"
        />
        {isLoading && <Loader className="w-5 h-5 animate-spin text-blue-500" />}
      </div>
    </div>
  );
}
