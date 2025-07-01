import React from "react";

function NoteList({ notes, theme }) {
  const cardShadow = theme === "dark" 
    ? "0 2px 8px rgba(255,255,255,0.08)" 
    : "0 2px 8px rgba(0,0,0,0.04)";
  const textColor = theme === "dark" ? "#fff" : "#222";
  const secondaryTextColor = theme === "dark" ? "#ccc" : "#888";

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
          marginTop: 8,
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 24, color: textColor, flex: 1 }}>
          My Notes
        </h2>
        <div
          style={{
            display: "flex",
            gap: 8,
            background: theme === "dark" ? "#333" : "#f0f0f0",
            borderRadius: 12,
            padding: 4,
            transition: "background 0.3s ease",
          }}
        >
          <button
            style={{
              background: theme === "dark" ? "#555" : "#fff",
              border: "none",
              borderRadius: 8,
              padding: "6px 16px",
              fontWeight: 500,
              color: textColor,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Today
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              borderRadius: 8,
              padding: "6px 16px",
              fontWeight: 500,
              color: secondaryTextColor,
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
          >
            This Week
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              borderRadius: 8,
              padding: "6px 16px",
              fontWeight: 500,
              color: secondaryTextColor,
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
          >
            This Month
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
        {notes.map((note, idx) => (
          <div
            key={idx}
            style={{
              background: note.color,
              borderRadius: 18,
              boxShadow: cardShadow,
              padding: "20px 18px 18px 18px",
              minWidth: 220,
              maxWidth: 240,
              flex: "1 1 0",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#222",
                marginBottom: 8,
              }}
            >
              {note.title}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#666",
                marginBottom: 12,
                fontWeight: 500,
              }}
            >
              {note.time}
            </div>
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {note.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 14,
                    color: "#333",
                    marginBottom: 6,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <span
              style={{
                position: "absolute",
                right: 16,
                bottom: 12,
                fontSize: 18,
                color: "#7ed957",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              title="Edit"
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              ✎
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList; 