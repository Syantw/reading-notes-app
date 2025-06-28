import React from 'react';
import { theme, noteTypes } from '../styles/theme';
import { formatDate } from '../utils/dateUtils';

const NoteCard = ({ note, onEdit, onDelete, onToggleStatus, onUpdateProgress }) => {
  const noteType = noteTypes[note.type];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return theme.colors.status.success;
      case 'ongoing':
        return theme.colors.status.info;
      case 'draft':
        return theme.colors.status.warning;
      default:
        return theme.colors.text.muted;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'ongoing':
        return '进行中';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };

  return (
    <div
      style={{
        background: theme.colors.background.card,
        borderRadius: theme.borderRadius.xl,
        boxShadow: theme.shadows.md,
        padding: theme.spacing[6],
        minWidth: 320,
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: `1px solid ${theme.colors.secondary[100]}`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = theme.shadows.lg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.shadows.md;
      }}
    >
      {/* 类型标识 */}
      <div
        style={{
          position: 'absolute',
          top: theme.spacing[4],
          right: theme.spacing[4],
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: noteType.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          boxShadow: theme.shadows.sm,
        }}
      >
        {noteType.icon}
      </div>

      {/* 标题 */}
      <div
        style={{
          fontWeight: 700,
          fontSize: theme.fontSize.lg,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing[2],
          paddingRight: theme.spacing[12],
          lineHeight: 1.4,
        }}
      >
        {note.title}
      </div>

      {/* 元信息 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing[3],
          marginBottom: theme.spacing[4],
          fontSize: theme.fontSize.sm,
          color: theme.colors.text.secondary,
        }}
      >
        <span>{formatDate(note.date, 'short')}</span>
        <span>•</span>
        <span
          style={{
            color: getStatusColor(note.status),
            fontWeight: 600,
          }}
        >
          {getStatusText(note.status)}
        </span>
        {note.rating > 0 && (
          <>
            <span>•</span>
            <span style={{ color: theme.colors.primary[500] }}>
              {'⭐'.repeat(note.rating)}
            </span>
          </>
        )}
      </div>

      {/* 作者/导演信息 */}
      {(note.author || note.director) && (
        <div
          style={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing[3],
            fontStyle: 'italic',
          }}
        >
          {note.author && `作者：${note.author}`}
          {note.director && `导演：${note.director}`}
          {note.year && ` (${note.year})`}
        </div>
      )}

      {/* 进度条 */}
      {note.progress !== undefined && (
        <div style={{ marginBottom: theme.spacing[4] }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing[1],
            }}
          >
            <span
              style={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.text.secondary,
              }}
            >
              进度
            </span>
            <span
              style={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.text.secondary,
                fontWeight: 600,
              }}
            >
              {note.progress}%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: 6,
              background: theme.colors.secondary[200],
              borderRadius: theme.borderRadius.sm,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${note.progress}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${theme.colors.primary[400]} 0%, ${theme.colors.primary[500]} 100%)`,
                borderRadius: theme.borderRadius.sm,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* 内容预览 */}
      <div style={{ marginBottom: theme.spacing[4], flex: 1 }}>
        <ul
          style={{
            padding: 0,
            margin: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing[2],
          }}
        >
          {note.content.slice(0, 3).map((item, index) => (
            <li
              key={index}
              style={{
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.secondary,
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  color: theme.colors.primary[400],
                  marginRight: theme.spacing[2],
                  fontSize: '12px',
                  marginTop: '2px',
                }}
              >
                •
              </span>
              {item}
            </li>
          ))}
          {note.content.length > 3 && (
            <li
              style={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.text.muted,
                fontStyle: 'italic',
              }}
            >
              还有 {note.content.length - 3} 条内容...
            </li>
          )}
        </ul>
      </div>

      {/* 标签 */}
      {note.tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacing[1],
            marginBottom: theme.spacing[4],
          }}
        >
          {note.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              style={{
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                background: `${noteType.color}30`,
                color: theme.colors.text.primary,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fontSize.xs,
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span
              style={{
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                background: theme.colors.secondary[100],
                color: theme.colors.text.muted,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fontSize.xs,
              }}
            >
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* 操作按钮 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: theme.spacing[3],
          borderTop: `1px solid ${theme.colors.secondary[100]}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: theme.spacing[2],
          }}
        >
          <button
            style={{
              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              background: theme.colors.primary[100],
              color: theme.colors.primary[600],
              fontSize: theme.fontSize.xs,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(note.id);
            }}
          >
            {note.status === 'completed' ? '重新开始' : '标记完成'}
          </button>
          <button
            style={{
              padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              background: theme.colors.secondary[100],
              color: theme.colors.text.secondary,
              fontSize: theme.fontSize.xs,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
          >
            编辑
          </button>
        </div>
        
        <button
          style={{
            padding: theme.spacing[1],
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            background: 'transparent',
            color: theme.colors.text.muted,
            fontSize: theme.fontSize.sm,
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          title="删除笔记"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default NoteCard; 