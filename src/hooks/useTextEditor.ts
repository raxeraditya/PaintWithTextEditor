import { useState, useCallback } from 'react';

export function useTextEditor() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('monospace');

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const handleFontSizeChange = useCallback((size: number) => {
    setFontSize(size);
  }, []);

  const handleFontFamilyChange = useCallback((family: string) => {
    setFontFamily(family);
  }, []);

  const handleSave = useCallback(() => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.txt';
    link.click();
    URL.revokeObjectURL(url);
  }, [text]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  const handleClear = useCallback(() => {
    setText('');
  }, []);

  return {
    text,
    fontSize,
    fontFamily,
    handleTextChange,
    handleFontSizeChange,
    handleFontFamilyChange,
    handleSave,
    handleCopy,
    handleClear
  };
}