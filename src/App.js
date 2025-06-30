import React, { useState } from "react";

// 现代阅读应用主题配色
const theme = {
  colors: {
    primary: "#6366f1",
    primaryLight: "#818cf8",
    secondary: "#10b981",
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceElevated: "#f1f5f9",
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      muted: "#94a3b8"
    },
    accent: {
      reading: "#3b82f6",
      finished: "#10b981",
      planning: "#f59e0b",
      notes: "#8b5cf6"
    },
    noteColors: [
      "#fef3c7", // 温暖黄色
      "#dbeafe", // 天空蓝
      "#dcfce7", // 薄荷绿
      "#fce7f3", // 粉色
      "#e0e7ff", // 靛蓝
      "#fef2f2"  // 玫瑰红
    ]
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem", 
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem"
  }
};

const readingCategories = [
  { 
    id: "currently", 
    name: "Currently Reading", 
    icon: "📖", 
    color: theme.colors.accent.reading,
    bgColor: "#dbeafe" 
  },
  { 
    id: "finished", 
    name: "Finished", 
    icon: "✅", 
    color: theme.colors.accent.finished,
    bgColor: "#dcfce7" 
  },
  { 
    id: "planning", 
    name: "Want to Read", 
    icon: "📚", 
    color: theme.colors.accent.planning,
    bgColor: "#fef3c7" 
  },
  { 
    id: "notes", 
    name: "Reading Notes", 
    icon: "📝", 
    color: theme.colors.accent.notes,
    bgColor: "#e0e7ff" 
  },
  { 
    id: "quotes", 
    name: "Favorite Quotes", 
    icon: "💭", 
    color: "#ec4899",
    bgColor: "#fce7f3" 
  },
  { 
    id: "reviews", 
    name: "Book Reviews", 
    icon: "⭐", 
    color: "#f97316",
    bgColor: "#fed7aa" 
  }
];

function Sidebar({ onCreateNote, activeCategory, setActiveCategory }) {
  return (
    <aside
      style={{
        width: 280,
        background: theme.colors.surface,
        borderRight: `1px solid ${theme.colors.surfaceElevated}`,
        padding: "32px 0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ padding: "0 24px", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.borderRadius.lg,
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)`,
              marginRight: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px"
            }}
          >
            📚
          </div>
          <div>
            <div style={{ 
              fontWeight: 700, 
              fontSize: 20, 
              color: theme.colors.text.primary,
              letterSpacing: "-0.025em"
            }}>
              Reading Notes
            </div>
            <div style={{ 
              fontSize: 14, 
              color: theme.colors.text.muted,
              marginTop: 2
            }}>
              Personal Library
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div style={{
          position: "relative",
          marginBottom: 20
        }}>
          <div style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: theme.colors.text.muted,
            fontSize: 16
          }}>
            🔍
          </div>
          <input
            placeholder="Search books, notes..."
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              border: `1px solid ${theme.colors.surfaceElevated}`,
              borderRadius: theme.borderRadius.lg,
              fontSize: 14,
              backgroundColor: theme.colors.background,
              color: theme.colors.text.primary,
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
            onBlur={(e) => e.target.style.borderColor = theme.colors.surfaceElevated}
          />
        </div>

        {/* Create Note Button */}
        <button
          onClick={onCreateNote}
          style={{
            width: "100%",
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)`,
            color: "#fff",
            border: "none",
            borderRadius: theme.borderRadius.lg,
            padding: "12px 16px",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: theme.shadows.md,
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = theme.shadows.lg;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = theme.shadows.md;
          }}
        >
          <span style={{ fontSize: 16 }}>📝</span>
          Add New Note
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 24px" }}>
        <div style={{
          color: theme.colors.text.muted,
          fontWeight: 600,
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 16
        }}>
          Categories
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {readingCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                width: "100%",
                background: activeCategory === category.id ? category.bgColor : "transparent",
                color: activeCategory === category.id ? category.color : theme.colors.text.secondary,
                border: "none",
                borderRadius: theme.borderRadius.md,
                padding: "10px 12px",
                fontSize: 14,
                fontWeight: activeCategory === category.id ? 600 : 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                textAlign: "left",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.backgroundColor = theme.colors.background;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              <span style={{ fontSize: 16 }}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div style={{ padding: "0 24px", marginTop: 32 }}>
        <div style={{
          padding: 16,
          background: theme.colors.background,
          borderRadius: theme.borderRadius.lg,
          border: `1px solid ${theme.colors.surfaceElevated}`
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: theme.colors.text.primary,
            marginBottom: 4
          }}>
            Reading Progress
          </div>
          <div style={{
            fontSize: 12,
            color: theme.colors.text.muted,
            marginBottom: 8
          }}>
            5 books this month
          </div>
          <div style={{
            width: "100%",
            height: 6,
            background: theme.colors.surfaceElevated,
            borderRadius: 3,
            overflow: "hidden"
          }}>
            <div style={{
              width: "68%",
              height: "100%",
              background: `linear-gradient(90deg, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`
            }} />
          </div>
        </div>
      </div>
    </aside>
  );
}

