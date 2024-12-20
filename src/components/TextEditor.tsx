import React from 'react';
import { TextToolbar } from './TextToolbar';
import { useTextEditor } from '../hooks/useTextEditor';

export function TextEditor() {
  const {
    text,
    fontSize,
    fontFamily,
    handleTextChange,
    handleFontSizeChange,
    handleFontFamilyChange,
    handleSave,
    handleCopy,
    handleClear
  } = useTextEditor();

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
      <TextToolbar
        fontSize={fontSize}
        fontFamily={fontFamily}
        onFontSizeChange={handleFontSizeChange}
        onFontFamilyChange={handleFontFamilyChange}
        onSave={handleSave}
        onCopy={handleCopy}
        onClear={handleClear}
      />
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full h-[60vh] p-4 rounded border resize-none bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100 transition-colors duration-300"
        style={{ fontFamily, fontSize: `${fontSize}px` }}
        placeholder="Start typing..."
      />
    </div>
  );
}