import { useCallback, useState } from 'react';

export function useCanvasSetup(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Only save initial state if canvas has dimensions
    if (canvas.width > 0 && canvas.height > 0) {
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialState]);
      setHistoryIndex(0);
    }
  }, [canvasRef]);

  return {
    history,
    setHistory,
    historyIndex,
    setHistoryIndex,
    initializeCanvas
  };
}