function NoteCard({ note, index }) {
  return (
    <div
      style={{
        background: note.color,
        borderRadius: theme.borderRadius["2xl"],
        boxShadow: theme.shadows.md,
        padding: "24px",
        minWidth: 280,
        maxWidth: 320,
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.2)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = theme.shadows.xl;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = theme.shadows.md;
      }}
    >
      {/* Note Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontWeight: 700,
            fontSize: 18,
            color: theme.colors.text.primary,
            lineHeight: 1.3,
            marginBottom: 4
          }}>
            {note.title}
          </h3>
          <div style={{
            fontSize: 13,
            color: theme.colors.text.muted,
            fontWeight: 500
          }}>
            {note.date || "Today"}
          </div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.8)",
          borderRadius: theme.borderRadius.md,
          padding: "4px 8px",
          fontSize: 11,
          fontWeight: 600,
          color: theme.colors.text.secondary,
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
          {note.category || "Note"}
        </div>
      </div>

      {/* Note Content */}
      <div style={{ flex: 1, marginBottom: 16 }}>
        <ul style={{ 
          padding: 0, 
          margin: 0, 
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>
          {note.items.slice(0, 3).map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: 14,
                color: theme.colors.text.primary,
                lineHeight: 1.5,
                display: "flex",
                alignItems: "flex-start",
                gap: 8
              }}
            >
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: theme.colors.text.muted,
                marginTop: 7,
                flexShrink: 0
              }} />
              <span>{item}</span>
            </li>
          ))}
          {note.items.length > 3 && (
            <li style={{
              fontSize: 12,
              color: theme.colors.text.muted,
              fontStyle: "italic",
              marginLeft: 14
            }}>
              +{note.items.length - 3} more items...
            </li>
          )}
        </ul>
      </div>

      {/* Note Actions */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{
          fontSize: 12,
          color: theme.colors.text.muted
        }}>
          {note.items.length} items
        </div>
        <button
          style={{
            background: "rgba(255,255,255,0.9)",
            border: "none",
            borderRadius: theme.borderRadius.md,
            padding: "8px 12px",
            fontSize: 12,
            fontWeight: 600,
            color: theme.colors.text.secondary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,1)"}
          onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.9)"}
        >
          <span>✎</span>
          Edit
        </button>
      </div>
    </div>
  );
}

