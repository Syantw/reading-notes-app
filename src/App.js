import { useState, useEffect } from "react";

// 设计系统配置
const theme = {
  colors: {
    primary: "#6366f1",
    primaryHover: "#5855eb",
    secondary: "#f1f5f9",
    accent: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    background: {
      primary: "rgba(248, 250, 252, 0.95)",
      glass: "rgba(255, 255, 255, 0.25)",
      glassHover: "rgba(255, 255, 255, 0.35)",
      sidebar: "rgba(255, 255, 255, 0.8)",
      overlay: "rgba(0, 0, 0, 0.3)",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      muted: "#94a3b8",
    },
    border: {
      light: "rgba(226, 232, 240, 0.6)",
      medium: "rgba(203, 213, 225, 0.8)",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  },
  gradients: {
    primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    card: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    noteColors: [
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)",
      "linear-gradient(135deg, #ffd3a5 0%, #fd9853 100%)",
      "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)",
    ],
  },
  animation: {
    fast: "0.15s ease-out",
    normal: "0.25s ease-out",
    slow: "0.35s ease-out",
  },
};

const folders = [
  { abbr: "On", name: "Ongoing", color: "#10b981", icon: "📚" },
  { abbr: "Re", name: "Reading", color: "#6366f1", icon: "📖" },
  { abbr: "Wa", name: "Watching", color: "#f59e0b", icon: "🎬" },
  { abbr: "Li", name: "Listening", color: "#ef4444", icon: "🎵" },
  { abbr: "Co", name: "Completed", color: "#8b5cf6", icon: "✅" },
  { abbr: "Ar", name: "Archived", color: "#64748b", icon: "📦" },
];

