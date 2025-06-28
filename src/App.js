import React, { useState } from "react";
import './App.css';
import NoteDetail from './components/NoteDetail';
import Statistics from './components/Statistics';

// 颜色主题配置
const theme = {
  primary: '#2c3e50',
  secondary: '#34495e',
  accent: '#3498db',
  success: '#27ae60',
  warning: '#f39c12',
  danger: '#e74c3c',
  light: '#ecf0f1',
  dark: '#2c3e50',
  white: '#ffffff',
  noteColors: ['#e8f4fd', '#fff2e8', '#f0f8f0', '#fff8e1', '#f3e5f5', '#e0f2f1'],
};

// 笔记类型配置
const noteTypes = [
  { id: 'book', name: '书籍笔记', icon: '📚', color: theme.noteColors[0] },
  { id: 'article', name: '文章笔记', icon: '📄', color: theme.noteColors[1] },
  { id: 'video', name: '视频笔记', icon: '🎥', color: theme.noteColors[2] },
  { id: 'podcast', name: '播客笔记', icon: '🎧', color: theme.noteColors[3] },
  { id: 'thought', name: '思考笔记', icon: '💭', color: theme.noteColors[4] },
  { id: 'research', name: '研究笔记', icon: '🔬', color: theme.noteColors[5] },
];

// 文件夹配置
const folders = [
  { id: 'ongoing', name: '进行中', icon: '🔄', count: 5 },
  { id: 'completed', name: '已完成', icon: '✅', count: 12 },
  { id: 'favorites', name: '收藏夹', icon: '⭐', count: 8 },
  { id: 'archived', name: '归档', icon: '📦', count: 25 },
];

// 示例笔记数据
const initialNotes = [
  {
    id: 1,
    title: '《深入理解计算机系统》读书笔记',
    type: 'book',
    author: 'Randal E. Bryant',
    date: '2025-01-15',
    progress: 75,
    tags: ['计算机科学', '系统编程', '经典'],
    summary: '深入理解计算机系统的底层原理，包括程序结构、处理器架构、编译系统等核心概念。',
    content: [
      '第1章：计算机系统漫游 - 理解计算机系统的基本组成',
      '第2章：信息的表示和处理 - 数据在计算机中的表示方式',
      '第3章：程序的机器级表示 - 汇编语言和机器码的关系',
      '第4章：处理器体系结构 - CPU的工作原理和优化技术'
    ],
    color: theme.noteColors[0],
  },
  {
    id: 2,
    title: 'React Hooks 最佳实践',
    type: 'article',
    author: 'Dan Abramov',
    date: '2025-01-14',
    progress: 100,
    tags: ['React', '前端开发', 'Hooks'],
    summary: '学习React Hooks的使用模式和最佳实践，提高代码质量和开发效率。',
    content: [
      'useState vs useReducer 的选择策略',
      'useEffect 的依赖数组管理',
      '自定义 Hooks 的设计原则',
      '性能优化的关键技巧'
    ],
    color: theme.noteColors[1],
  },
  {
    id: 3,
    title: '机器学习基础概念',
    type: 'video',
    author: 'Andrew Ng',
    date: '2025-01-13',
    progress: 60,
    tags: ['机器学习', 'AI', '数学'],
    summary: 'Coursera机器学习课程的核心概念和算法理解。',
    content: [
      '监督学习 vs 无监督学习',
      '线性回归和逻辑回归',
      '神经网络基础',
      '正则化和过拟合'
    ],
    color: theme.noteColors[2],
  },
];

