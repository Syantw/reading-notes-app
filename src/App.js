import React, { useState } from "react";
import SearchPage from "./components/SearchPage";
import ArchivePage from "./components/ArchivePage";
import SettingsPage from "./components/SettingsPage";
import HelpPage from "./components/HelpPage";
import FolderPage from "./components/FolderPage";

const sidebarBg = "#fafbfc";
const sidebarBorder = "#e1e4e8";
const mainBg = "#ffffff";
const cardShadow = "0 4px 12px rgba(0,0,0,0.08)";
const noteColors = ["#fff2cc", "#e1f5fe", "#f3e5f5", "#e8f5e8", "#fff3e0", "#fce4ec"];
const accentColor = "#6366f1";
const textPrimary = "#1f2937";
const textSecondary = "#6b7280";

const folders = [
  { abbr: "📚", name: "Currently Reading", color: "#3b82f6" },
  { abbr: "📖", name: "Want to Read", color: "#10b981" },
  { abbr: "✅", name: "Finished", color: "#8b5cf6" },
  { abbr: "📝", name: "Reading Notes", color: "#f59e0b" },
  { abbr: "💭", name: "Thoughts", color: "#ef4444" },
  { abbr: "📑", name: "Quotes", color: "#06b6d4" },
  { abbr: "🎯", name: "Goals", color: "#84cc16" },
  { abbr: "⭐", name: "Favorites", color: "#f97316" },
];



