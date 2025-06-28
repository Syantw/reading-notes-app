import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { useNotes } from '../hooks/useNotes';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

const HomePage = () => {
  const {
    notes,
    filters,
    addNote,
    updateNote,
    deleteNote,
    toggleNoteStatus,
    searchNotes,
    filterNotes,
    getStats,
  } = useNotes();

  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDeleteNote = (id) => {
    if (window.confirm('确定要删除这篇笔记吗？')) {
      deleteNote(id);
    }
  };

  const handleFormSubmit = (noteData) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
    } else {
      addNote(noteData);
    }
    setShowForm(false);
    setEditingNote(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  const stats = getStats();

  return (
    <div
      style={{
        display: 'flex',
        background: theme.colors.background.main,
        minHeight: '100vh',
        fontFamily: theme.fonts.sans,
      }}
    >
      {/* 侧边栏 */}
      <Sidebar
        onCreateNote={handleCreateNote}
        onSearch={searchNotes}
        onFilterChange={filterNotes}
        stats={stats}
        activeFilters={filters}
      />

      {/* 主内容区 */}
      <main
        style={{
          flex: 1,
          padding: `${theme.spacing[12]} ${theme.spacing[12]} 0 ${theme.spacing[12]}`,
          background: theme.colors.background.main,
        }}
      >
        {/* 头部 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing[8],
          }}
        >
          <div>
            <h1
              style={{
                fontWeight: 700,
                fontSize: theme.fontSize['3xl'],
                color: theme.colors.text.primary,
                margin: 0,
                marginBottom: theme.spacing[2],
              }}
            >
              我的笔记
            </h1>
            <p
              style={{
                fontSize: theme.fontSize.lg,
                color: theme.colors.text.secondary,
                margin: 0,
              }}
            >
              记录你的阅读时光，沉淀知识的精华
            </p>
          </div>

          {/* 统计卡片 */}
          <div
            style={{
              display: 'flex',
              gap: theme.spacing[4],
            }}
          >
            <div
              style={{
                background: theme.colors.background.card,
                padding: `${theme.spacing[4]} ${theme.spacing[5]}`,
                borderRadius: theme.borderRadius.lg,
                boxShadow: theme.shadows.sm,
                border: `1px solid ${theme.colors.secondary[100]}`,
                textAlign: 'center',
                minWidth: 100,
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSize['2xl'],
                  fontWeight: 700,
                  color: theme.colors.primary[600],
                  marginBottom: theme.spacing[1],
                }}
              >
                {stats.total}
              </div>
              <div
                style={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                总笔记
              </div>
            </div>

            <div
              style={{
                background: theme.colors.background.card,
                padding: `${theme.spacing[4]} ${theme.spacing[5]}`,
                borderRadius: theme.borderRadius.lg,
                boxShadow: theme.shadows.sm,
                border: `1px solid ${theme.colors.secondary[100]}`,
                textAlign: 'center',
                minWidth: 100,
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSize['2xl'],
                  fontWeight: 700,
                  color: theme.colors.status.success,
                  marginBottom: theme.spacing[1],
                }}
              >
                {stats.completed}
              </div>
              <div
                style={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                已完成
              </div>
            </div>

            <div
              style={{
                background: theme.colors.background.card,
                padding: `${theme.spacing[4]} ${theme.spacing[5]}`,
                borderRadius: theme.borderRadius.lg,
                boxShadow: theme.shadows.sm,
                border: `1px solid ${theme.colors.secondary[100]}`,
                textAlign: 'center',
                minWidth: 100,
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSize['2xl'],
                  fontWeight: 700,
                  color: theme.colors.status.info,
                  marginBottom: theme.spacing[1],
                }}
              >
                {stats.ongoing}
              </div>
              <div
                style={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                进行中
              </div>
            </div>
          </div>
        </div>

        {/* 过滤器 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[3],
            marginBottom: theme.spacing[8],
            padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
            background: theme.colors.background.card,
            borderRadius: theme.borderRadius.lg,
            boxShadow: theme.shadows.sm,
            border: `1px solid ${theme.colors.secondary[100]}`,
          }}
        >
          <span
            style={{
              fontSize: theme.fontSize.sm,
              fontWeight: 600,
              color: theme.colors.text.secondary,
            }}
          >
            筛选：
          </span>
          
          <button
            style={{
              padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              background: filters.dateRange === 'all' 
                ? theme.colors.primary[500] 
                : theme.colors.secondary[100],
              color: filters.dateRange === 'all' 
                ? theme.colors.text.inverse 
                : theme.colors.text.secondary,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: theme.fontSize.sm,
              transition: 'all 0.2s ease',
            }}
            onClick={() => filterNotes({ dateRange: 'all' })}
          >
            全部
          </button>
          
          <button
            style={{
              padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              background: filters.dateRange === 'today' 
                ? theme.colors.primary[500] 
                : theme.colors.secondary[100],
              color: filters.dateRange === 'today' 
                ? theme.colors.text.inverse 
                : theme.colors.text.secondary,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: theme.fontSize.sm,
              transition: 'all 0.2s ease',
            }}
            onClick={() => filterNotes({ dateRange: 'today' })}
          >
            今天
          </button>
          
          <button
            style={{
              padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              background: filters.dateRange === 'week' 
                ? theme.colors.primary[500] 
                : theme.colors.secondary[100],
              color: filters.dateRange === 'week' 
                ? theme.colors.text.inverse 
                : theme.colors.text.secondary,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: theme.fontSize.sm,
              transition: 'all 0.2s ease',
            }}
            onClick={() => filterNotes({ dateRange: 'week' })}
          >
            本周
          </button>
          
          <button
            style={{
              padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              background: filters.dateRange === 'month' 
                ? theme.colors.primary[500] 
                : theme.colors.secondary[100],
              color: filters.dateRange === 'month' 
                ? theme.colors.text.inverse 
                : theme.colors.text.secondary,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: theme.fontSize.sm,
              transition: 'all 0.2s ease',
            }}
            onClick={() => filterNotes({ dateRange: 'month' })}
          >
            本月
          </button>
        </div>

        {/* 笔记列表 */}
        {notes.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: `${theme.spacing[20]} ${theme.spacing[8]}`,
              color: theme.colors.text.secondary,
            }}
          >
            <div
              style={{
                fontSize: '64px',
                marginBottom: theme.spacing[4],
              }}
            >
              📚
            </div>
            <h3
              style={{
                fontSize: theme.fontSize.xl,
                fontWeight: 600,
                margin: 0,
                marginBottom: theme.spacing[2],
              }}
            >
              还没有笔记
            </h3>
            <p
              style={{
                fontSize: theme.fontSize.lg,
                margin: 0,
                marginBottom: theme.spacing[6],
              }}
            >
              开始记录你的第一个阅读笔记吧
            </p>
            <button
              style={{
                padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
                border: 'none',
                borderRadius: theme.borderRadius.lg,
                background: `linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.primary[600]} 100%)`,
                color: theme.colors.text.inverse,
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: theme.fontSize.base,
                boxShadow: theme.shadows.md,
                transition: 'all 0.2s ease',
              }}
              onClick={handleCreateNote}
            >
              创建第一篇笔记
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: theme.spacing[6],
              marginBottom: theme.spacing[12],
            }}
          >
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onToggleStatus={toggleNoteStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* 笔记表单 */}
      {showForm && (
        <NoteForm
          note={editingNote}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isEdit={!!editingNote}
        />
      )}
    </div>
  );
};

export default HomePage; 