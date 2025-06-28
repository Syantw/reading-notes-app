import React, { useState, useCallback, useMemo } from 'react';

// 主题配置
const theme = {
  colors: {
    sidebar: {
      bg: '#fff',
      border: '#f0f0f0',
      text: '#222',
      textSecondary: '#888',
    },
    main: {
      bg: '#f7f8fa',
    },
    note: {
      colors: ['#e6e6fa', '#ffe4c4', '#e6ffe6', '#fff9e6'],
    },
    folder: {
      bg: '#ffcc66',
    },
    accent: '#7ed957',
    shadow: '0 2px 8px rgba(0,0,0,0.04)',
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

// 常量数据
const FOLDERS_DATA = [
  { id: 'bucket-list', abbr: 'BL', name: 'Bucket List' },
  { id: 'finances', abbr: 'Fi', name: 'Finances' },
  { id: 'travel-plans', abbr: 'TP', name: 'Travel Plans' },
  { id: 'shopping', abbr: 'Sh', name: 'Shopping' },
  { id: 'personal', abbr: 'Pe', name: 'Personal' },
  { id: 'work', abbr: 'Wo', name: 'Work' },
  { id: 'projects', abbr: 'Pr', name: 'Projects' },
  { id: 'books', abbr: 'Bo', name: 'Books' },
];

const INITIAL_NOTES = [
  {
    id: '1',
    title: 'Reading Progress',
    date: '2024-01-15',
    color: theme.colors.note.colors[0],
    folderId: 'books',
    items: [
      'The Power of Habit - Chapter 3',
      'Atomic Habits - Introduction',
      'Deep Work - Part 1',
    ],
  },
  {
    id: '2',
    title: 'Learning Goals',
    date: '2024-01-16',
    color: theme.colors.note.colors[1],
    folderId: 'personal',
    items: [
      'Master React hooks',
      'Learn TypeScript basics',
      'Practice algorithm problems',
    ],
  },
  {
    id: '3',
    title: 'Project Ideas',
    date: '2024-01-17',
    color: theme.colors.note.colors[2],
    folderId: 'projects',
    items: [
      'Build a reading tracker',
      'Create a habit tracker',
      'Design a portfolio website',
    ],
  },
];

const TIME_FILTERS = ['Today', 'This Week', 'This Month'];
const FOLDER_FILTERS = ['All', 'Recent', 'Last modified'];

// 工具函数
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// 自定义 Hooks
const useNotes = (initialNotes) => {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [timeFilter, setTimeFilter] = useState('Today');

  const addNote = useCallback((noteData) => {
    const newNote = {
      ...noteData,
      id: generateId(),
      items: noteData.items.split('\n').filter(Boolean),
    };
    setNotes(prev => [...prev, newNote]);
  }, []);

  const updateNote = useCallback((noteId, updatedData) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, ...updatedData } : note
    ));
  }, []);

  const deleteNote = useCallback((noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  }, []);

  const filteredNotes = useMemo(() => {
    let filtered = notes;
    
    if (selectedFolder) {
      filtered = filtered.filter(note => note.folderId === selectedFolder);
    }
    
    // 这里可以添加时间过滤逻辑
    return filtered;
  }, [notes, selectedFolder, timeFilter]);

  return {
    notes: filteredNotes,
    allNotes: notes,
    selectedFolder,
    timeFilter,
    setSelectedFolder,
    setTimeFilter,
    addNote,
    updateNote,
    deleteNote,
  };
};

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [isVisible, setIsVisible] = useState(false);

  const updateField = useCallback((name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  const showForm = useCallback(() => setIsVisible(true), []);
  const hideForm = useCallback(() => {
    setIsVisible(false);
    resetForm();
  }, [resetForm]);

  return {
    form,
    isVisible,
    updateField,
    resetForm,
    showForm,
    hideForm,
  };
};

// 组件
const Sidebar = React.memo(({ 
  folders, 
  selectedFolder, 
  onFolderSelect, 
  onCreateNote,
  onSearch,
  onArchives 
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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing.sm }}>
          <div
            style={{
              width: theme.spacing.xl,
              height: theme.spacing.xl,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c1ff72 60%, #1e2d1f 100%)',
              marginRight: theme.spacing.md,
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: theme.colors.sidebar.text }}>
              Reading Notes
            </div>
            <div style={{ fontSize: 12, color: theme.colors.sidebar.textSecondary }}>
              Knowledge Manager
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        <div style={{ padding: `0 ${theme.spacing.xl}px` }}>
          {/* Create Note Button */}
          <button
            onClick={onCreateNote}
            style={{
              width: '100%',
              background: theme.colors.sidebar.text,
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
            onMouseEnter={(e) => {
              e.target.style.background = '#333';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = theme.colors.sidebar.text;
            }}
          >
            <span>＋</span> Create Note
          </button>

          {/* Quick Actions */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: theme.spacing.sm, 
            marginBottom: theme.spacing.xl 
          }}>
            <button
              onClick={onSearch}
              style={{
                background: 'none',
                border: 'none',
                color: theme.colors.sidebar.text,
                fontWeight: 500,
                cursor: 'pointer',
                padding: `${theme.spacing.xs}px 0`,
                textAlign: 'left',
                transition: 'color 0.2s ease',
              }}
            >
              🔍 Search
            </button>
            <button
              onClick={onArchives}
              style={{
                background: 'none',
                border: 'none',
                color: theme.colors.sidebar.text,
                fontWeight: 500,
                cursor: 'pointer',
                padding: `${theme.spacing.xs}px 0`,
                textAlign: 'left',
                transition: 'color 0.2s ease',
              }}
            >
              🗄️ Archives
            </button>
          </div>

          {/* Folders */}
          <div>
            <div style={{
              color: theme.colors.sidebar.textSecondary,
              fontWeight: 600,
              fontSize: 13,
              marginBottom: theme.spacing.sm,
            }}>
              Folders
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => onFolderSelect(folder.id)}
                  style={{
                    background: selectedFolder === folder.id ? '#f0f0f0' : 'none',
                    border: 'none',
                    color: theme.colors.sidebar.text,
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: 'pointer',
                    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                    borderRadius: theme.borderRadius.sm,
                    textAlign: 'left',
                    transition: 'background 0.2s ease',
                  }}
                >
                  {folder.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div style={{ padding: `0 ${theme.spacing.xl}px`, marginTop: theme.spacing.xl }}>
        <div style={{
          color: theme.colors.sidebar.textSecondary,
          fontSize: 14,
          marginBottom: theme.spacing.sm,
          cursor: 'pointer',
        }}>
          ⚙️ Settings
        </div>
        <div style={{
          color: theme.colors.sidebar.textSecondary,
          fontSize: 14,
          cursor: 'pointer',
        }}>
          ❓ Help
        </div>
      </div>
    </aside>
  );
});

