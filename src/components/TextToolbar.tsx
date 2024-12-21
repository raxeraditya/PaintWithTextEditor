import React from "react";
import { Save, Copy, Trash } from "lucide-react";
import { ToolButton } from "./ToolButton";

interface TextToolbarProps {
  fontSize: number;
  fontFamily: string;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
  onSave: () => void;
  onCopy: () => void;
  onClear: () => void;
}

export function TextToolbar({
  fontSize,
  fontFamily,
  onFontSizeChange,
  onFontFamilyChange,
  onSave,
  onCopy,
  onClear,
}: TextToolbarProps) {
  return (
    <div className="flex-col sm:flex-row items-center sm:flex flex gap-4 w-full justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded transition-colors duration-300">
      <div className="flex gap-4">
        <select
          value={fontFamily}
          onChange={(e) => onFontFamilyChange(e.target.value)}
          className="px-2 py-1 rounded border bg-white dark:bg-gray-700 
            text-gray-900 dark:text-gray-100 transition-colors duration-300
            hover:scale-105 transition-transform"
        >
          <option value="monospace">Monospace</option>
          <option value="sans-serif">Sans Serif</option>
          <option value="serif">Serif</option>
        </select>
        <select
          value={fontSize}
          onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
          className="px-2 py-1 rounded border bg-white dark:bg-gray-700 
            text-gray-900 dark:text-gray-100 transition-colors duration-300
            hover:scale-105 transition-transform"
        >
          {[12, 14, 16, 18, 20, 24].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <ToolButton
          onClick={onSave}
          icon={<Save size={16} />}
          label="Save"
          className="bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all"
        />
        <ToolButton
          onClick={onCopy}
          icon={<Copy size={16} />}
          label="Copy"
          className="bg-gray-500 text-white hover:bg-gray-600 hover:scale-105 transition-all"
        />
        <ToolButton
          onClick={onClear}
          icon={<Trash size={16} />}
          label="Clear"
          className="bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all"
        />
      </div>
    </div>
  );
}
