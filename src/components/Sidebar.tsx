import React from "react";

interface SidebarProps {
  onCreateNote: () => void;
  theme: 'light' | 'dark';
}

const Sidebar: React.FC<SidebarProps> = ({ onCreateNote, theme }) => {
  const sidebarBg = theme === "dark" ? "#1a1a1a" : "#fff";
  const sidebarBorder = theme === "dark" ? "#333" : "#f0f0f0";
  const textColor = theme === "dark" ? "#fff" : "#222";
  const secondaryTextColor = theme === "dark" ? "#999" : "#888";

  const folders = [
    { abbr: "O", name: "Ongoing" },
    { abbr: "R", name: "Reading" },
    { abbr: "W", name: "Watching" },
    { abbr: "L", name: "Listening" },
    { abbr: "P", name: "Personal" },
    { abbr: "W", name: "Work" },
    { abbr: "P", name: "Projects" },
    { abbr: "B", name: "Books" },
  ];

  return (
    <aside
      style={{
        width: 260,
        background: sidebarBg,
        borderRight: `1px solid ${sidebarBorder}`,
        padding: "32px 0 24px 0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
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
              background: "linear-gradient(135deg, #c1ff72 60%, #1e2d1f 100%)",
              marginRight: 12,
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: textColor }}>
              Syncscribe
            </div>
            <div style={{ fontSize: 12, color: secondaryTextColor }}>Meet Desai</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1 }}>
        <div style={{ padding: "0 32px" }}>
          <button
            style={{
              width: "100%",
              background: theme === "dark" ? "#333" : "#222",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 0",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.3s ease",
            }}
            onClick={onCreateNote}
          >
            <span>＋</span> Create Note
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 32,
            }}
          >
            <span style={{ color: textColor, fontWeight: 500, cursor: "pointer" }}>
              🔍 Search
            </span>
            <span style={{ color: textColor, fontWeight: 500, cursor: "pointer" }}>
              🗄️ Archives
            </span>
          </div>
          <div>
            <div
              style={{
                color: secondaryTextColor,
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 8,
              }}
            >
              Folders
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {folders.map((f, index) => (
                <span
                  key={index}
                  style={{
                    color: textColor,
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    padding: "2px 0",
                  }}
                >
                  {f.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ padding: "0 32px", marginTop: 32 }}>
        <div
          style={{
            color: secondaryTextColor,
            fontSize: 14,
            marginBottom: 8,
            cursor: "pointer",
          }}
        >
          ⚙️ Settings
        </div>
        <div
          style={{
            color: secondaryTextColor,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ❓ Help
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 