function App() {
  const [notes, setNotes] = useState([
    {
      title: "The Psychology of Money",
      date: "2025-06-27",
      color: noteColors[0],
      category: "Finance",
      rating: 5,
      items: [
        "Wealth is what you don't see - it's the cars not purchased, vacations not taken",
        "Your personal experiences make up maybe 0.00000001% of what's happened in the world",
        "The hardest financial skill is getting the goalpost to stop moving",
      ],
    },
    {
      title: "Atomic Habits",
      date: "2025-06-26",
      color: noteColors[1],
      category: "Self-Help",
      rating: 5,
      items: [
        "You do not rise to the level of your goals. You fall to the level of your systems",
        "Every action is a vote for the type of person you wish to become",
        "Habits are the compound interest of self-improvement",
      ],
    },
    {
      title: "Deep Work",
      date: "2025-06-25",
      color: noteColors[2],
      category: "Productivity",
      rating: 4,
      items: [
        "Human beings are at their best when immersed deeply in something challenging",
        "Clarity about what matters provides clarity about what does not",
      ],
    },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    color: noteColors[0],
    category: "",
    rating: 0,
    items: "",
  });

  const handleCreateNote = () => {
    setForm({
      title: "",
      date: new Date().toISOString().split('T')[0],
      color: noteColors[0],
      category: "",
      rating: 0,
      items: "",
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.items) return;
    
    const newNote = {
      title: form.title,
      date: form.date,
      color: form.color,
      category: form.category,
      rating: parseInt(form.rating) || 0,
      items: form.items.split("\n").filter(Boolean),
    };

    setNotes([newNote, ...notes]);
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "search":
        return <SearchPage notes={notes} />;
      case "archive":
        return <ArchivePage notes={notes} />;
      case "settings":
        return <SettingsPage />;
      case "help":
        return <HelpPage />;
      case "folder":
        return <FolderPage folder={selectedFolder} notes={notes} />;
      default:
        return (
          <>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ 
                fontWeight: 800, 
                fontSize: 32, 
                color: textPrimary, 
                margin: 0,
                marginBottom: 8,
              }}>
                My Reading Journey
              </h1>
              <p style={{ 
                color: textSecondary, 
                fontSize: 16,
                margin: 0,
              }}>
                Capture thoughts, insights, and discoveries from your reading adventures
              </p>
            </div>

            {/* Notes Grid */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
              gap: 24, 
              marginBottom: 48 
            }}>
              {notes.map((note, idx) => (
                <div
                  key={idx}
                  style={{
                    background: note.color,
                    borderRadius: 16,
                    boxShadow: cardShadow,
                    padding: "24px",
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "transform 0.2s ease",
                    cursor: "pointer",
                  }}
                >
                  <div style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: textPrimary,
                    marginBottom: 8,
                  }}>
                    {note.title}
                  </div>
                  
                  <div style={{
                    fontSize: 13,
                    color: textSecondary,
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                    <span>📅</span>
                    {note.date}
                    {note.category && (
                      <>
                        <span>•</span>
                        <span style={{ 
                          background: "rgba(0,0,0,0.1)", 
                          padding: "2px 8px", 
                          borderRadius: 12,
                          fontSize: 11,
                        }}>
                          {note.category}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div style={{ marginBottom: 16 }}>
                    {note.items.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 14,
                          color: textPrimary,
                          marginBottom: 8,
                          lineHeight: 1.5,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <span style={{ color: textSecondary }}>•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  {note.rating > 0 && (
                    <div style={{ display: "flex", gap: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{
                            color: i < note.rating ? "#fbbf24" : "#d1d5db",
                            fontSize: 14,
                          }}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Access */}
            <div style={{ marginTop: 48 }}>
              <h2 style={{ 
                fontWeight: 700, 
                fontSize: 24, 
                color: textPrimary,
                marginBottom: 24,
              }}>
                Quick Access
              </h2>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: 20 
              }}>
                {folders.slice(0, 6).map((folder) => (
                  <div
                    key={folder.name}
                    onClick={() => {
                      setSelectedFolder(folder);
                      setCurrentPage("folder");
                    }}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      cursor: "pointer",
                      border: `1px solid ${sidebarBorder}`,
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        background: `${folder.color}20`,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                      }}
                    >
                      {folder.abbr}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 16,
                          color: textPrimary,
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {folder.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: textSecondary,
                        }}
                      >
                        Organize your reading
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        background: mainBg,
        minHeight: "100vh",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 280,
          background: sidebarBg,
          borderRight: `1px solid ${sidebarBorder}`,
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ padding: "0 24px", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${accentColor} 0%, #8b5cf6 100%)`,
                marginRight: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              📚
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 20, color: textPrimary }}>
                ReadingHub
              </div>
              <div style={{ fontSize: 14, color: textSecondary }}>Your Reading Companion</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 24px" }}>
          <button
            style={{
              width: "100%",
              background: `linear-gradient(135deg, ${accentColor} 0%, #8b5cf6 100%)`,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "14px 0",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 24,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            }}
            onClick={handleCreateNote}
          >
            <span>✨</span> New Reading Note
          </button>

          <div style={{ marginBottom: 32 }}>
            {[
              { icon: "🔍", label: "Search", page: "search" },
              { icon: "📦", label: "Archives", page: "archive" },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                style={{
                  width: "100%",
                  background: currentPage === item.page ? "#f3f4f6" : "transparent",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: textPrimary,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <div
              style={{
                color: textSecondary,
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Reading Categories
            </div>
            {folders.slice(0, 6).map((folder) => (
              <button
                key={folder.name}
                onClick={() => {
                  setSelectedFolder(folder);
                  setCurrentPage("folder");
                }}
                style={{
                  width: "100%",
                  background: selectedFolder?.name === folder.name ? "#f3f4f6" : "transparent",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 16px",
                  color: textPrimary,
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 2,
                }}
              >
                <span>{folder.abbr}</span>
                {folder.name}
              </button>
            ))}
          </div>
        </nav>

        <div style={{ padding: "0 24px" }}>
          {[
            { icon: "⚙️", label: "Settings", page: "settings" },
            { icon: "❓", label: "Help & Tips", page: "help" },
          ].map((item) => (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                color: textSecondary,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 2,
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: "32px 48px", overflow: "auto" }}>
        {/* Form Modal */}
        {showForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <form
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                padding: 40,
                minWidth: 480,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
              onSubmit={handleFormSubmit}
            >
              <h2 style={{ 
                margin: 0, 
                fontWeight: 700, 
                fontSize: 24,
                color: textPrimary,
                textAlign: "center",
              }}>
                New Reading Note
              </h2>
              
              <input
                name="title"
                placeholder="Book title or topic..."
                value={form.title}
                onChange={handleFormChange}
                style={{ 
                  padding: 16, 
                  borderRadius: 12, 
                  border: "2px solid #e5e7eb",
                  fontSize: 16,
                  outline: "none",
                }}
                required
              />

              <div style={{ display: "flex", gap: 16 }}>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleFormChange}
                  style={{ 
                    flex: 1,
                    padding: 16, 
                    borderRadius: 12, 
                    border: "2px solid #e5e7eb",
                    fontSize: 16,
                    outline: "none",
                  }}
                />
                
                <input
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleFormChange}
                  style={{ 
                    flex: 1,
                    padding: 16, 
                    borderRadius: 12, 
                    border: "2px solid #e5e7eb",
                    fontSize: 16,
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 16 }}>
                <select
                  name="color"
                  value={form.color}
                  onChange={handleFormChange}
                  style={{ 
                    flex: 1,
                    padding: 16, 
                    borderRadius: 12, 
                    border: "2px solid #e5e7eb",
                    fontSize: 16,
                    outline: "none",
                  }}
                >
                  {noteColors.map((c, i) => (
                    <option value={c} key={i}>
                      Color Theme {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleFormChange}
                  style={{ 
                    padding: 16, 
                    borderRadius: 12, 
                    border: "2px solid #e5e7eb",
                    fontSize: 16,
                    outline: "none",
                  }}
                >
                  <option value={0}>No rating</option>
                  {[1,2,3,4,5].map(i => (
                    <option key={i} value={i}>{"⭐".repeat(i)}</option>
                  ))}
                </select>
              </div>
              
              <textarea
                name="items"
                placeholder="Your notes, thoughts, and insights (one per line)..."
                value={form.items}
                onChange={handleFormChange}
                style={{ 
                  padding: 16, 
                  borderRadius: 12, 
                  border: "2px solid #e5e7eb",
                  minHeight: 120,
                  fontSize: 16,
                  resize: "vertical",
                  outline: "none",
                }}
                required
              />
              
              <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
                <button 
                  type="button" 
                  onClick={handleFormCancel} 
                  style={{ 
                    padding: "12px 24px", 
                    borderRadius: 12, 
                    border: "2px solid #e5e7eb", 
                    background: "#fff", 
                    color: textSecondary, 
                    fontWeight: 500, 
                    cursor: "pointer",
                    fontSize: 16,
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
                    background: `linear-gradient(135deg, ${accentColor} 0%, #8b5cf6 100%)`, 
                    color: "#fff", 
                    fontWeight: 600, 
                    cursor: "pointer",
                    fontSize: 16,
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        )}
        
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
