import React, { useState } from "react";

// 优化的阅读笔记主题色彩方案
const sidebarBg = "#fefefe";
const sidebarBorder = "#e8e8e8";
const mainBg = "#f8f9fb";
const cardShadow = "0 4px 12px rgba(0,0,0,0.06)";
// 更温暖的阅读笔记色彩
const noteColors = [
  "#fff4e6", // 温暖的米色 - 书页色
  "#f0f8ff", // 浅蓝色 - 清新阅读
  "#f5fff5", // 浅绿色 - 护眼色
  "#fdf0f7", // 浅粉色 - 温和感
  "#fffacd", // 柠檬色 - 重点标记
];
const folderColor = "#d4a574"; // 更像书本的棕色
const accentColor = "#8b4513"; // 书本棕色作为主色调

// 针对阅读笔记的文件夹分类
const folders = [
  { abbr: "📚", name: "Currently Reading", color: "#ff6b6b" },
  { abbr: "📖", name: "To Read", color: "#4ecdc4" },
  { abbr: "📝", name: "Reading Notes", color: "#45b7d1" },
  { abbr: "💡", name: "Insights", color: "#f9ca24" },
  { abbr: "📑", name: "Quotes", color: "#f0932b" },
  { abbr: "🎧", name: "Audiobooks", color: "#eb4d4b" },
  { abbr: "📺", name: "Documentaries", color: "#6c5ce7" },
  { abbr: "✍️", name: "Book Reviews", color: "#a29bfe" },
];

