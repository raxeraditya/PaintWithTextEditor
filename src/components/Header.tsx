import { Pencil, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { TabButton } from "./TabButton";

interface HeaderProps {
  activeTab: "draw" | "text";
  onTabChange: (tab: "draw" | "text") => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-animated-header dark:bg-animated-header-dark shadow-sm border-4 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4 sm:gap-0">
        {/* Left Section with a Border on Mobile */}
        <div className="flex items-center justify-between w-full sm:w-auto sm:border-none border-blue-500 p-2">
          <ThemeToggle />
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text rainbow-text ml-4">
            Erasor Clone
          </h1>
        </div>

        {/* Right Section with a Border on Mobile */}
        <div className="flex gap-2 sm:gap-4 justify-center sm:justify-end w-full sm:w-auto border-t-4 sm:border-none border-green-500 p-2">
          <TabButton
            active={activeTab === "draw"}
            onClick={() => onTabChange("draw")}
            icon={<Pencil size={20} />}
            label="Draw"
          />
          <TabButton
            active={activeTab === "text"}
            onClick={() => onTabChange("text")}
            icon={<FileText size={20} />}
            label="Text Editor"
          />
        </div>
      </div>
    </header>
  );
}