const FilterTabs = React.memo(({ items, activeItem, onItemChange, label }) => {
  return (
    <div style={{
      display: 'flex',
      gap: theme.spacing.sm,
      background: '#f0f0f0',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.xs,
    }}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onItemChange(item)}
          style={{
            background: activeItem === item ? '#fff' : 'none',
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            padding: `6px ${theme.spacing.md}px`,
            fontWeight: 500,
            color: activeItem === item ? theme.colors.sidebar.text : theme.colors.sidebar.textSecondary,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
});

const NoteCard = React.memo(({ note, onEdit, onDelete }) => {
  return (
    <div
      style={{
        background: note.color,
        borderRadius: theme.borderRadius.xl,
        boxShadow: theme.colors.shadow,
        padding: `20px 18px 18px 18px`,
        minWidth: 220,
        maxWidth: 240,
        flex: '1 1 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.colors.shadow;
      }}
    >
      <div style={{
        fontWeight: 600,
        fontSize: 16,
        color: theme.colors.sidebar.text,
        marginBottom: theme.spacing.sm,
      }}>
        {note.title}
      </div>
      
      <div style={{
        fontSize: 13,
        color: theme.colors.sidebar.textSecondary,
        marginBottom: theme.spacing.md,
        fontWeight: 500,
      }}>
        {note.date}
      </div>
      
      <ul style={{ padding: 0, margin: 0, listStyle: 'none', flex: 1 }}>
        {note.items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: 14,
              color: theme.colors.sidebar.text,
              marginBottom: 6,
              lineHeight: 1.4,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      
      <div style={{
        position: 'absolute',
        right: 16,
        bottom: 12,
        display: 'flex',
        gap: theme.spacing.sm,
      }}>
        <span
          onClick={(e) => {
            e.stopPropagation();
            onEdit(note);
          }}
          style={{
            fontSize: 18,
            color: theme.colors.accent,
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
          title="Edit"
        >
          ✎
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          style={{
            fontSize: 16,
            color: '#ff6b6b',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
          title="Delete"
        >
          🗑
        </span>
      </div>
    </div>
  );
});

const NoteList = React.memo(({ 
  notes, 
  timeFilter, 
  onTimeFilterChange, 
  onNoteEdit, 
  onNoteDelete 
}) => {
  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        marginTop: theme.spacing.sm,
      }}>
        <h2 style={{ 
          fontWeight: 700, 
          fontSize: 24, 
          color: theme.colors.sidebar.text, 
          flex: 1,
          margin: 0,
        }}>
          My Notes
        </h2>
        <FilterTabs
          items={TIME_FILTERS}
          activeItem={timeFilter}
          onItemChange={onTimeFilterChange}
          label="Time Filter"
        />
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: theme.spacing.lg, 
        marginBottom: theme.spacing.xl,
        flexWrap: 'wrap',
      }}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onNoteEdit}
              onDelete={onNoteDelete}
            />
          ))
        ) : (
          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: theme.spacing.xxl,
            color: theme.colors.sidebar.textSecondary,
          }}>
            No notes found. Create your first note!
          </div>
        )}
      </div>
    </div>
  );
});