// 玻璃态效果样式
const glassStyle = {
  background: theme.colors.background.glass,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${theme.colors.border.light}`,
  boxShadow: theme.shadows.glass,
};

function Sidebar({
  onCreateNote,
  selectedFolder,
  onFolderSelect,
  searchQuery,
  onSearchChange,
  notesCount,
}) {
  const [hoveredFolder, setHoveredFolder] = useState(null);

  return (
    <aside
      style={{
        width: 280,
        background: theme.colors.background.sidebar,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: `1px solid ${theme.colors.border.light}`,
        padding: "32px 0 24px 0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        boxSizing: "border-box",
        transition: `all ${theme.animation.normal}`,
      }}
    >
      {/* Header */}
      <div style={{ padding: "0 24px", marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: theme.gradients.primary,
              marginRight: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              boxShadow: theme.shadows.md,
            }}
          >
            📝
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: theme.colors.text.primary,
                marginBottom: 2,
              }}
            >
              Reading Notes
            </div>
            <div
              style={{
                fontSize: 12,
                color: theme.colors.text.muted,
              }}
            >
              {notesCount} notes total
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Button */}
      <div style={{ padding: "0 24px", marginBottom: 24 }}>
        <button
          onClick={onCreateNote}
          style={{
            width: "100%",
            background: theme.gradients.primary,
            color: "#fff",
            border: "none",
            borderRadius: 16,
            padding: "16px 0",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: theme.shadows.md,
            transition: `all ${theme.animation.normal}`,
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = theme.shadows.lg;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = theme.shadows.md;
          }}
        >
          <span style={{ fontSize: 18 }}>＋</span> Create Note
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: "0 24px", marginBottom: 24 }}>
        <div
          style={{
            ...glassStyle,
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16, color: theme.colors.text.secondary }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              flex: 1,
              fontSize: 14,
              color: theme.colors.text.primary,
              fontWeight: 500,
            }}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 24px" }}>
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              color: theme.colors.text.secondary,
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Categories
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {folders.map((folder) => (
              <div
                key={folder.abbr}
                onClick={() => onFolderSelect(folder.name)}
                onMouseEnter={() => setHoveredFolder(folder.abbr)}
                onMouseLeave={() => setHoveredFolder(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: `all ${theme.animation.fast}`,
                  background:
                    selectedFolder === folder.name
                      ? theme.colors.background.glass
                      : hoveredFolder === folder.abbr
                        ? theme.colors.background.glassHover
                        : "transparent",
                  backdropFilter:
                    selectedFolder === folder.name ||
                    hoveredFolder === folder.abbr
                      ? "blur(8px)"
                      : "none",
                  border:
                    selectedFolder === folder.name
                      ? `1px solid ${theme.colors.border.medium}`
                      : "1px solid transparent",
                  transform:
                    hoveredFolder === folder.abbr
                      ? "translateX(4px)"
                      : "translateX(0)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: folder.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    boxShadow: theme.shadows.sm,
                  }}
                >
                  {folder.icon}
                </div>
                <span
                  style={{
                    color: theme.colors.text.primary,
                    fontWeight: selectedFolder === folder.name ? 600 : 500,
                    fontSize: 15,
                  }}
                >
                  {folder.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              color: theme.colors.text.secondary,
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Quick Actions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 16px",
                borderRadius: 8,
                cursor: "pointer",
                transition: `all ${theme.animation.fast}`,
                color: theme.colors.text.secondary,
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.colors.background.glassHover;
                e.target.style.color = theme.colors.text.primary;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = theme.colors.text.secondary;
              }}
            >
              <span>🗄️</span> Archives
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 16px",
                borderRadius: 8,
                cursor: "pointer",
                transition: `all ${theme.animation.fast}`,
                color: theme.colors.text.secondary,
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.colors.background.glassHover;
                e.target.style.color = theme.colors.text.primary;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = theme.colors.text.secondary;
              }}
            >
              <span>⚙️</span> Settings
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div style={{ padding: "0 24px" }}>
        <div
          style={{
            ...glassStyle,
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: theme.colors.text.muted,
              marginBottom: 4,
            }}
          >
            Made with ❤️
          </div>
          <div
            style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
              fontWeight: 500,
            }}
          >
            Reading Notes v1.0
          </div>
        </div>
      </div>
    </aside>
  );
}

function NoteCard({ note, index, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background:
          theme.gradients.noteColors[index % theme.gradients.noteColors.length],
        borderRadius: 20,
        boxShadow: isHovered ? theme.shadows.xl : theme.shadows.md,
        padding: "24px 20px 20px 20px",
        minWidth: 240,
        maxWidth: 280,
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: `all ${theme.animation.normal}`,
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${theme.colors.border.light}`,
        cursor: "pointer",
      }}
    >
      {/* Note Header */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: theme.colors.text.primary,
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {note.title}
        </div>
        {note.date && (
          <div
            style={{
              fontSize: 12,
              color: theme.colors.text.secondary,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>📅</span> {note.date}
          </div>
        )}
      </div>

      {/* Note Content */}
      <div style={{ flex: 1, marginBottom: 16 }}>
        <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
          {note.items.slice(0, 3).map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: 14,
                color: theme.colors.text.primary,
                marginBottom: 8,
                lineHeight: 1.4,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span
                style={{
                  color: theme.colors.accent,
                  fontWeight: 600,
                  minWidth: 4,
                  marginTop: 4,
                }}
              >
                •
              </span>
              <span style={{ flex: 1 }}>{item}</span>
            </li>
          ))}
          {note.items.length > 3 && (
            <li
              style={{
                fontSize: 12,
                color: theme.colors.text.muted,
                fontStyle: "italic",
                marginLeft: 12,
              }}
            >
              +{note.items.length - 3} more items...
            </li>
          )}
        </ul>
      </div>

      {/* Note Actions */}
      <div
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          display: "flex",
          gap: 8,
          opacity: isHovered ? 1 : 0.6,
          transition: `opacity ${theme.animation.fast}`,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(note);
          }}
          style={{
            background: theme.colors.background.glass,
            border: `1px solid ${theme.colors.border.light}`,
            borderRadius: 8,
            padding: 8,
            cursor: "pointer",
            fontSize: 16,
            color: theme.colors.accent,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: `all ${theme.animation.fast}`,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = theme.colors.background.glassHover;
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = theme.colors.background.glass;
            e.target.style.transform = "scale(1)";
          }}
          title="Edit Note"
        >
          ✎
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note);
          }}
          style={{
            background: theme.colors.background.glass,
            border: `1px solid ${theme.colors.border.light}`,
            borderRadius: 8,
            padding: 8,
            cursor: "pointer",
            fontSize: 16,
            color: theme.colors.error,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: `all ${theme.animation.fast}`,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = theme.colors.background.glassHover;
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = theme.colors.background.glass;
            e.target.style.transform = "scale(1)";
          }}
          title="Delete Note"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

