export const themes = {
  light: {
    name: "light",
    colors: {
      background: "#f7f8fa",
      cardBackground: "#fff",
      text: "#222",
      secondaryText: "#888",
      border: "#f0f0f0",
      shadow: "0 2px 8px rgba(0,0,0,0.04)",
      noteColors: ["#e6e6fa", "#ffe4c4", "#e6ffe6", "#fff9e6"],
    }
  },
  dark: {
    name: "dark",
    colors: {
      background: "#121212",
      cardBackground: "#1a1a1a",
      text: "#fff",
      secondaryText: "#ccc",
      border: "#333",
      shadow: "0 2px 8px rgba(255,255,255,0.08)",
      noteColors: ["#4a4a6a", "#6b5b4a", "#4a6b4a", "#6b6b4a"],
    }
  }
};

export const getTheme = (themeName) => themes[themeName] || themes.light; 