function NoteList({ notes, activeCategory }) {
  const filteredNotes = notes; // 可以根据 activeCategory 筛选

  return (
    <div>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32
      }}>
        <div>
          <h1 style={{ 
            margin: 0,
            fontWeight: 800, 
            fontSize: 32, 
            color: theme.colors.text.primary,
            letterSpacing: "-0.025em",
            marginBottom: 8
          }}>
            My Reading Notes
          </h1>
          <p style={{
            margin: 0,
            fontSize: 16,
            color: theme.colors.text.muted,
            lineHeight: 1.5
          }}>
            Keep track of your reading journey, insights, and favorite quotes
          </p>
        </div>
        
        {/* View Toggle */}
        <div style={{
          display: "flex",
          gap: 8,
          background: theme.colors.surfaceElevated,
          borderRadius: theme.borderRadius.lg,
          padding: 4
        }}>
          {["Today", "This Week", "All Time"].map((period, index) => (
            <button
              key={period}
              style={{
                background: index === 0 ? theme.colors.surface : "transparent",
                border: "none",
                borderRadius: theme.borderRadius.md,
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 600,
                color: index === 0 ? theme.colors.text.primary : theme.colors.text.muted,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: index === 0 ? theme.shadows.sm : "none"
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 24,
        marginBottom: 48
      }}>
        {filteredNotes.map((note, idx) => (
          <NoteCard key={idx} note={note} index={idx} />
        ))}
      </div>
    </div>
  );
}

function QuickStats() {
  const stats = [
    { label: "Books Read", value: "12", icon: "📖", color: theme.colors.accent.reading },
    { label: "Notes Created", value: "45", icon: "📝", color: theme.colors.accent.notes },
    { label: "Quotes Saved", value: "28", icon: "💭", color: theme.colors.accent.planning },
    { label: "Reading Streak", value: "7 days", icon: "🔥", color: theme.colors.accent.finished }
  ];

  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{
        fontWeight: 700,
        fontSize: 20,
        color: theme.colors.text.primary,
        marginBottom: 20,
        letterSpacing: "-0.025em"
      }}>
        Reading Statistics
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              background: theme.colors.surface,
              borderRadius: theme.borderRadius.xl,
              padding: 20,
              boxShadow: theme.shadows.sm,
              border: `1px solid ${theme.colors.surfaceElevated}`,
              display: "flex",
              alignItems: "center",
              gap: 16
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: theme.borderRadius.lg,
              background: `${stat.color}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: theme.colors.text.primary,
                marginBottom: 4
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 14,
                color: theme.colors.text.muted,
                fontWeight: 500
              }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreateNoteModal({ showForm, form, handleFormChange, handleFormSubmit, handleFormCancel }) {
  if (!showForm) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(15, 23, 42, 0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 20
    }}>
      <form
        onSubmit={handleFormSubmit}
        style={{
          background: theme.colors.surface,
          borderRadius: theme.borderRadius["2xl"],
          boxShadow: theme.shadows.xl,
          padding: 32,
          minWidth: 480,
          maxWidth: 600,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          border: `1px solid ${theme.colors.surfaceElevated}`
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8
        }}>
          <h2 style={{ 
            margin: 0, 
            fontWeight: 700, 
            fontSize: 24,
            color: theme.colors.text.primary,
            letterSpacing: "-0.025em"
          }}>
            Create New Note
          </h2>
          <button
            type="button"
            onClick={handleFormCancel}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              color: theme.colors.text.muted,
              cursor: "pointer",
              padding: 8,
              borderRadius: theme.borderRadius.md
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: 8
            }}>
              Title *
            </label>
            <input
              name="title"
              placeholder="Enter note title..."
              value={form.title}
              onChange={handleFormChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: theme.borderRadius.lg,
                border: `2px solid ${theme.colors.surfaceElevated}`,
                fontSize: 16,
                backgroundColor: theme.colors.background,
                color: theme.colors.text.primary,
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
              onBlur={(e) => e.target.style.borderColor = theme.colors.surfaceElevated}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: theme.colors.text.primary,
                marginBottom: 8
              }}>
                Date
              </label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: theme.borderRadius.lg,
                  border: `2px solid ${theme.colors.surfaceElevated}`,
                  fontSize: 14,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text.primary,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: theme.colors.text.primary,
                marginBottom: 8
              }}>
                Color Theme
              </label>
              <div style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap"
              }}>
                {theme.colors.noteColors.map((color, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleFormChange({
                      target: { name: "color", value: color }
                    })}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: theme.borderRadius.md,
                      background: color,
                      border: form.color === color 
                        ? `3px solid ${theme.colors.primary}` 
                        : `2px solid ${theme.colors.surfaceElevated}`,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: 8
            }}>
              Content *
            </label>
            <textarea
              name="items"
              placeholder="Enter your notes, insights, or quotes (one per line)..."
              value={form.items}
              onChange={handleFormChange}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: theme.borderRadius.lg,
                border: `2px solid ${theme.colors.surfaceElevated}`,
                fontSize: 14,
                backgroundColor: theme.colors.background,
                color: theme.colors.text.primary,
                outline: "none",
                minHeight: 120,
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: 1.5,
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
              onBlur={(e) => e.target.style.borderColor = theme.colors.surfaceElevated}
              required
            />
          </div>
        </div>

        <div style={{ 
          display: "flex", 
          gap: 12, 
          justifyContent: "flex-end",
          marginTop: 8
        }}>
          <button 
            type="button" 
            onClick={handleFormCancel} 
            style={{ 
              padding: "12px 24px", 
              borderRadius: theme.borderRadius.lg, 
              border: `2px solid ${theme.colors.surfaceElevated}`, 
              background: theme.colors.surface, 
              color: theme.colors.text.secondary, 
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.colors.background;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = theme.colors.surface;
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={{ 
              padding: "12px 24px", 
              borderRadius: theme.borderRadius.lg, 
              border: "none", 
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)`, 
              color: "#fff", 
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: theme.shadows.md,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = theme.shadows.lg;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = theme.shadows.md;
            }}
          >
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
}

