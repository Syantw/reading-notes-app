import React, { useState, useEffect, useMemo } from 'react';

// 主题配置
const theme = {
  colors: {
    sidebar: {
      bg: '#fff',
      border: '#f0f0f0',
    },
    main: {
      bg: '#f7f8fa',
    },
    card: {
      shadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    note: ['#e6e6fa', '#ffe4c4', '#e6ffe6', '#fff9e6'],
    folder: '#ffcc66',
    accent: '#7ed957',
    text: {
      primary: '#222',
      secondary: '#888',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 18,
  },
};

// 初始数据
const initialNotes = [
  {
    id: 1,
    title: 'Reading Progress',
    date: '2024-01-15',
    color: theme.colors.note[0],
    folder: 'Reading',
    items: [
      'Finished Chapter 3 of "Atomic Habits"',
      'Key insight: Environment shapes behavior',
      'Start implementing habit stacking',
    ],
  },
  {
    id: 2,
    title: 'JavaScript Concepts',
    date: '2024-01-14',
    color: theme.colors.note[1],
    folder: 'Learning',
    items: [
      'Closures and lexical scope',
      'Event loop and async programming',
      'Prototype chain inheritance',
    ],
  },
  {
    id: 3,
    title: 'Project Ideas',
    date: '2024-01-13',
    color: theme.colors.note[2],
    folder: 'Projects',
    items: [
      'Build a personal knowledge base',
      'Create a habit tracking app',
      'Design a book recommendation system',
    ],
  },
  {
    id: 4,
    title: 'Books to Read',
    date: '',
    color: theme.colors.note[3],
    folder: 'Reading',
    items: [
      '"The Power of Habit" by Charles Duhigg',
      '"Atomic Habits" by James Clear',
      '"The Alchemist" by Paulo Coelho',
    ],
  },
];

const folders = [
  { abbr: 'Re', name: 'Reading', color: '#ff6b6b' },
  { abbr: 'Le', name: 'Learning', color: '#4ecdc4' },
  { abbr: 'Pr', name: 'Projects', color: '#45b7d1' },
  { abbr: 'Id', name: 'Ideas', color: '#96ceb4' },
  { abbr: 'Ar', name: 'Archives', color: '#ffeaa7' },
];

// Sidebar 组件
const Sidebar = ({
  onCreateNote,
  onSearch,
  searchTerm,
  selectedFolder,
  onFolderSelect,
}) => {
  return (
    <aside
      style={{
        width: 260,
        background: theme.colors.sidebar.bg,
        borderRight: `1px solid ${theme.colors.sidebar.border}`,
        padding: `${theme.spacing.xl}px 0 ${theme.spacing.lg}px 0`,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ padding: `0 ${theme.spacing.xl}px`, marginBottom: 40 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing.sm,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c1ff72 60%, #1e2d1f 100%)',
              marginRight: theme.spacing.md,
            }}
          />
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: theme.colors.text.primary,
              }}
            >
              NotesApp
            </div>
            <div
              style={{
                fontSize: 12,
                color: theme.colors.text.secondary,
              }}
            >
              Reading Notes
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        <div style={{ padding: `0 ${theme.spacing.xl}px` }}>
          {/* Create Note Button */}
          <button
            style={{
              width: '100%',
              background: theme.colors.text.primary,
              color: '#fff',
              border: 'none',
              borderRadius: theme.borderRadius.md,
              padding: `${theme.spacing.md}px 0`,
              fontWeight: 600,
              fontSize: 16,
              marginBottom: theme.spacing.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.sm,
              transition: 'all 0.2s ease',
            }}
            onClick={onCreateNote}
            onMouseOver={e => {
              e.target.style.background = '#333';
            }}
            onMouseOut={e => {
              e.target.style.background = theme.colors.text.primary;
            }}
          >
            <span>＋</span> Create Note
          </button>

          {/* Search */}
          <div style={{ marginBottom: theme.spacing.xl }}>
            <input
              type="text"
              placeholder="🔍 Search notes..."
              value={searchTerm}
              onChange={e => onSearch(e.target.value)}
              style={{
                width: '100%',
                padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
                border: `1px solid ${theme.colors.sidebar.border}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Quick Actions */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.sm,
              marginBottom: theme.spacing.xl,
            }}
          >
            <span
              style={{
                color: theme.colors.text.primary,
                fontWeight: 500,
                cursor: 'pointer',
                padding: `${theme.spacing.xs}px 0`,
              }}
            >
              🗄️ Archives
            </span>
          </div>

          {/* Folders */}
          <div>
            <div
              style={{
                color: theme.colors.text.secondary,
                fontWeight: 600,
                fontSize: 13,
                marginBottom: theme.spacing.sm,
              }}
            >
              Folders
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <span
                style={{
                  color:
                    selectedFolder === 'all'
                      ? theme.colors.accent
                      : theme.colors.text.primary,
                  fontWeight: selectedFolder === 'all' ? 600 : 500,
                  fontSize: 15,
                  cursor: 'pointer',
                  padding: '2px 0',
                  borderLeft:
                    selectedFolder === 'all'
                      ? `3px solid ${theme.colors.accent}`
                      : 'none',
                  paddingLeft: selectedFolder === 'all' ? '8px' : '0',
                }}
                onClick={() => onFolderSelect('all')}
              >
                All Notes
              </span>
              {folders.map(f => (
                <span
                  key={f.abbr}
                  style={{
                    color:
                      selectedFolder === f.name
                        ? theme.colors.accent
                        : theme.colors.text.primary,
                    fontWeight: selectedFolder === f.name ? 600 : 500,
                    fontSize: 15,
                    cursor: 'pointer',
                    padding: '2px 0',
                    borderLeft:
                      selectedFolder === f.name
                        ? `3px solid ${theme.colors.accent}`
                        : 'none',
                    paddingLeft: selectedFolder === f.name ? '8px' : '0',
                  }}
                  onClick={() => onFolderSelect(f.name)}
                >
                  {f.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div style={{ padding: `0 ${theme.spacing.xl}px`, marginTop: 32 }}>
        <div
          style={{
            color: theme.colors.text.secondary,
            fontSize: 14,
            marginBottom: theme.spacing.sm,
            cursor: 'pointer',
          }}
        >
          ⚙️ Settings
        </div>
        <div
          style={{
            color: theme.colors.text.secondary,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ❓ Help
        </div>
      </div>
    </aside>
  );
};

// NoteCard 组件
const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div
      style={{
        background: note.color,
        borderRadius: theme.borderRadius.xl,
        boxShadow: theme.colors.card.shadow,
        padding: '20px 18px 18px 18px',
        minWidth: 220,
        maxWidth: 240,
        flex: '1 1 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.colors.card.shadow;
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 16,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.sm,
        }}
      >
        {note.title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.md,
          fontWeight: 500,
        }}
      >
        {note.date} • {note.folder}
      </div>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none', flex: 1 }}>
        {note.items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: 14,
              color: theme.colors.text.primary,
              marginBottom: 6,
              lineHeight: 1.4,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <div
        style={{
          position: 'absolute',
          right: 16,
          bottom: 12,
          display: 'flex',
          gap: theme.spacing.sm,
        }}
      >
        <span
          style={{
            fontSize: 16,
            color: theme.colors.accent,
            cursor: 'pointer',
          }}
          title="Edit"
          onClick={e => {
            e.stopPropagation();
            onEdit(note);
          }}
        >
          ✎
        </span>
        <span
          style={{
            fontSize: 16,
            color: '#ff6b6b',
            cursor: 'pointer',
          }}
          title="Delete"
          onClick={e => {
            e.stopPropagation();
            onDelete(note.id);
          }}
        >
          🗑
        </span>
      </div>
    </div>
  );
};

// NoteList 组件
const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
          marginTop: theme.spacing.sm,
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: theme.colors.text.primary,
            flex: 1,
          }}
        >
          My Notes ({notes.length})
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.lg,
          marginBottom: theme.spacing.xl,
          flexWrap: 'wrap',
        }}
      >
        {notes.length === 0 ? (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              padding: '40px 20px',
              color: theme.colors.text.secondary,
              fontSize: 16,
            }}
          >
            No notes found. Create your first note!
          </div>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

// RecentFolders 组件
const RecentFolders = ({ selectedFolder, onFolderSelect }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: theme.colors.text.primary,
            flex: 1,
          }}
        >
          Quick Access
        </h3>
      </div>
      <div style={{ display: 'flex', gap: theme.spacing.xl }}>
        {folders.slice(0, 5).map(folder => (
          <div
            key={folder.abbr}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 90,
              cursor: 'pointer',
            }}
            onClick={() => onFolderSelect(folder.name)}
          >
            <div
              style={{
                width: 56,
                height: 48,
                background:
                  selectedFolder === folder.name
                    ? theme.colors.accent
                    : folder.color,
                borderRadius: theme.borderRadius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 20,
                color: '#fff',
                marginBottom: theme.spacing.sm,
                boxShadow: theme.colors.card.shadow,
                transition: 'all 0.2s ease',
              }}
            >
              {folder.abbr}
            </div>
            <div
              style={{
                fontSize: 14,
                color:
                  selectedFolder === folder.name
                    ? theme.colors.accent
                    : theme.colors.text.primary,
                fontWeight: selectedFolder === folder.name ? 600 : 500,
                textAlign: 'center',
              }}
            >
              {folder.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// NoteForm 组件
const NoteForm = ({ note, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: note?.title || '',
    date: note?.date || '',
    folder: note?.folder || folders[0].name,
    color: note?.color || theme.colors.note[0],
    items: note?.items ? note.items.join('\n') : '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.items) return;

    const noteData = {
      ...form,
      items: form.items.split('\n').filter(Boolean),
      id: note?.id || Date.now(),
    };

    onSave(noteData);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.colors.card.shadow,
          padding: theme.spacing.xl,
          minWidth: 400,
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md,
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 20 }}>
          {note ? 'Edit Note' : 'New Note'}
        </h2>

        <input
          name="title"
          placeholder="Note title"
          value={form.title}
          onChange={handleChange}
          style={{
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.sm,
            border: '1px solid #eee',
            fontSize: 16,
            outline: 'none',
          }}
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          style={{
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.sm,
            border: '1px solid #eee',
            fontSize: 14,
            outline: 'none',
          }}
        />

        <select
          name="folder"
          value={form.folder}
          onChange={handleChange}
          style={{
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.sm,
            border: '1px solid #eee',
            fontSize: 14,
            outline: 'none',
          }}
        >
          {folders.map(folder => (
            <option key={folder.name} value={folder.name}>
              {folder.name}
            </option>
          ))}
        </select>

        <select
          name="color"
          value={form.color}
          onChange={handleChange}
          style={{
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.sm,
            border: '1px solid #eee',
            fontSize: 14,
            outline: 'none',
          }}
        >
          {theme.colors.note.map((color, i) => (
            <option key={color} value={color}>
              Color Theme {i + 1}
            </option>
          ))}
        </select>

        <textarea
          name="items"
          placeholder="Note content (one item per line)"
          value={form.items}
          onChange={handleChange}
          style={{
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.sm,
            border: '1px solid #eee',
            minHeight: 120,
            fontSize: 14,
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
          }}
          required
        />

        <div
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
              borderRadius: theme.borderRadius.sm,
              border: 'none',
              background: '#eee',
              color: theme.colors.text.primary,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
              borderRadius: theme.borderRadius.sm,
              border: 'none',
              background: theme.colors.text.primary,
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {note ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

// 主应用组件
const App = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  // 过滤笔记
  const filteredNotes = useMemo(() => {
    let filtered = notes;

    // 按文件夹过滤
    if (selectedFolder !== 'all') {
      filtered = filtered.filter(note => note.folder === selectedFolder);
    }

    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(
        note =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.items.some(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase()),
          ) ||
          note.folder.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [notes, selectedFolder, searchTerm]);

  // 处理笔记保存
  const handleSaveNote = noteData => {
    if (editingNote) {
      setNotes(prev =>
        prev.map(note => (note.id === editingNote.id ? noteData : note)),
      );
    } else {
      setNotes(prev => [...prev, noteData]);
    }
    setShowForm(false);
    setEditingNote(null);
  };

  // 处理笔记编辑
  const handleEditNote = note => {
    setEditingNote(note);
    setShowForm(true);
  };

  // 处理笔记删除
  const handleDeleteNote = noteId => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    }
  };

  // 处理表单取消
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  // 处理创建新笔记
  const handleCreateNote = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        background: theme.colors.main.bg,
        minHeight: '100vh',
        fontFamily:
          "'Inter', 'SF Pro Display', 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      }}
    >
      <Sidebar
        onCreateNote={handleCreateNote}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        selectedFolder={selectedFolder}
        onFolderSelect={setSelectedFolder}
      />
      <main
        style={{
          flex: 1,
          padding: `${theme.spacing.xxl}px ${theme.spacing.xxl}px 0 ${theme.spacing.xxl}px`,
          background: theme.colors.main.bg,
        }}
      >
        {showForm && (
          <NoteForm
            note={editingNote}
            onSave={handleSaveNote}
            onCancel={handleFormCancel}
          />
        )}
        <NoteList
          notes={filteredNotes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
        <RecentFolders
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
        />
      </main>
    </div>
  );
};

export default App;
