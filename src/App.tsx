import React, { useState } from "react";
import { Note, CreateNoteData, NoteColor } from "./types/Note";
import { createNote } from "./utils/noteHelpers";
import NoteCard from "./components/NoteCard";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Reading List",
      content: "Atomic Habits - Chapter 3, The Psychology of Programming, Clean Code principles",
      color: NoteColor.Purple,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2", 
      title: "Learning Goals",
      content: "React hooks deep dive, TypeScript fundamentals, Design patterns",
      color: NoteColor.Beige,
      createdAt: new Date("2024-01-16"),
    },
    {
      id: "3",
      title: "Project Ideas", 
      content: "Personal blog with MDX, Reading tracker app, Code snippet manager",
      color: NoteColor.Green,
      createdAt: new Date("2024-01-17"),
    },
    {
      id: "4",
      title: "Tech Articles",
      content: "Modern CSS techniques, Performance optimization, Web accessibility guide",
      color: NoteColor.Yellow,
      createdAt: new Date("2024-01-18"),
    },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateNoteData>({
    title: "",
    content: "",
    color: NoteColor.Purple,
  });

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleCreateNote = () => setShowForm(true);
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    
    const newNote = createNote(form);
    setNotes(prev => [...prev, newNote]);
    
    setForm({ title: "", content: "", color: NoteColor.Purple });
    setShowForm(false);
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setForm({ title: "", content: "", color: NoteColor.Purple });
  };

  const handleEditNote = (note: Note) => {
    console.log("Edit note:", note.title);
    // 这里可以添加编辑功能
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
              <textarea
                name="content"
                placeholder="Content"
                value={form.content}
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
                {Object.entries(NoteColor).map(([name, color]) => (
                  <option value={color} key={color}>
                    {name}
                  </option>
                ))}
              </select>
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
        
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 24,
              marginTop: 8,
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: 24, color: theme === "dark" ? "#fff" : "#222", flex: 1 }}>
              My Notes
            </h2>
          </div>
          
          <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
            {notes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                theme={theme}
                onEdit={handleEditNote}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
