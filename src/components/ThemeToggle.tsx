import React from "react";

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: "50%",
        border: "none",
        background: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        fontSize: 20,
        cursor: "pointer",
        boxShadow: theme === "dark" 
          ? "0 4px 12px rgba(255,255,255,0.1)" 
          : "0 4px 12px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle; 