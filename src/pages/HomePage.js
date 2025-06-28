import React, { useState, useEffect } from 'react';
import { useAppState } from '../App';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import { theme } from '../styles/theme';
import { formatDate } from '../utils/dateUtils';

const HomePage = () => {
  const { state, dispatch } = useAppState();
  const [filteredNotes, setFilteredNotes] = useState([]);

  // 过滤和排序笔记
  useEffect(() => {
    let filtered = [...state.notes];

    // 搜索过滤
    if (state.searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(state.searchTerm.toLowerCase()))
      );
    }

    // 状态过滤
    if (state.filterStatus !== 'all') {
      filtered = filtered.filter(note => note.status === state.filterStatus);
    }

    // 排序
    switch (state.sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      default:
        break;
    }

    setFilteredNotes(filtered);
  }, [state.notes, state.searchTerm, state.filterStatus, state.sortBy]);

  const handleCreateNote = (noteData) => {
    const newNote = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      rating: 0
    };
    dispatch({ type: 'ADD_NOTE', payload: newNote });
    dispatch({ type: 'SET_SHOW_CREATE_MODAL', payload: false });
  };

  const handleUpdateNote = (noteData) => {
    const updatedNote = {
      ...noteData,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
    dispatch({ type: 'SET_SELECTED_NOTE', payload: null });
  };

  const handleDeleteNote = (noteId) => {
    dispatch({ type: 'DELETE_NOTE', payload: noteId });
  };

  const handleSearch = (searchTerm) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'status') {
      dispatch({ type: 'SET_FILTER_STATUS', payload: value });
    } else if (filterType === 'sort') {
      dispatch({ type: 'SET_SORT_BY', payload: value });
    }
  };

  const handleEditNote = (note) => {
    dispatch({ type: 'SET_SELECTED_NOTE', payload: note });
  };

  const closeModal = () => {
    dispatch({ type: 'SET_SHOW_CREATE_MODAL', payload: false });
    dispatch({ type: 'SET_SELECTED_NOTE', payload: null });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <main style={{
        flex: 1,
        marginLeft: '250px',
        padding: '20px',
        backgroundColor: theme.colors.background,
        minHeight: '100vh'
      }}>
        {/* 头部 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: `1px solid ${theme.colors.border}`
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: theme.colors.text,
              margin: '0 0 8px 0'
            }}>
              我的阅读笔记
            </h1>
            <p style={{
              fontSize: '16px',
              color: theme.colors.textSecondary,
              margin: 0
            }}>
              共 {filteredNotes.length} 篇笔记
            </p>
          </div>
        </div>

        {/* 搜索和过滤栏 */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="搜索笔记..."
            value={state.searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '12px 16px',
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: theme.colors.white
            }}
          />
          
          <select
            value={state.filterStatus}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            style={{
              padding: '12px 16px',
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: theme.colors.white,
              cursor: 'pointer'
            }}
          >
            <option value="all">全部状态</option>
            <option value="reading">阅读中</option>
            <option value="completed">已完成</option>
            <option value="paused">暂停</option>
          </select>

          <select
            value={state.sortBy}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            style={{
              padding: '12px 16px',
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: theme.colors.white,
              cursor: 'pointer'
            }}
          >
            <option value="date">按日期排序</option>
            <option value="title">按标题排序</option>
            <option value="rating">按评分排序</option>
            <option value="progress">按进度排序</option>
          </select>
        </div>

        {/* 笔记网格 */}
        {filteredNotes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: theme.colors.textSecondary
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📚</div>
            <h3 style={{ margin: '0 0 10px 0', color: theme.colors.text }}>
              {state.searchTerm ? '没有找到匹配的笔记' : '还没有笔记'}
            </h3>
            <p style={{ margin: 0 }}>
              {state.searchTerm ? '尝试调整搜索条件' : '点击侧边栏的"创建笔记"开始记录你的阅读'}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
              />
            ))}
          </div>
        )}
      </main>

      {/* 模态框 */}
      {(state.showCreateModal || state.selectedNote) && (
        <NoteForm
          note={state.selectedNote}
          onSubmit={state.selectedNote ? handleUpdateNote : handleCreateNote}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default HomePage; 