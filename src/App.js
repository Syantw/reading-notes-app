import React, { useState } from "react";

const sidebarBg = "#fff";
const sidebarBorder = "#f0f0f0";
const mainBg = "#f7f8fa";
const cardShadow = "0 2px 8px rgba(0,0,0,0.04)";
const noteColors = ["#e6f3ff", "#fff2e6", "#e6ffe6", "#fff0f0", "#f0e6ff", "#fffacd"];
const folderColor = "#4a90e2";

const folders = [
  { abbr: "📚", name: "Reading Lists", emoji: "📚" },
  { abbr: "📖", name: "Currently Reading", emoji: "📖" },
  { abbr: "✅", name: "Completed Books", emoji: "✅" },
  { abbr: "📝", name: "Reading Notes", emoji: "📝" },
  { abbr: "💡", name: "Insights", emoji: "💡" },
  { abbr: "🔖", name: "Bookmarks", emoji: "🔖" },
  { abbr: "🎯", name: "Reading Goals", emoji: "🎯" },
  { abbr: "📊", name: "Progress", emoji: "📊" },
];

function Sidebar({ onCreateNote }) {
  return (
    <aside
      style={{
        width: 280,
        background: sidebarBg,
        borderRight: `1px solid ${sidebarBorder}`,
        padding: "32px 0 24px 0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div style={{ padding: "0 32px", marginBottom: 40 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              marginRight: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            📚
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#222" }}>
              ReadingNotes
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>Personal Library</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1 }}>
        <div style={{ padding: "0 32px" }}>
          <button
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 0",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
              transition: "all 0.2s ease",
            }}
            onClick={onCreateNote}
            onMouseOver={(e) => e.target.style.transform = "translateY(-1px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            <span>📝</span> New Reading Note
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div 
              style={{ 
                color: "#222", 
                fontWeight: 500, 
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: 8,
                transition: "background 0.2s ease",
              }}
              onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
            >
              🔍 Search Notes
            </div>
            <div 
              style={{ 
                color: "#222", 
                fontWeight: 500, 
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: 8,
                transition: "background 0.2s ease",
              }}
              onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
            >
              📊 Reading Statistics
            </div>
            <div 
              style={{ 
                color: "#222", 
                fontWeight: 500, 
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: 8,
                transition: "background 0.2s ease",
              }}
              onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
            >
              🗄️ Archives
            </div>
          </div>
          <div>
            <div
              style={{
                color: "#888",
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Reading Categories
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {folders.map((f) => (
                <div
                  key={f.name}
                  style={{
                    color: "#222",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: 8,
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#f0f0f0";
                    e.target.style.transform = "translateX(4px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{f.emoji}</span>
                  {f.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ padding: "0 32px", marginTop: 32, borderTop: `1px solid ${sidebarBorder}`, paddingTop: 24 }}>
        <div
          style={{
            color: "#888",
            fontSize: 14,
            marginBottom: 8,
            cursor: "pointer",
            padding: "4px 0",
          }}
        >
          ⚙️ Settings
        </div>
        <div
          style={{
            color: "#888",
            fontSize: 14,
            cursor: "pointer",
            padding: "4px 0",
          }}
        >
          ❓ Help & Support
        </div>
      </div>
    </aside>
  );
}

function NoteList({ notes }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 32,
          marginTop: 8,
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            fontWeight: 700, 
            fontSize: 32, 
            color: "#222", 
            margin: 0,
            marginBottom: 8,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            My Reading Notes
          </h1>
          <p style={{
            color: "#666",
            fontSize: 16,
            margin: 0,
          }}>
            Capture your thoughts, insights, and progress on your reading journey
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "#f0f0f0",
            borderRadius: 12,
            padding: 4,
          }}
        >
          <button
            style={{
              background: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 500,
              color: "#222",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            Recent
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 500,
              color: "#888",
              cursor: "pointer",
            }}
          >
            This Week
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 500,
              color: "#888",
              cursor: "pointer",
            }}
          >
            This Month
          </button>
        </div>
      </div>
      
      {notes.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#666",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
          <h3 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>No reading notes yet</h3>
          <p style={{ fontSize: "16px", marginBottom: "24px" }}>Start your reading journey by creating your first note!</p>
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24, 
          marginBottom: 40 
        }}>
          {notes.map((note, idx) => (
            <div
              key={idx}
              style={{
                background: note.color,
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: "20px", marginRight: 8 }}>
                  {note.category === "book" ? "📖" : 
                   note.category === "article" ? "📄" : 
                   note.category === "insight" ? "💡" : "📝"}
                </span>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#222",
                    flex: 1,
                  }}
                >
                  {note.title}
                </div>
              </div>
              
              {note.author && (
                <div
                  style={{
                    fontSize: 14,
                    color: "#666",
                    marginBottom: 8,
                    fontStyle: "italic",
                  }}
                >
                  by {note.author}
                </div>
              )}
              
              <div
                style={{
                  fontSize: 13,
                  color: "#888",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                {note.date} • {note.category || "Note"}
              </div>
              
              {note.summary && (
                <div
                  style={{
                    fontSize: 14,
                    color: "#555",
                    marginBottom: 12,
                    lineHeight: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {note.summary}
                </div>
              )}
              
              <div style={{ flex: 1 }}>
                {note.items.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 14,
                      color: "#333",
                      marginBottom: 8,
                      lineHeight: 1.4,
                      padding: "4px 0",
                    }}
                  >
                    • {item}
                  </div>
                ))}
                {note.items.length > 3 && (
                  <div style={{ fontSize: 13, color: "#888", fontStyle: "italic" }}>
                    +{note.items.length - 3} more notes...
                  </div>
                )}
              </div>
              
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                marginTop: 16,
                paddingTop: 12,
                borderTop: "1px solid rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {note.tags && note.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 11,
                        background: "rgba(0,0,0,0.1)",
                        color: "#666",
                        padding: "2px 8px",
                        borderRadius: 12,
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: "#667eea",
                    cursor: "pointer",
                  }}
                  title="Edit Note"
                >
                  ✏️
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecentFolders() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: 20, color: "#222", flex: 1 }}>
          Quick Access Categories
        </h3>
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "#f0f0f0",
            borderRadius: 12,
            padding: 4,
          }}
        >
          <button
            style={{
              background: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              fontWeight: 500,
              color: "#222",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            All
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              fontWeight: 500,
              color: "#888",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Recent
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {folders.slice(0, 6).map((folder) => (
          <div
            key={folder.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 100,
              cursor: "pointer",
              padding: 16,
              borderRadius: 12,
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f8f9fa";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                marginBottom: 12,
                boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
              }}
            >
              {folder.emoji}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#222",
                fontWeight: 600,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {folder.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [notes, setNotes] = useState([
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      date: "2025-06-27",
      category: "book",
      color: noteColors[0],
      summary: "Understanding how habits work and how to change them effectively.",
      tags: ["psychology", "self-improvement"],
      items: [
        "Habit loop: cue, routine, reward",
        "Focus on changing the routine, not the cue or reward",
        "Small wins create momentum for bigger changes",
        "Keystone habits can transform entire life patterns",
      ],
    },
    {
      title: "Deep Work Principles",
      author: "Cal Newport",
      date: "2025-06-26",
      category: "book",
      color: noteColors[1],
      summary: "Strategies for focused work in a distracted world.",
      tags: ["productivity", "focus"],
      items: [
        "Deep work is becoming increasingly rare and valuable",
        "Create rituals and routines to support deep work",
        "Minimize shallow work and distractions",
      ],
    },
    {
      title: "Reading Insights",
      date: "2025-06-25",
      category: "insight",
      color: noteColors[2],
      summary: "Personal reflections on effective reading strategies.",
      tags: ["reading", "learning"],
      items: [
        "Active reading with note-taking improves retention",
        "Spaced repetition helps consolidate knowledge",
        "Connecting ideas across books creates deeper understanding",
      ],
    },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    date: new Date().toISOString().split('T')[0],
    category: "book",
    summary: "",
    tags: "",
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
    
    const newNote = {
      title: form.title,
      author: form.author,
      date: form.date,
      category: form.category,
      summary: form.summary,
      tags: form.tags ? form.tags.split(',').map(tag => tag.trim()) : [],
      color: form.color,
      items: form.items.split("\n").filter(Boolean),
    };
    
    setNotes([newNote, ...notes]);
    setForm({ 
      title: "", 
      author: "", 
      date: new Date().toISOString().split('T')[0], 
      category: "book",
      summary: "",
      tags: "",
      color: noteColors[0], 
      items: "" 
    });
    setShowForm(false);
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setForm({ 
      title: "", 
      author: "", 
      date: new Date().toISOString().split('T')[0], 
      category: "book",
      summary: "",
      tags: "",
      color: noteColors[0], 
      items: "" 
    });
  };

  return (
    <div
      style={{
        display: "flex",
        background: mainBg,
        minHeight: "100vh",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      }}
    >
      <Sidebar onCreateNote={handleCreateNote} />
      <main
        style={{
          flex: 1,
          padding: "48px 48px 0 48px",
          background: mainBg,
          maxWidth: "calc(100vw - 280px)",
          overflow: "hidden",
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
              background: "rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              backdropFilter: "blur(4px)",
            }}
          >
            <form
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                padding: 40,
                minWidth: 480,
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onSubmit={handleFormSubmit}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: "24px", marginRight: 12 }}>📝</span>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, color: "#222" }}>
                  New Reading Note
                </h2>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input
                  name="title"
                  placeholder="Book/Article Title *"
                  value={form.title}
                  onChange={handleFormChange}
                  style={{ 
                    padding: 12, 
                    borderRadius: 12, 
                    border: "2px solid #f0f0f0",
                    fontSize: 14,
                    fontWeight: 500,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                  required
                />
                <input
                  name="author"
                  placeholder="Author (optional)"
                  value={form.author}
                  onChange={handleFormChange}
                  style={{ 
                    padding: 12, 
                    borderRadius: 12, 
                    border: "2px solid #f0f0f0",
                    fontSize: 14,
                    fontWeight: 500,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleFormChange}
                  style={{ 
                    padding: 12, 
                    borderRadius: 12, 
                    border: "2px solid #f0f0f0",
                    fontSize: 14,
                    fontWeight: 500,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  style={{ 
                    padding: 12, 
                    borderRadius: 12, 
                    border: "2px solid #f0f0f0",
                    fontSize: 14,
                    fontWeight: 500,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                >
                  <option value="book">📖 Book</option>
                  <option value="article">📄 Article</option>
                  <option value="insight">💡 Personal Insight</option>
                  <option value="note">📝 General Note</option>
                </select>
              </div>
              
              <textarea
                name="summary"
                placeholder="Brief summary or key takeaway (optional)"
                value={form.summary}
                onChange={handleFormChange}
                style={{ 
                  padding: 12, 
                  borderRadius: 12, 
                  border: "2px solid #f0f0f0",
                  fontSize: 14,
                  fontWeight: 500,
                  minHeight: 80,
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
              />
              
              <input
                name="tags"
                placeholder="Tags (separated by commas)"
                value={form.tags}
                onChange={handleFormChange}
                style={{ 
                  padding: 12, 
                  borderRadius: 12, 
                  border: "2px solid #f0f0f0",
                  fontSize: 14,
                  fontWeight: 500,
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
              />
              
              <select
                name="color"
                value={form.color}
                onChange={handleFormChange}
                style={{ 
                  padding: 12, 
                  borderRadius: 12, 
                  border: "2px solid #f0f0f0",
                  fontSize: 14,
                  fontWeight: 500,
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
              >
                {noteColors.map((c, i) => (
                  <option value={c} key={i}>
                    Color Theme {i + 1}
                  </option>
                ))}
              </select>
              
              <textarea
                name="items"
                placeholder="Your notes, insights, or key points (one per line) *"
                value={form.items}
                onChange={handleFormChange}
                style={{ 
                  padding: 12, 
                  borderRadius: 12, 
                  border: "2px solid #f0f0f0",
                  fontSize: 14,
                  fontWeight: 500,
                  minHeight: 120,
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                required
              />
              
              <div style={{ display: "flex", gap: 16, justifyContent: "flex-end", marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={handleFormCancel} 
                  style={{ 
                    padding: "12px 24px", 
                    borderRadius: 12, 
                    border: "2px solid #f0f0f0", 
                    background: "#fff", 
                    color: "#666", 
                    fontWeight: 600, 
                    cursor: "pointer",
                    fontSize: 14,
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.background = "#f8f9fa";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderColor = "#f0f0f0";
                    e.target.style.background = "#fff";
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ 
                    padding: "12px 24px", 
                    borderRadius: 12, 
                    border: "none", 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
                    color: "#fff", 
                    fontWeight: 600, 
                    cursor: "pointer",
                    fontSize: 14,
                    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)";
                  }}
                >
                  📝 Save Reading Note
                </button>
              </div>
            </form>
          </div>
        )}
        <NoteList notes={notes} />
        <RecentFolders />
      </main>
    </div>
  );
}

export default App;
