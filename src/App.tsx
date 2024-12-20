import { useState } from "react";
import { Canvas } from "./components/Canvas";
import { TextEditor } from "./components/TextEditor";
import { CustomCursor } from "./components/CustomCursor";
import { Header } from "./components/Header";

export function App() {
  const [activeTab, setActiveTab] = useState<"draw" | "text">("draw");

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <CustomCursor />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="">
        {activeTab === "draw" ? <Canvas /> : <TextEditor />}
      </main>
    </div>
  );
}
