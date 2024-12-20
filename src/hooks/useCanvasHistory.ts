import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useCanvasHistory(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const saveToHistory = useCallback((imageData: ImageData) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex <= 0 || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    setHistoryIndex(prev => {
      ctx.putImageData(history[prev - 1], 0, 0);
      return prev - 1;
    });
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1 || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    setHistoryIndex(prev => {
      ctx.putImageData(history[prev + 1], 0, 0);
      return prev + 1;
    });
  }, [history, historyIndex]);

  const saveToSupabase = useCallback(async () => {
    if (!canvasRef.current) return;
    
    setIsLoading(true);
    try {
      const dataUrl = canvasRef.current.toDataURL();
      const { error } = await supabase
        .from('drawings')
        .insert([{ data: dataUrl }]);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving drawing:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    history,
    historyIndex,
    isLoading,
    saveToHistory,
    undo,
    redo,
    saveToSupabase
  };
}