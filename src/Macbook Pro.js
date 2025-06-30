import React, { useState } from "react";

const sidebarBg = "#fff";
const sidebarBorder = "#f0f0f0";
const mainBg = "#f7f8fa";
const cardShadow = "0 2px 8px rgba(0,0,0,0.04)";
const noteColors = ["#e6e6fa", "#ffe4c4", "#e6ffe6", "#fff9e6"];
const folderColor = "#ffcc66";

const folders = [
  { abbr: "BL", name: "Bucket List" },
  { abbr: "Fi", name: "Finances" },
  { abbr: "TP", name: "Travel Plans" },
  { abbr: "Sh", name: "Shopping" },
  { abbr: "Pe", name: "Personal" },
];

function Sidebar({ onCreateNote }) {
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
            <div style={{ fontWeight: 700, fontSize: 18, color: "#222" }}>
              Syncscribe
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>Meet Desai</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1 }}>
        <div style={{ padding: "0 32px" }}>
          <button
            style={{
              width: "100%",
              background: "#222",
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
            <div style={{ color: "#222", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              🔍 Search
              <span style={{ fontSize: 12, color: "#888", marginLeft: "auto" }}>⌘S</span>
            </div>
            <div style={{ color: "#222", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              🗄️ Archives
              <span style={{ fontSize: 12, color: "#888", marginLeft: "auto" }}>⌘R</span>
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
              Folders
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {folders.map((f) => (
                <div
                  key={f.abbr}
                  style={{
                    color: "#222",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    padding: "6px 0",
                    borderRadius: 6,
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#f8f9fa"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                >
                  {f.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ padding: "0 32px", marginTop: 32 }}>
        <div
          style={{
            color: "#888",
            fontSize: 14,
            marginBottom: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          ⚙️ Settings
        </div>
        <div
          style={{
            color: "#888",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          ❓ Help
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
          marginBottom: 24,
          marginTop: 8,
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 24, color: "#222", flex: 1 }}>
          My Notes
        </h2>
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
              padding: "6px 16px",
              fontWeight: 500,
              color: "#222",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
              padding: "6px 16px",
              fontWeight: 500,
              color: "#888",
              cursor: "pointer",
            }}
          >
            This Month
          </button>
        </div>
      </div>
      <div style={{ 
        display: "flex", 
        gap: 24, 
        marginBottom: 32,
        overflowX: "auto",
        paddingBottom: 8,
      }}>
        {notes.map((note, idx) => (
          <div
            key={idx}
            style={{
              background: note.color,
              borderRadius: 18,
              boxShadow: cardShadow,
              padding: "20px 18px 18px 18px",
              minWidth: 240,
              maxWidth: 260,
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = cardShadow;
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#222",
                marginBottom: 8,
                lineHeight: "1.3",
              }}
            >
              {note.title}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#888",
                marginBottom: 12,
                fontWeight: 500,
              }}
            >
              {note.date}
            </div>
            <div style={{ flex: 1 }}>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {note.items.slice(0, 3).map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 14,
                      color: "#222",
                      marginBottom: 6,
                      lineHeight: "1.4",
                      opacity: i === 2 && note.items.length > 3 ? 0.7 : 1,
                    }}
                  >
                    {i === 2 && note.items.length > 3 ? `${item.slice(0, 30)}...` : item}
                  </li>
                ))}
                {note.items.length > 3 && (
                  <li style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                    +{note.items.length - 3} more items
                  </li>
                )}
              </ul>
            </div>
            <span
              style={{
                position: "absolute",
                right: 16,
                bottom: 12,
                fontSize: 18,
                color: "#7ed957",
                cursor: "pointer",
                opacity: 0.7,
                transition: "opacity 0.2s",
              }}
              title="Edit"
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.7}
            >
              ✎
            </span>
          </div>
        ))}
      </div>
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
          marginBottom: 18,
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: 18, color: "#222", flex: 1 }}>
          Recent Folders
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
              padding: "4px 12px",
              fontWeight: 500,
              color: "#222",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            All
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              borderRadius: 8,
              padding: "4px 12px",
              fontWeight: 500,
              color: "#888",
              cursor: "pointer",
            }}
          >
            Recent
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              borderRadius: 8,
              padding: "4px 12px",
              fontWeight: 500,
              color: "#888",
              cursor: "pointer",
            }}
          >
            Last modified
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {folders.slice(0, 5).map((folder) => (
          <div
            key={folder.abbr}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 90,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 56,
                height: 48,
                background: folderColor,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 20,
                color: "#fff",
                marginBottom: 8,
                boxShadow: cardShadow,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {folder.abbr}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#222",
                fontWeight: 500,
                textAlign: "center",
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

function Page() {
  const [notes, setNotes] = useState([
    {
      title: "《浮生六记》- 沈复",
      date: "2025-06-27",
      color: noteColors[0],
      items: [
        "「布衣菜饭，可乐终身」- 简单生活的智慧",
        "芸娘的聪慧与温柔，理想的伴侣形象",
        "苏州园林的雅致描写，生活美学的体现",
        "人生如梦，珍惜当下的每一个美好时刻",
        "文人雅士的情趣生活",
      ],
    },
    {
      title: "《原则》- 瑞·达利欧",
      date: "2025-06-26",
      color: noteColors[1],
      items: [
        "极度透明原则：坦诚面对现实和问题",
        "可信度加权决策：重视有能力人的意见",
        "失败是学习的机会，要从错误中总结",
        "建立系统性思维，用原则指导决策",
      ],
    },
    {
      title: "《人类简史》- 尤瓦尔·赫拉利",
      date: "2025-06-25",
      color: noteColors[2],
      items: [
        "认知革命：语言和想象力改变了人类",
        "农业革命：人类驯化了小麦，还是小麦驯化了人类？",
        "科学革命：承认无知是智慧的开始",
        "想象的共同体：货币、宗教、帝国的力量",
      ],
    },
    {
      title: "《思考，快与慢》- 丹尼尔·卡尼曼",
      date: "2025-06-24",
      color: noteColors[3],
      items: [
        "系统1：快速、直觉、自动化的思维",
        "系统2：缓慢、理性、需要努力的思维",
        "可得性启发：容易想到的事情被高估概率",
        "锚定效应：第一印象影响后续判断",
        "损失厌恶：失去的痛苦大于得到的快乐",
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
          padding: "48px 48px 0 48px",
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
              background: "rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={(e) => e.target === e.currentTarget && handleFormCancel()}
          >
            <form
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                padding: 32,
                minWidth: 400,
                maxWidth: 500,
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
                color: "#222",
                textAlign: "center",
              }}>
                📚 Create Reading Note
              </h2>
              <input
                name="title"
                placeholder="《书名》- 作者 (例如：《浮生六记》- 沈复)"
                value={form.title}
                onChange={handleFormChange}
                style={{ 
                  padding: "12px 16px", 
                  borderRadius: 12, 
                  border: "2px solid #f0f0f0",
                  fontSize: 16,
                  fontWeight: 500,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#7ed957"}
                onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                required
              />
              <input
                name="date"
                type="date"
                placeholder="阅读日期"
                value={form.date}
                onChange={handleFormChange}
                style={{ 
                  padding: "12px 16px", 
                  borderRadius: 12, 
                  border: "2px solid #f0f0f0",
                  fontSize: 16,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#7ed957"}
                onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
              />
              <select
                name="color"
                value={form.color}
                onChange={handleFormChange}
                style={{ 
                  padding: "12px 16px", 
                  borderRadius: 12, 
                  border: "2px solid #f0f0f0",
                  fontSize: 16,
                  outline: "none",
                  background: "#fff",
                }}
              >
                <option value={noteColors[0]}>🟣 淡紫色 (哲学/思考)</option>
                <option value={noteColors[1]}>🟡 米黄色 (文学/小说)</option>
                <option value={noteColors[2]}>🟢 淡绿色 (科学/技术)</option>
                <option value={noteColors[3]}>🟨 淡黄色 (历史/传记)</option>
              </select>
              <textarea
                name="items"
                placeholder="请输入阅读笔记，一行一条要点：&#10;• 重要观点或金句&#10;• 个人感悟&#10;• 书中精彩片段&#10;• 学到的知识点"
                value={form.items}
                onChange={handleFormChange}
                style={{ 
                  padding: "12px 16px", 
                  borderRadius: 12, 
                  border: "2px solid #f0f0f0",
                  minHeight: 120,
                  fontSize: 16,
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color 0.2s",
                  lineHeight: "1.5",
                }}
                onFocus={(e) => e.target.style.borderColor = "#7ed957"}
                onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
                required
              />
              <div style={{ 
                display: "flex", 
                gap: 16, 
                justifyContent: "flex-end",
                marginTop: 8,
              }}>
                <button 
                  type="button" 
                  onClick={handleFormCancel} 
                  style={{ 
                    padding: "12px 24px", 
                    borderRadius: 12, 
                    border: "none", 
                    background: "#f0f0f0", 
                    color: "#666", 
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#e8e9ea"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ 
                    padding: "12px 24px", 
                    borderRadius: 12, 
                    border: "none", 
                    background: "#7ed957", 
                    color: "#fff", 
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#6bc946"}
                  onMouseLeave={(e) => e.target.style.color = "#fff"}
                >
                  📝 Add Note
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

export default Page;