function App() {
  const [notes, setNotes] = useState([
    {
      title: "The Power of Habit - Key Insights",
      date: "2024-01-15",
      color: theme.colors.noteColors[0],
      category: "Book Notes",
      items: [
        "Habits are formed through a neurological loop: cue, routine, reward",
        "Changing habits requires identifying the cue and reward, then changing the routine",
        "Keystone habits can trigger positive changes in other areas of life",
        "Willpower is like a muscle that can be strengthened through practice",
        "Small wins can create momentum for larger changes"
      ],
    },
    {
      title: "Atomic Habits - Daily Reflections",
      date: "2024-01-14",
      color: theme.colors.noteColors[1],
      category: "Reading Log",
      items: [
        "1% better every day compounds to remarkable results over time",
        "Focus on systems, not goals",
        "The Four Laws: Make it obvious, attractive, easy, and satisfying",
        "Environment design is crucial for habit formation"
      ],
    },
    {
      title: "Favorite Quotes from Sapiens",
      date: "2024-01-13",
      color: theme.colors.noteColors[2],
      category: "Quotes",
      items: [
        '"The real difference between us and chimpanzees is the mysterious glue that enables millions of humans to cooperate effectively."',
        '"How do you cause people to believe in an imagined order such as Christianity, democracy, or capitalism?"',
        '"History is something that very few people have been doing while everyone else was plowing fields and carrying water buckets."'
      ],
    },
    {
      title: "Reading Goals for 2024",
      date: "2024-01-12",
      color: theme.colors.noteColors[3],
      category: "Planning",
      items: [
        "Read 24 books this year (2 per month)",
        "Focus on: Psychology, History, Science Fiction",
        "Take detailed notes on key insights",
        "Join a book club for accountability",
        "Write monthly reading summaries"
      ],
    }
  ]);

  const [activeCategory, setActiveCategory] = useState("currently");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    color: theme.colors.noteColors[0],
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
      {
        title: form.title,
        date: form.date,
        color: form.color,
        category: "Reading Notes",
        items: form.items.split("\n").filter(Boolean),
      },
      ...notes
    ]);
    
    setForm({ 
      title: "", 
      date: new Date().toISOString().split('T')[0], 
      color: theme.colors.noteColors[0], 
      items: "" 
    });
    setShowForm(false);
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setForm({ 
      title: "", 
      date: new Date().toISOString().split('T')[0], 
      color: theme.colors.noteColors[0], 
      items: "" 
    });
  };

  return (
    <div style={{
      display: "flex",
      background: theme.colors.background,
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      color: theme.colors.text.primary
    }}>
      <Sidebar 
        onCreateNote={handleCreateNote} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <main style={{
        flex: 1,
        padding: "40px 48px",
        background: theme.colors.background,
        overflow: "auto"
      }}>
        <CreateNoteModal
          showForm={showForm}
          form={form}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          handleFormCancel={handleFormCancel}
        />
        
        <NoteList notes={notes} activeCategory={activeCategory} />
        <QuickStats />
      </main>
    </div>
  );
}

export default App;