const FolderCard = React.memo(({ folder, isSelected, onClick }) => {
  return (
    <div
      onClick={() => onClick(folder.id)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 90,
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          width: 56,
          height: 48,
          background: isSelected ? theme.colors.accent : theme.colors.folder.bg,
          borderRadius: theme.borderRadius.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 20,
          color: '#fff',
          marginBottom: theme.spacing.sm,
          boxShadow: theme.colors.shadow,
          transition: 'all 0.2s ease',
        }}
      >
        {folder.abbr}
      </div>
      <div
        style={{
          fontSize: 14,
          color: theme.colors.sidebar.text,
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {folder.name}
      </div>
    </div>
  );
});

const RecentFolders = React.memo(({ 
  folders, 
  folderFilter, 
  selectedFolder,
  onFolderFilterChange, 
  onFolderSelect 
}) => {
  const visibleFolders = folders.slice(0, 5);

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 18,
      }}>
        <h3 style={{ 
          fontWeight: 700, 
          fontSize: 18, 
          color: theme.colors.sidebar.text, 
          flex: 1,
          margin: 0,
        }}>
          Recent Folders
        </h3>
        <FilterTabs
          items={FOLDER_FILTERS}
          activeItem={folderFilter}
          onItemChange={onFolderFilterChange}
          label="Folder Filter"
        />
      </div>
      
      <div style={{ display: 'flex', gap: theme.spacing.xl }}>
        {visibleFolders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            isSelected={selectedFolder === folder.id}
            onClick={onFolderSelect}
          />
        ))}
      </div>
    </div>
  );
});

