import { useRef, useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useDrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(2);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Only save initial state if canvas has dimensions
    if (canvas.width > 0 && canvas.height > 0) {
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialState]);
      setHistoryIndex(0);
    }

    const handleResize = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.6;
      ctx.putImageData(imageData, 0, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const saveToHistory = useCallback(
    (imageData: ImageData) => {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), imageData]);
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = size;
    },
    [tool, color, size]
  );

  const draw = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    },
    [isDrawing]
  );

  const stopDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(false);
    ctx.closePath();

    const newState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    saveToHistory(newState);

    // Save to Supabase
    const saveDrawing = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase.from("drawings").insert([
          {
            user_id: user.id,
            data: canvas.toDataURL(),
          },
        ]);

        if (error) throw error;
      } catch (error) {
        console.error("Error saving drawing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    saveDrawing();
  }, [isDrawing, saveToHistory]);

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setHistoryIndex((prev) => {
      ctx.putImageData(history[prev - 1], 0, 0);
      return prev - 1;
    });
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setHistoryIndex((prev) => {
      ctx.putImageData(history[prev + 1], 0, 0);
      return prev + 1;
    });
  }, [history, historyIndex]);

  const downloadCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = dataUrl;
    link.click();
  }, []);

  return {
    canvasRef,
    color,
    size,
    tool,
    isLoading,
    setColor,
    setSize,
    setTool,
    startDrawing,
    draw,
    stopDrawing,
    undo,
    redo,
    downloadCanvas,
  };
}