function Sidebar({ onCreateNote }) {
  return (
    <aside
      style={{
        width: 280,
        background: sidebarBg,
        borderRight: `1px solid ${sidebarBorder}`,
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* 品牌区域 - 突出阅读笔记主题 */}
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
              borderRadius: "12px",
              background: "linear-gradient(135deg, #8b4513 0%, #d2691e 100%)",
              marginRight: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            📚
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 20, color: accentColor }}>
              ReadingNotes
            </div>
            <div style={{ fontSize: 13, color: "#666", fontStyle: "italic" }}>
              Knowledge Keeper
            </div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <div style={{ padding: "0 24px" }}>
          {/* 创建笔记按钮 */}
          <button
            style={{
              width: "100%",
              background: `linear-gradient(135deg, ${accentColor} 0%, #d2691e 100%)`,
              color: "#fff",
              border: "none",
              borderRadius: 16,
              padding: "14px 0",
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 24,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: "0 4px 12px rgba(139, 69, 19, 0.3)",
              transition: "all 0.2s ease",
            }}
            onClick={onCreateNote}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 6px 16px rgba(139, 69, 19, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(139, 69, 19, 0.3)";
            }}
          >
            <span style={{ fontSize: "18px" }}>📝</span> Add Reading Note
          </button>

          {/* 快捷操作 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              color: "#444", 
              fontWeight: 500, 
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: 8,
              transition: "background 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
            onMouseOut={(e) => e.target.style.background = "transparent"}
            >
              <span style={{ marginRight: 12, fontSize: 16 }}>🔍</span>
              Search Notes
            </div>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              color: "#444", 
              fontWeight: 500, 
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: 8,
              transition: "background 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
            onMouseOut={(e) => e.target.style.background = "transparent"}
            >
              <span style={{ marginRight: 12, fontSize: 16 }}>📋</span>
              Reading List
            </div>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              color: "#444", 
              fontWeight: 500, 
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: 8,
              transition: "background 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
            onMouseOut={(e) => e.target.style.background = "transparent"}
            >
              <span style={{ marginRight: 12, fontSize: 16 }}>⭐</span>
              Favorites
            </div>
          </div>

          {/* 分类文件夹 */}
          <div>
            <div
              style={{
                color: "#888",
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 16,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Categories
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {folders.map((folder, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#444",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    padding: "10px 12px",
                    borderRadius: 10,
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = folder.color + "15";
                    e.target.style.transform = "translateX(4px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ marginRight: 12, fontSize: 16 }}>
                    {folder.abbr}
                  </span>
                  {folder.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 底部设置 */}
      <div style={{ padding: "0 24px", marginTop: 32, borderTop: "1px solid #f0f0f0", paddingTop: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#888",
            fontSize: 14,
            marginBottom: 12,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: 8,
            transition: "background 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
          onMouseOut={(e) => e.target.style.background = "transparent"}
        >
          <span style={{ marginRight: 12 }}>⚙️</span>
          Settings
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#888",
            fontSize: 14,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: 8,
            transition: "background 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
          onMouseOut={(e) => e.target.style.background = "transparent"}
        >
          <span style={{ marginRight: 12 }}>❓</span>
          Help & Tips
        </div>
      </div>
    </aside>
  );
}

function NoteList({ notes }) {
  return (
    <div>
      {/* 标题区域优化 */}
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
            color: accentColor, 
            margin: 0,
            marginBottom: 4
          }}>
            My Reading Notes
          </h1>
          <p style={{ 
            color: "#666", 
            fontSize: 16, 
            margin: 0,
            fontStyle: "italic"
          }}>
            Capture insights, track progress, and build knowledge
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "#fff",
            borderRadius: 16,
            padding: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #e8e8e8"
          }}
        >
          <button
            style={{
              background: accentColor,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "8px 20px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Today
          </button>
          <button
            style={{
              background: "transparent",
              border: "none",
              borderRadius: 12,
              padding: "8px 20px",
              fontWeight: 500,
              color: "#666",
              cursor: "pointer",
            }}
          >
            This Week
          </button>
          <button
            style={{
              background: "transparent",
              border: "none",
              borderRadius: 12,
              padding: "8px 20px",
              fontWeight: 500,
              color: "#666",
              cursor: "pointer",
            }}
          >
            All Time
          </button>
        </div>
      </div>

      {/* 笔记卡片网格 */}
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
              borderRadius: 20,
              boxShadow: cardShadow,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.8)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = cardShadow;
            }}
          >
            {/* 笔记类型标签 */}
            <div style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.9)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 600,
              color: accentColor
            }}>
              📚 Reading
            </div>

            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#333",
                marginBottom: 8,
                lineHeight: 1.3,
              }}
            >
              {note.title}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#888",
                marginBottom: 16,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <span>📅</span>
              {note.date}
            </div>
            <div style={{ flex: 1 }}>
              {note.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 14,
                    color: "#444",
                    marginBottom: 8,
                    lineHeight: 1.5,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8
                  }}
                >
                  <span style={{ color: accentColor, fontWeight: 600 }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.6)"
            }}>
              <span style={{ fontSize: 12, color: "#888" }}>
                {note.items.length} notes
              </span>
              <span
                style={{
                  fontSize: 20,
                  color: accentColor,
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: 6,
                  transition: "background 0.2s ease"
                }}
                title="Edit Note"
                onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.8)"}
                onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                ✏️
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentFolders() {
  return (
    <div>
      {/* 最近文件夹标题优化 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            fontWeight: 700, 
            fontSize: 24, 
            color: accentColor, 
            margin: 0,
            marginBottom: 4
          }}>
            Reading Categories
          </h2>
          <p style={{ 
            color: "#666", 
            fontSize: 14, 
            margin: 0,
            fontStyle: "italic"
          }}>
            Organize your reading journey
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "#fff",
            borderRadius: 12,
            padding: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <button
            style={{
              background: accentColor,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "6px 16px",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            All
          </button>
          <button
            style={{
              background: "transparent",
              border: "none",
              borderRadius: 8,
              padding: "6px 16px",
              fontWeight: 500,
              color: "#666",
              cursor: "pointer",
            }}
          >
            Recent
          </button>
          <button
            style={{
              background: "transparent",
              border: "none",
              borderRadius: 8,
              padding: "6px 16px",
              fontWeight: 500,
              color: "#666",
              cursor: "pointer",
            }}
          >
            Favorites
          </button>
        </div>
      </div>
      
      {/* 分类卡片网格 */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", 
        gap: 20,
        maxWidth: "800px"
      }}>
        {folders.slice(0, 6).map((folder, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px 16px",
              background: "#fff",
              borderRadius: 16,
              boxShadow: cardShadow,
              border: "1px solid #f0f0f0",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
              e.currentTarget.style.borderColor = folder.color;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = cardShadow;
              e.currentTarget.style.borderColor = "#f0f0f0";
            }}
          >
            <div
              style={{
                width: 64,
                height: 56,
                background: `linear-gradient(135deg, ${folder.color}20 0%, ${folder.color}40 100%)`,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                marginBottom: 12,
                border: `2px solid ${folder.color}30`,
              }}
            >
              {folder.abbr}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#333",
                fontWeight: 600,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {folder.name}
            </div>
            <div style={{
              fontSize: 12,
              color: "#888",
              marginTop: 4,
              textAlign: "center"
            }}>
              {Math.floor(Math.random() * 20) + 1} items
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
      title: "《原子习惯》读书笔记",
      date: "2025-06-27",
      color: noteColors[0],
      items: [
        "习惯是复利的体现，微小的改变会产生巨大的影响",
        "专注于系统而不是目标，系统是达成目标的方法",
        "环境设计比意志力更重要",
        "身份认同的改变是习惯形成的根本"
      ],
    },
    {
      title: "《深度工作》核心要点",
      date: "2025-06-26",
      color: noteColors[1],
      items: [
        "深度工作能力是信息时代的超能力",
        "消除干扰源，创造专注的工作环境",
        "设定明确的深度工作时间块",
        "训练专注力，就像训练肌肉一样"
      ],
    },
    {
      title: "效率方法论思考",
      date: "2025-06-25",
      color: noteColors[2],
      items: [
        "时间管理的本质是精力管理",
        "番茄工作法适合需要专注的任务",
        "Getting Things Done (GTD) 清空大脑负担",
        "定期回顾和调整工作方法"
      ],
    },
    {
      title: "技术学习笔记",
      date: "2025-06-24",
      color: noteColors[3],
      items: [
        "React Hooks 提供了更简洁的状态管理方式",
        "TypeScript 能够提前发现潜在的类型错误",
        "学习新技术要结合实际项目练习",
        "保持对新技术的好奇心和学习热情"
      ],
    },
    {
      title: "个人成长感悟",
      date: "2025-06-23",
      color: noteColors[4],
      items: [
        "持续学习是保持竞争力的关键",
        "记录和分享能够加深理解",
        "建立知识体系比零散学习更有效",
        "定期复习笔记，让知识真正成为自己的"
      ],
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
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
        date: form.date || new Date().toISOString().split('T')[0],
        color: form.color,
        items: form.items.split("\n").filter(Boolean),
      },
    ]);
    setForm({ title: "", date: "", color: noteColors[0], items: "" });
    setShowForm(false);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setForm({ title: "", date: "", color: noteColors[0], items: "" });
  };

  return (
    <div
      style={{
        display: "flex",
        background: mainBg,
        minHeight: "100vh",
        fontFamily:
          "'Inter', 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      }}
    >
      <Sidebar onCreateNote={handleCreateNote} />
      <main
        style={{
          flex: 1,
          padding: "40px 48px",
          background: mainBg,
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
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                padding: 40,
                minWidth: 480,
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                border: "1px solid #f0f0f0",
              }}
              onSubmit={handleFormSubmit}
            >
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: "1px solid #f0f0f0"
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${accentColor} 0%, #d2691e 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginRight: 16
                }}>
                  📝
                </div>
                <div>
                  <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, color: accentColor }}>
                    New Reading Note
                  </h2>
                  <p style={{ margin: 0, color: "#666", fontSize: 14, marginTop: 4 }}>
                    Capture your reading insights and thoughts
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ 
                    display: "block", 
                    fontSize: 14, 
                    fontWeight: 600, 
                    color: "#333", 
                    marginBottom: 8 
                  }}>
                    📚 Title *
                  </label>
                  <input
                    name="title"
                    placeholder="e.g., 《原子习惯》第三章笔记"
                    value={form.title}
                    onChange={handleFormChange}
                    style={{ 
                      padding: "12px 16px", 
                      borderRadius: 12, 
                      border: "2px solid #f0f0f0",
                      width: "100%",
                      fontSize: 16,
                      fontFamily: "inherit",
                      transition: "border-color 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = accentColor}
                    onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                    required
                  />
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: 14, 
                      fontWeight: 600, 
                      color: "#333", 
                      marginBottom: 8 
                    }}>
                      📅 Date
                    </label>
                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleFormChange}
                      style={{ 
                        padding: "12px 16px", 
                        borderRadius: 12, 
                        border: "2px solid #f0f0f0",
                        width: "100%",
                        fontSize: 16,
                        fontFamily: "inherit",
                        outline: "none"
                      }}
                      onFocus={(e) => e.target.style.borderColor = accentColor}
                      onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: 14, 
                      fontWeight: 600, 
                      color: "#333", 
                      marginBottom: 8 
                    }}>
                      🎨 Note Color
                    </label>
                    <select
                      name="color"
                      value={form.color}
                      onChange={handleFormChange}
                      style={{ 
                        padding: "12px 16px", 
                        borderRadius: 12, 
                        border: "2px solid #f0f0f0",
                        width: "100%",
                        fontSize: 16,
                        fontFamily: "inherit",
                        outline: "none",
                        background: "#fff"
                      }}
                      onFocus={(e) => e.target.style.borderColor = accentColor}
                      onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                    >
                      <option value={noteColors[0]}>📄 Warm Beige</option>
                      <option value={noteColors[1]}>🌊 Fresh Blue</option>
                      <option value={noteColors[2]}>🌱 Gentle Green</option>
                      <option value={noteColors[3]}>🌸 Soft Pink</option>
                      <option value={noteColors[4]}>⭐ Highlight Yellow</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: "block", 
                    fontSize: 14, 
                    fontWeight: 600, 
                    color: "#333", 
                    marginBottom: 8 
                  }}>
                    ✍️ Notes & Insights *
                  </label>
                  <textarea
                    name="items"
                    placeholder="Enter your notes, one insight per line...&#10;&#10;例如：&#10;习惯是复利的体现&#10;微小的改变会产生巨大的影响&#10;专注于系统而不是目标"
                    value={form.items}
                    onChange={handleFormChange}
                    style={{ 
                      padding: "16px", 
                      borderRadius: 12, 
                      border: "2px solid #f0f0f0",
                      width: "100%",
                      minHeight: 120,
                      fontSize: 16,
                      fontFamily: "inherit",
                      resize: "vertical",
                      lineHeight: 1.5,
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = accentColor}
                    onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                    required
                  />
                </div>
              </div>

              <div style={{ 
                display: "flex", 
                gap: 16, 
                justifyContent: "flex-end",
                marginTop: 8,
                paddingTop: 20,
                borderTop: "1px solid #f0f0f0"
              }}>
                <button 
                  type="button" 
                  onClick={handleFormCancel} 
                  style={{ 
                    padding: "12px 24px", 
                    borderRadius: 12, 
                    border: "2px solid #e0e0e0", 
                    background: "#fff", 
                    color: "#666", 
                    fontWeight: 600, 
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#f8f8f8";
                    e.target.style.borderColor = "#d0d0d0";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#fff";
                    e.target.style.borderColor = "#e0e0e0";
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ 
                    padding: "12px 32px", 
                    borderRadius: 12, 
                    border: "none", 
                    background: `linear-gradient(135deg, ${accentColor} 0%, #d2691e 100%)`, 
                    color: "#fff", 
                    fontWeight: 600, 
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 12px rgba(139, 69, 19, 0.3)"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 6px 16px rgba(139, 69, 19, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(139, 69, 19, 0.3)";
                  }}
                >
                  📚 Save Note
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
