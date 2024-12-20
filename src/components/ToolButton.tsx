import React from "react";

interface ToolButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  active?: boolean;
}

export function ToolButton({ onClick, icon, active = false }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded transition-colors ${
        active ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-300"
      }`}
    >
      {icon}
    </button>
  );
}