function NoteList({
  filteredNotes,
  selectedFilter,
  onFilterChange,
  onEditNote,
  onDeleteNote,
}) {
  const filters = ["All", "Today", "This Week", "This Month"];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
          marginTop: 8,
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 32,
              color: theme.colors.text.primary,
              margin: 0,
              marginBottom: 4,
            }}
          >
            My Notes
          </h2>
          <p
            style={{
              color: theme.colors.text.secondary,
              fontSize: 16,
              margin: 0,
            }}
          >
            {filteredNotes.length} notes found
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            ...glassStyle,
            borderRadius: 16,
            padding: 6,
            display: "flex",
            gap: 4,
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              style={{
                background:
                  selectedFilter === filter
                    ? theme.colors.background.glass
                    : "transparent",
                border:
                  selectedFilter === filter
                    ? `1px solid ${theme.colors.border.medium}`
                    : "1px solid transparent",
                borderRadius: 12,
                padding: "8px 16px",
                fontWeight: selectedFilter === filter ? 600 : 500,
                color:
                  selectedFilter === filter
                    ? theme.colors.text.primary
                    : theme.colors.text.secondary,
                cursor: "pointer",
                fontSize: 14,
                transition: `all ${theme.animation.fast}`,
                backdropFilter:
                  selectedFilter === filter ? "blur(8px)" : "none",
                WebkitBackdropFilter:
                  selectedFilter === filter ? "blur(8px)" : "none",
              }}
              onMouseEnter={(e) => {
                if (selectedFilter !== filter) {
                  e.target.style.background =
                    theme.colors.background.glassHover;
                  e.target.style.color = theme.colors.text.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedFilter !== filter) {
                  e.target.style.background = "transparent";
                  e.target.style.color = theme.colors.text.secondary;
                }
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 24,
          marginBottom: 48,
        }}
      >
        {filteredNotes.map((note, idx) => (
          <NoteCard
            key={`${note.title}-${idx}`}
            note={note}
            index={idx}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div
          style={{
            ...glassStyle,
            borderRadius: 20,
            padding: "48px 32px",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
          <h3
            style={{
              fontWeight: 600,
              fontSize: 20,
              color: theme.colors.text.primary,
              marginBottom: 8,
            }}
          >
            No notes found
          </h3>
          <p
            style={{
              color: theme.colors.text.secondary,
              fontSize: 16,
              margin: 0,
            }}
          >
            Create your first note to get started!
          </p>
        </div>
      )}
    </div>
  );
}

function RecentFolders({ selectedFolder, onFolderSelect }) {
  const [hoveredFolder, setHoveredFolder] = useState(null);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: theme.colors.text.primary,
            margin: 0,
          }}
        >
          Categories
        </h3>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 20,
        }}
      >
        {folders.map((folder) => (
          <div
            key={folder.abbr}
            onClick={() => onFolderSelect(folder.name)}
            onMouseEnter={() => setHoveredFolder(folder.abbr)}
            onMouseLeave={() => setHoveredFolder(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              transition: `all ${theme.animation.normal}`,
              transform:
                hoveredFolder === folder.abbr
                  ? "translateY(-4px)"
                  : "translateY(0)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 64,
                background:
                  selectedFolder === folder.name
                    ? folder.color
                    : theme.colors.background.glass,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                marginBottom: 12,
                boxShadow:
                  hoveredFolder === folder.abbr
                    ? theme.shadows.lg
                    : theme.shadows.md,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border:
                  selectedFolder === folder.name
                    ? `2px solid ${folder.color}`
                    : `1px solid ${theme.colors.border.light}`,
                transition: `all ${theme.animation.normal}`,
              }}
            >
              {folder.icon}
            </div>
            <div
              style={{
                fontSize: 14,
                color:
                  selectedFolder === folder.name
                    ? theme.colors.text.primary
                    : theme.colors.text.secondary,
                fontWeight: selectedFolder === folder.name ? 600 : 500,
                textAlign: "center",
                transition: `all ${theme.animation.fast}`,
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

function NoteForm({
  showForm,
  form,
  onFormChange,
  onFormSubmit,
  onFormCancel,
  isEditing = false,
}) {
  if (!showForm) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: theme.colors.background.overlay,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-out",
      }}
      onClick={onFormCancel}
    >
      <form
        onSubmit={onFormSubmit}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...glassStyle,
          borderRadius: 24,
          padding: 32,
          minWidth: 400,
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          animation: "slideUp 0.3s ease-out",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h2
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 24,
              color: theme.colors.text.primary,
              marginBottom: 8,
            }}
          >
            {isEditing ? "Edit Note" : "Create New Note"}
          </h2>
          <p
            style={{
              margin: 0,
              color: theme.colors.text.secondary,
              fontSize: 16,
            }}
          >
            {isEditing
              ? "Update your note details"
              : "Add a new note to your collection"}
          </p>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
              color: theme.colors.text.primary,
              fontSize: 14,
            }}
          >
            Title *
          </label>
          <input
            name="title"
            placeholder="Enter note title..."
            value={form.title}
            onChange={onFormChange}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: `1px solid ${theme.colors.border.light}`,
              background: theme.colors.background.glass,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontSize: 16,
              color: theme.colors.text.primary,
              outline: "none",
              transition: `all ${theme.animation.fast}`,
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primary;
              e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.colors.border.light;
              e.target.style.boxShadow = "none";
            }}
            required
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
              color: theme.colors.text.primary,
              fontSize: 14,
            }}
          >
            Date
          </label>
          <input
            name="date"
            type="date"
            placeholder="Select date..."
            value={form.date}
            onChange={onFormChange}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: `1px solid ${theme.colors.border.light}`,
              background: theme.colors.background.glass,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontSize: 16,
              color: theme.colors.text.primary,
              outline: "none",
              transition: `all ${theme.animation.fast}`,
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primary;
              e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.colors.border.light;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
              color: theme.colors.text.primary,
              fontSize: 14,
            }}
          >
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={onFormChange}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: `1px solid ${theme.colors.border.light}`,
              background: theme.colors.background.glass,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontSize: 16,
              color: theme.colors.text.primary,
              outline: "none",
              transition: `all ${theme.animation.fast}`,
              boxSizing: "border-box",
              cursor: "pointer",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primary;
              e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.colors.border.light;
              e.target.style.boxShadow = "none";
            }}
          >
            {folders.map((folder) => (
              <option key={folder.name} value={folder.name}>
                {folder.icon} {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
              color: theme.colors.text.primary,
              fontSize: 14,
            }}
          >
            Content *
          </label>
          <textarea
            name="items"
            placeholder="Enter your notes here... (One item per line)"
            value={form.items}
            onChange={onFormChange}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: `1px solid ${theme.colors.border.light}`,
              background: theme.colors.background.glass,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontSize: 16,
              color: theme.colors.text.primary,
              outline: "none",
              transition: `all ${theme.animation.fast}`,
              boxSizing: "border-box",
              minHeight: 120,
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primary;
              e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.colors.border.light;
              e.target.style.boxShadow = "none";
            }}
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
            marginTop: 8,
          }}
        >
          <button
            type="button"
            onClick={onFormCancel}
            style={{
              padding: "12px 24px",
              borderRadius: 12,
              border: `1px solid ${theme.colors.border.light}`,
              background: theme.colors.background.glass,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: theme.colors.text.secondary,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 16,
              transition: `all ${theme.animation.fast}`,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.colors.background.glassHover;
              e.target.style.color = theme.colors.text.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = theme.colors.background.glass;
              e.target.style.color = theme.colors.text.secondary;
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
              background: theme.gradients.primary,
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 16,
              boxShadow: theme.shadows.md,
              transition: `all ${theme.animation.fast}`,
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
            {isEditing ? "Update Note" : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
}

function App() {
  // State management
  const [notes, setNotes] = useState([
    {
      title: "React Learning Progress",
      date: "2024-01-15",
      category: "Reading",
      items: [
        "Completed React Hooks tutorial",
        "Built a todo app with useState",
        "Learning about useEffect patterns",
        "Next: Context API and useReducer",
      ],
    },
    {
      title: "Book: Atomic Habits",
      date: "2024-01-14",
      category: "Reading",
      items: [
        "Chapter 1-3: The fundamentals of habits",
        "Key insight: 1% better every day",
        "Habit stacking technique",
        "Environmental design matters",
      ],
    },
    {
      title: "Movie: Inception Analysis",
      date: "2024-01-13",
      category: "Watching",
      items: [
        "Dream within dream concept",
        "Symbolism of spinning top",
        "Character development analysis",
        "Director's storytelling techniques",
      ],
    },
    {
      title: "Podcast: JavaScript Jabber",
      date: "2024-01-12",
      category: "Listening",
      items: [
        "Episode on React 18 features",
        "Discussion about Concurrent Mode",
        "Performance optimization tips",
        "Community Q&A session",
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    category: folders[0].name,
    items: "",
  });

  // Filter notes based on selected folder and search query
  const filteredNotes = notes.filter((note) => {
    const matchesFolder =
      selectedFolder === "All" || note.category === selectedFolder;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.items.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesFolder && matchesSearch;
  });

  // Event handlers
  const handleCreateNote = () => {
    setEditingNote(null);
    setForm({
      title: "",
      date: new Date().toISOString().split("T")[0],
      category: selectedFolder !== "All" ? selectedFolder : folders[0].name,
      items: "",
    });
    setShowForm(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setForm({
      title: note.title,
      date: note.date,
      category: note.category,
      items: note.items.join("\n"),
    });
    setShowForm(true);
  };

  const handleDeleteNote = (noteToDelete) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note) => note !== noteToDelete));
    }
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
      category: form.category,
      items: form.items.split("\n").filter(Boolean),
    };

    if (editingNote) {
      // Update existing note
      setNotes(notes.map((note) => (note === editingNote ? newNote : note)));
    } else {
      // Add new note
      setNotes([newNote, ...notes]);
    }

    handleFormCancel();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingNote(null);
    setForm({
      title: "",
      date: "",
      category: folders[0].name,
      items: "",
    });
  };

  const handleFolderSelect = (folderName) => {
    setSelectedFolder(folderName);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Implement filter logic here based on dates
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to { 
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        background: theme.colors.background.primary,
        minHeight: "100vh",
        fontFamily:
          "'Inter', 'SF Pro Display', 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
        position: "relative",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
          `,
          zIndex: -1,
        }}
      />

      <Sidebar
        onCreateNote={handleCreateNote}
        selectedFolder={selectedFolder}
        onFolderSelect={handleFolderSelect}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        notesCount={notes.length}
      />

      <main
        style={{
          flex: 1,
          padding: "48px 48px 0 48px",
          background: "transparent",
          overflow: "auto",
        }}
      >
        <NoteList
          filteredNotes={filteredNotes}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
        <RecentFolders
          selectedFolder={selectedFolder}
          onFolderSelect={handleFolderSelect}
        />
      </main>

      <NoteForm
        showForm={showForm}
        form={form}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
        onFormCancel={handleFormCancel}
        isEditing={!!editingNote}
      />
    </div>
  );
}

export default App;
