import React, { useState } from 'react';
import { THEME } from './constants/theme';
import { INITIAL_NOTES } from './data/mockData';
import Sidebar from './components/Sidebar/Sidebar';
import NoteCard from './components/NoteCard/NoteCard';
import Detail from './components/Detail/Detail';
import RecentFolders from './components/RecentFolders/RecentFolders';

const App = () => {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [currentView, setCurrentView] = useState('all');
  const [createForm, setCreateForm] = useState({
    title: '',
    date: '',
    color: THEME.colors.note.colors[0],
    folderId: 'personal',
    items: '',
  });

  // 创建新笔记
  const handleCreateNote = () => setShowCreateForm(true);

  // 表单输入处理
  const handleFormChange = e => {
    const { name, value } = e.target;
    setCreateForm(prev => ({ ...prev, [name]: value }));
  };

  // 提交新笔记
  const handleFormSubmit = e => {
    e.preventDefault();
    if (!createForm.title || !createForm.items) return;

    const newNote = {
      id: Date.now().toString(),
      title: createForm.title,
      date: createForm.date,
      color: createForm.color,
      folderId: createForm.folderId,
      items: createForm.items.split('\n').filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes(prev => [newNote, ...prev]);
    setCreateForm({
      title: '',
      date: '',
      color: THEME.colors.note.colors[0],
      folderId: 'personal',
      items: '',
    });
    setShowCreateForm(false);
  };

  // 取消创建
  const handleFormCancel = () => {
    setShowCreateForm(false);
    setCreateForm({
      title: '',
      date: '',
      color: THEME.colors.note.colors[0],
      folderId: 'personal',
      items: '',
    });
  };

  // 打开笔记详情
  const handleNoteClick = note => {
    setSelectedNote(note);
  };

  // 关闭笔记详情
  const handleCloseDetail = () => {
    setSelectedNote(null);
  };

  // 保存笔记更改
  const handleSaveNote = updatedNote => {
    setNotes(prev =>
      prev.map(note => (note.id === updatedNote.id ? updatedNote : note)),
    );
    setSelectedNote(updatedNote);
  };

  // 删除笔记
  const handleDeleteNote = noteId => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    setSelectedNote(null);
  };

  // 导航处理
  const handleNavigate = view => {
    setCurrentView(view);
  };

  // 过滤笔记
  const getFilteredNotes = () => {
    if (
      currentView === 'all' ||
      currentView === 'search' ||
      currentView === 'archives'
    ) {
      return notes;
    }
    if (currentView.startsWith('folder-')) {
      const folderId = currentView.replace('folder-', '');
      return notes.filter(note => note.folderId === folderId);
    }
    return notes;
  };

  const appStyle = {
    display: 'flex',
    background: THEME.colors.main.bg,
    minHeight: '100vh',
    fontFamily: THEME.fontFamily,
  };

  const mainStyle = {
    flex: 1,
    padding: THEME.spacing.main.padding,
    background: THEME.colors.main.bg,
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  };

  const titleStyle = {
    fontWeight: 700,
    fontSize: 24,
    color: THEME.colors.text.primary,
    flex: 1,
  };

  const filterStyle = {
    display: 'flex',
    gap: 8,
    background: '#f0f0f0',
    borderRadius: THEME.borderRadius.medium,
    padding: 4,
  };

  const filterButtonStyle = {
    background: '#fff',
    border: 'none',
    borderRadius: THEME.borderRadius.small,
    padding: '6px 16px',
    fontWeight: 500,
    color: THEME.colors.text.primary,
    cursor: 'pointer',
  };

  const inactiveFilterButtonStyle = {
    background: 'none',
    border: 'none',
    borderRadius: THEME.borderRadius.small,
    padding: '6px 16px',
    fontWeight: 500,
    color: THEME.colors.text.secondary,
    cursor: 'pointer',
  };

  const notesGridStyle = {
    display: 'flex',
    gap: 24,
    marginBottom: 32,
    flexWrap: 'wrap',
  };

  const modalStyle = {
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
  };

  const formStyle = {
    background: '#fff',
    borderRadius: THEME.borderRadius.large,
    boxShadow: THEME.shadows.card,
    padding: 32,
    minWidth: 320,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  };

  const inputStyle = {
    padding: 12,
    borderRadius: THEME.borderRadius.small,
    border: '1px solid #eee',
    fontSize: 14,
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: 80,
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: THEME.borderRadius.small,
    border: 'none',
    fontWeight: 500,
    cursor: 'pointer',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: THEME.colors.text.primary,
    color: THEME.colors.text.white,
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: '#eee',
    color: THEME.colors.text.primary,
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div style={appStyle}>
      <Sidebar
        onCreateNote={handleCreateNote}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      <main style={mainStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>My Notes</h2>
          <div style={filterStyle}>
            <button style={filterButtonStyle}>Today</button>
            <button style={inactiveFilterButtonStyle}>This Week</button>
            <button style={inactiveFilterButtonStyle}>This Month</button>
          </div>
        </div>

        <div style={notesGridStyle}>
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => handleNoteClick(note)}
            />
          ))}
        </div>

        <RecentFolders
          onFolderClick={handleNavigate}
          currentView={currentView}
        />
      </main>

      {/* 创建笔记表单 */}
      {showCreateForm && (
        <div style={modalStyle}>
          <form onSubmit={handleFormSubmit} style={formStyle}>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: 20 }}>
              New Note
            </h2>

            <input
              name="title"
              placeholder="Title"
              value={createForm.title}
              onChange={handleFormChange}
              style={inputStyle}
              required
            />

            <input
              name="date"
              type="date"
              placeholder="Date"
              value={createForm.date}
              onChange={handleFormChange}
              style={inputStyle}
            />

            <select
              name="color"
              value={createForm.color}
              onChange={handleFormChange}
              style={inputStyle}
            >
              {THEME.colors.note.colors.map((color, index) => (
                <option value={color} key={index}>
                  Color {index + 1}
                </option>
              ))}
            </select>

            <textarea
              name="items"
              placeholder="One item per line"
              value={createForm.items}
              onChange={handleFormChange}
              style={textareaStyle}
              required
            />

            <div
              style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}
            >
              {/* 取消按钮 */}
              <button
                type="button"
                style={secondaryButtonStyle}
                onClick={handleFormCancel}
              >
                Cancel
              </button>

              {/* 添加按钮 */}
              <button type="submit" style={primaryButtonStyle}>
                Add Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 笔记详情页面 */}
      {selectedNote && (
        <Detail
          note={selectedNote}
          onSave={handleSaveNote}
          onClose={handleCloseDetail}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
};

export default App;