const NoteForm = React.memo(({ 
  isVisible, 
  form, 
  onFormChange, 
  onSubmit, 
  onCancel 
}) => {
  if (!isVisible) return null;

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
        backdropFilter: 'blur(2px)',
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          background: '#fff',
          borderRadius: theme.borderRadius.lg,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          padding: theme.spacing.xl,
          minWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md,
          animation: 'fadeInUp 0.3s ease',
        }}
      >
        <h2 style={{ 
          margin: 0, 
          fontWeight: 700, 
          fontSize: 20,
          color: theme.colors.sidebar.text,
        }}>
          {form.id ? 'Edit Note' : 'New Note'}
        </h2>
        
        <input
          name="title"
          placeholder="Note title"
          value={form.title}
          onChange={onFormChange}
          style={{ 
            padding: theme.spacing.md, 
            borderRadius: theme.borderRadius.sm, 
            border: '1px solid #eee',
            fontSize: 16,
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          required
          autoFocus
        />
        
        <input
          name="date"
          type="date"
          placeholder="Date"
          value={form.date}
          onChange={onFormChange}
          style={{ 
            padding: theme.spacing.md, 
            borderRadius: theme.borderRadius.sm, 
            border: '1px solid #eee',
            fontSize: 16,
            outline: 'none',
          }}
        />
        
        <select
          name="folderId"
          value={form.folderId}
          onChange={onFormChange}
          style={{ 
            padding: theme.spacing.md, 
            borderRadius: theme.borderRadius.sm, 
            border: '1px solid #eee',
            fontSize: 16,
            outline: 'none',
          }}
        >
          <option value="">Select a folder</option>
          {FOLDERS_DATA.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        
        <select
          name="color"
          value={form.color}
          onChange={onFormChange}
          style={{ 
            padding: theme.spacing.md, 
            borderRadius: theme.borderRadius.sm, 
            border: '1px solid #eee',
            fontSize: 16,
            outline: 'none',
          }}
        >
          {theme.colors.note.colors.map((color, i) => (
            <option key={color} value={color}>
              Color {i + 1}
            </option>
          ))}
        </select>
        
        <textarea
          name="items"
          placeholder="Add your notes here (one item per line)"
          value={form.items}
          onChange={onFormChange}
          style={{ 
            padding: theme.spacing.md, 
            borderRadius: theme.borderRadius.sm, 
            border: '1px solid #eee',
            minHeight: 120,
            fontSize: 16,
            outline: 'none',
            resize: 'vertical',
          }}
          required
        />
        
        <div style={{ 
          display: 'flex', 
          gap: theme.spacing.md, 
          justifyContent: 'flex-end',
          marginTop: theme.spacing.md,
        }}>
          <button 
            type="button" 
            onClick={onCancel} 
            style={{ 
              padding: `${theme.spacing.md}px ${theme.spacing.lg}px`, 
              borderRadius: theme.borderRadius.sm, 
              border: 'none', 
              background: '#eee', 
              color: theme.colors.sidebar.text, 
              fontWeight: 500, 
              cursor: 'pointer',
              transition: 'background 0.2s ease',
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
              background: theme.colors.sidebar.text, 
              color: '#fff', 
              fontWeight: 600, 
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            {form.id ? 'Update Note' : 'Add Note'}
          </button>
        </div>
      </form>
    </div>
  );
});

// 主应用组件
function App() {
  const noteHooks = useNotes(INITIAL_NOTES);
  const [folderFilter, setFolderFilter] = useState('All');
  
  const formHooks = useForm({
    title: '',
    date: '',
    folderId: '',
    color: theme.colors.note.colors[0],
    items: '',
  });

  // 事件处理函数
  const handleCreateNote = useCallback(() => {
    formHooks.showForm();
  }, [formHooks]);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    formHooks.updateField(name, value);
  }, [formHooks]);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formHooks.form.title || !formHooks.form.items) return;
    
    if (formHooks.form.id) {
      noteHooks.updateNote(formHooks.form.id, formHooks.form);
    } else {
      noteHooks.addNote(formHooks.form);
    }
    
    formHooks.hideForm();
  }, [formHooks, noteHooks]);

  const handleNoteEdit = useCallback((note) => {
    Object.entries(note).forEach(([key, value]) => {
      if (key === 'items') {
        formHooks.updateField(key, Array.isArray(value) ? value.join('\n') : value);
      } else {
        formHooks.updateField(key, value);
      }
    });
    formHooks.showForm();
  }, [formHooks]);

  const handleFolderSelect = useCallback((folderId) => {
    noteHooks.setSelectedFolder(
      noteHooks.selectedFolder === folderId ? null : folderId
    );
  }, [noteHooks]);

  const handleSearch = useCallback(() => {
    console.log('Search functionality to be implemented');
  }, []);

  const handleArchives = useCallback(() => {
    console.log('Archives functionality to be implemented');
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        background: theme.colors.main.bg,
        minHeight: '100vh',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      }}
    >
      <Sidebar
        folders={FOLDERS_DATA}
        selectedFolder={noteHooks.selectedFolder}
        onFolderSelect={handleFolderSelect}
        onCreateNote={handleCreateNote}
        onSearch={handleSearch}
        onArchives={handleArchives}
      />
      
      <main
        style={{
          flex: 1,
          padding: `${theme.spacing.xxl}px ${theme.spacing.xxl}px 0 ${theme.spacing.xxl}px`,
          background: theme.colors.main.bg,
        }}
      >
        <NoteForm
          isVisible={formHooks.isVisible}
          form={formHooks.form}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={formHooks.hideForm}
        />
        
        <NoteList
          notes={noteHooks.notes}
          timeFilter={noteHooks.timeFilter}
          onTimeFilterChange={noteHooks.setTimeFilter}
          onNoteEdit={handleNoteEdit}
          onNoteDelete={noteHooks.deleteNote}
        />
        
        <RecentFolders
          folders={FOLDERS_DATA}
          folderFilter={folderFilter}
          selectedFolder={noteHooks.selectedFolder}
          onFolderFilterChange={setFolderFilter}
          onFolderSelect={handleFolderSelect}
        />
      </main>
    </div>
  );
}

export default App;
