import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import ThemeToggle from "./components/ThemeToggle";

const noteColors = ["#e6e6fa", "#ffe4c4", "#e6ffe6", "#fff9e6"];

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };
  const [notes, setNotes] = useState([
    {
      title: "Reading List",
      time: "Today",
      color: noteColors[0],
      items: [
        "Atomic Habits - Chapter 3",
        "The Psychology of Programming",
        "Clean Code principles",
      ],
    },
    {
      title: "Learning Goals",
      time: "This Week",
      color: noteColors[1],
      items: [
        "React hooks deep dive",
        "TypeScript fundamentals",
        "Design patterns",
      ],
    },
    {
      title: "Project Ideas",
      time: "Next Month",
      color: noteColors[2],
      items: [
        "Personal blog with MDX",
        "Reading tracker app",
        "Code snippet manager",
      ],
    },
    {
      title: "Tech Articles",
      time: "Saved",
      color: noteColors[3],
      items: [
        "Modern CSS techniques",
        "Performance optimization",
        "Web accessibility guide",
      ],
    },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    time: "",
    color: noteColors[0],
    items: "",
  });

  const handleCreateNote = () => setShowForm(true);
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.items) return;
    setNotes([
      ...notes,
      {
        title: form.title,
        time: form.time,
        color: form.color,
        items: form.items.split("\n").filter(Boolean),
      },
    ]);
    setForm({ title: "", time: "", color: noteColors[0], items: "" });
    setShowForm(false);
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setForm({ title: "", time: "", color: noteColors[0], items: "" });
  };

  const mainBg = theme === "dark" ? "#121212" : "#f7f8fa";
  const cardShadow = theme === "dark" 
    ? "0 2px 8px rgba(255,255,255,0.08)" 
    : "0 2px 8px rgba(0,0,0,0.04)";

  return (
    <div
      style={{
        display: "flex",
        background: mainBg,
        minHeight: "100vh",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Sidebar onCreateNote={handleCreateNote} theme={theme} />
      <main
        style={{
          flex: 1,
          padding: "48px 48px 0 48px",
          background: mainBg,
          transition: "background 0.3s ease",
        }}
      >
        {showForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <form
              onSubmit={handleFormSubmit}
              style={{
                background: theme === "dark" ? "#1a1a1a" : "#fff",
                borderRadius: 16,
                boxShadow: cardShadow,
                padding: 32,
                minWidth: 320,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "background 0.3s ease",
              }}
            >
              <h2 style={{ 
                margin: 0, 
                fontWeight: 700, 
                fontSize: 20,
                color: theme === "dark" ? "#fff" : "#222"
              }}>
                New Note
              </h2>
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleFormChange}
                style={{ 
                  padding: 8, 
                  borderRadius: 8, 
                  border: `1px solid ${theme === "dark" ? "#333" : "#eee"}`,
                  background: theme === "dark" ? "#333" : "#fff",
                  color: theme === "dark" ? "#fff" : "#222"
                }}
                required
              />
              <input
                name="time"
                placeholder="Time (optional)"
                value={form.time}
                onChange={handleFormChange}
                style={{ 
                  padding: 8, 
                  borderRadius: 8, 
                  border: `1px solid ${theme === "dark" ? "#333" : "#eee"}`,
                  background: theme === "dark" ? "#333" : "#fff",
                  color: theme === "dark" ? "#fff" : "#222"
                }}
              />
              <select
                name="color"
                value={form.color}
                onChange={handleFormChange}
                style={{ 
                  padding: 8, 
                  borderRadius: 8, 
                  border: `1px solid ${theme === "dark" ? "#333" : "#eee"}`,
                  background: theme === "dark" ? "#333" : "#fff",
                  color: theme === "dark" ? "#fff" : "#222"
                }}
              >
                {noteColors.map((c, i) => (
                  <option value={c} key={i}>
                    Color {i + 1}
                  </option>
                ))}
              </select>
              <textarea
                name="items"
                placeholder="One item per line"
                value={form.items}
                onChange={handleFormChange}
                style={{ 
                  padding: 8, 
                  borderRadius: 8, 
                  border: `1px solid ${theme === "dark" ? "#333" : "#eee"}`,
                  minHeight: 80,
                  background: theme === "dark" ? "#333" : "#fff",
                  color: theme === "dark" ? "#fff" : "#222"
                }}
                required
              />
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button 
                  type="button" 
                  onClick={handleFormCancel} 
                  style={{ 
                    padding: "8px 16px", 
                    borderRadius: 8, 
                    border: "none", 
                    background: theme === "dark" ? "#444" : "#eee", 
                    color: theme === "dark" ? "#fff" : "#222", 
                    fontWeight: 500, 
                    cursor: "pointer" 
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ 
                    padding: "8px 16px", 
                    borderRadius: 8, 
                    border: "none", 
                    background: theme === "dark" ? "#555" : "#222", 
                    color: "#fff", 
                    fontWeight: 600, 
                    cursor: "pointer" 
                  }}
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        )}
        <NoteList notes={notes} theme={theme} />
      </main>
    </div>
  );
}

export default App;