function Sidebar({ onCreateNote, selectedFolder, onFolderSelect, folders, searchQuery, onSearchChange, currentPage, onPageChange, noteTypes }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">📖</div>
          <div className="logo-text">
            <h1>ReadingNotes</h1>
            <p>知识管理工具</p>
          </div>
        </div>
      </div>
      
      <div className="sidebar-content">
        <button className="create-note-btn" onClick={onCreateNote}>
          <span>+</span>
          创建笔记
        </button>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索笔记..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <nav className="folder-nav">
          <h3>文件夹</h3>
          <ul>
            <li className={selectedFolder === 'all' ? 'active' : ''}>
              <button onClick={() => onFolderSelect('all')}>
                📁 全部笔记
              </button>
            </li>
            {folders.map(folder => (
              <li key={folder.id} className={selectedFolder === folder.id ? 'active' : ''}>
                <button onClick={() => onFolderSelect(folder.id)}>
                  {folder.icon} {folder.name}
                  <span className="count">{folder.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="note-types">
          <h3>笔记类型</h3>
          <div className="type-grid">
            {noteTypes.map(type => (
              <div key={type.id} className="type-item" style={{ backgroundColor: type.color }}>
                {type.icon}
                <span>{type.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="page-nav">
          <h3>页面导航</h3>
          <ul>
            <li className={currentPage === 'home' ? 'active' : ''}>
              <button onClick={() => onPageChange('home')}>
                🏠 主页
              </button>
            </li>
            <li className={currentPage === 'statistics' ? 'active' : ''}>
              <button onClick={() => onPageChange('statistics')}>
                📊 统计
              </button>
            </li>
          </ul>
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
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
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
                color: "#888",
                marginBottom: 12,
                fontWeight: 500,
              }}
            >
              {note.date}
            </div>
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {note.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 14,
                    color: "#222",
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
              }}
              title="Edit"
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
            key={folder.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 90,
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
              }}
            >
              {folder.icon}
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

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [showForm, setShowForm] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedNote, setSelectedNote] = useState(null);
  const [form, setForm] = useState({
    title: '',
    type: 'book',
    author: '',
    date: new Date().toISOString().split('T')[0],
    tags: '',
    summary: '',
    content: '',
  });

  const handleCreateNote = () => setShowForm(true);
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    
    const newNote = {
      id: Date.now(),
      title: form.title,
      type: form.type,
      author: form.author,
      date: form.date,
      progress: 0,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      summary: form.summary,
      content: form.content.split('\n').filter(Boolean),
      color: noteTypes.find(t => t.id === form.type)?.color || theme.noteColors[0],
    };
    
    setNotes([newNote, ...notes]);
    setForm({
      title: '',
      type: 'book',
      author: '',
      date: new Date().toISOString().split('T')[0],
      tags: '',
      summary: '',
      content: '',
    });
    setShowForm(false);
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setForm({
      title: '',
      type: 'book',
      author: '',
      date: new Date().toISOString().split('T')[0],
      tags: '',
      summary: '',
      content: '',
    });
  };

  const handleNoteUpdate = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
    setSelectedNote(null);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFolder = selectedFolder === 'all' || 
                         (selectedFolder === 'ongoing' && note.progress < 100) ||
                         (selectedFolder === 'completed' && note.progress === 100);
    return matchesSearch && matchesFolder;
  });

  const renderContent = () => {
    switch (currentPage) {
      case 'statistics':
        return <Statistics notes={notes} />;
      case 'home':
      default:
        return (
          <>
            <Header />
            <NoteGrid 
              notes={filteredNotes} 
              noteTypes={noteTypes}
              onNoteClick={handleNoteClick}
            />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Sidebar 
        onCreateNote={handleCreateNote}
        selectedFolder={selectedFolder}
        onFolderSelect={setSelectedFolder}
        folders={folders}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        noteTypes={noteTypes}
      />
      <main className="main-content">
        {renderContent()}
        {showForm && (
          <NoteForm
            form={form}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            noteTypes={noteTypes}
          />
        )}
        {selectedNote && (
          <NoteDetail
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onUpdate={handleNoteUpdate}
          />
        )}
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h2>我的阅读笔记</h2>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">25</span>
            <span className="stat-label">总笔记</span>
          </div>
          <div className="stat">
            <span className="stat-number">12</span>
            <span className="stat-label">已完成</span>
          </div>
          <div className="stat">
            <span className="stat-number">5</span>
            <span className="stat-label">进行中</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function NoteGrid({ notes, noteTypes, onNoteClick }) {
  return (
    <div className="note-grid">
      {notes.map(note => (
        <NoteCard 
          key={note.id} 
          note={note} 
          noteTypes={noteTypes}
          onClick={() => onNoteClick(note)}
        />
      ))}
    </div>
  );
}

function NoteCard({ note, noteTypes, onClick }) {
  const noteType = noteTypes.find(t => t.id === note.type);
  
  return (
    <div className="note-card" style={{ backgroundColor: note.color }} onClick={onClick}>
      <div className="note-header">
        <div className="note-type-icon">{noteType?.icon}</div>
        <div className="note-meta">
          <h3 className="note-title">{note.title}</h3>
          <p className="note-author">by {note.author}</p>
          <p className="note-date">{note.date}</p>
        </div>
        <div className="note-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${note.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{note.progress}%</span>
        </div>
      </div>
      
      <div className="note-summary">
        <p>{note.summary}</p>
      </div>
      
      <div className="note-tags">
        {note.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <div className="note-content-preview">
        <h4>主要内容：</h4>
        <ul>
          {note.content.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
          {note.content.length > 3 && (
            <li className="more-items">...还有 {note.content.length - 3} 项</li>
          )}
        </ul>
      </div>
      
      <div className="note-actions">
        <button className="action-btn edit">✏️ 编辑</button>
        <button className="action-btn view">👁️ 查看</button>
        <button className="action-btn share">📤 分享</button>
      </div>
    </div>
  );
}

function NoteForm({ form, onChange, onSubmit, onCancel, noteTypes }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={onSubmit} className="note-form">
          <div className="form-header">
            <h2>创建新笔记</h2>
            <button type="button" onClick={onCancel} className="close-btn">×</button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>笔记标题 *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="输入笔记标题..."
                required
              />
            </div>
            
            <div className="form-group">
              <label>笔记类型</label>
              <select name="type" value={form.type} onChange={onChange}>
                {noteTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>作者/来源</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={onChange}
                placeholder="作者姓名或来源..."
              />
            </div>
            
            <div className="form-group">
              <label>创建日期</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={onChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>标签</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={onChange}
              placeholder="用逗号分隔多个标签..."
            />
          </div>
          
          <div className="form-group">
            <label>摘要</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={onChange}
              placeholder="笔记摘要..."
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>笔记内容 *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={onChange}
              placeholder="输入笔记内容，每行一个要点..."
              rows="8"
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              取消
            </button>
            <button type="submit" className="btn-primary">
              创建笔记
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
