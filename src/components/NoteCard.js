import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { formatDate } from '../utils/dateUtils';

const NoteCard = ({ note, onEdit, onDelete, onUpdate }) => {
  const [showActions, setShowActions] = useState(false);

  const handleStatusChange = (newStatus) => {
    onUpdate({
      ...note,
      status: newStatus
    });
  };

  const handleProgressChange = (newProgress) => {
    onUpdate({
      ...note,
      progress: newProgress
    });
  };

  const handleRatingChange = (newRating) => {
    onUpdate({
      ...note,
      rating: newRating
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'reading': return '#3B82F6';
      case 'paused': return '#F59E0B';
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'reading': return '阅读中';
      case 'paused': return '暂停';
      default: return '未开始';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'book': return '📚';
      case 'article': return '📄';
      case 'paper': return '📝';
      case 'video': return '🎥';
      case 'podcast': return '🎧';
      default: return '📖';
    }
  };

  return (
    <div style={{
      background: theme.colors.white,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.colors.border}`,
      transition: 'all 0.3s ease',
      position: 'relative',
      cursor: 'pointer'
    }}
    onMouseEnter={() => setShowActions(true)}
    onMouseLeave={() => setShowActions(false)}
    >
      {/* 操作按钮 */}
      {showActions && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          gap: '8px',
          zIndex: 10
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('确定要删除这篇笔记吗？')) {
                onDelete(note.id);
              }
            }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#EF4444',
              color: theme.colors.white,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}
          >
            🗑️
          </button>
        </div>
      )}

      {/* 头部 */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <div style={{
          fontSize: '24px',
          marginRight: '12px',
          marginTop: '2px'
        }}>
          {getTypeIcon(note.type)}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: theme.colors.text,
            margin: '0 0 4px 0',
            lineHeight: '1.3'
          }}>
            {note.title}
          </h3>
          <p style={{
            fontSize: '14px',
            color: theme.colors.textSecondary,
            margin: 0,
            lineHeight: '1.4'
          }}>
            {note.author || '未知作者'}
          </p>
        </div>
      </div>

      {/* 内容预览 */}
      <div style={{
        fontSize: '14px',
        color: theme.colors.text,
        lineHeight: '1.5',
        marginBottom: '16px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {note.content}
      </div>

      {/* 标签 */}
      {note.tags && note.tags.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '16px'
        }}>
          {note.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                padding: '4px 8px',
                backgroundColor: theme.colors.primary + '20',
                color: theme.colors.primary,
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 状态和进度 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            padding: '4px 8px',
            backgroundColor: getStatusColor(note.status) + '20',
            color: getStatusColor(note.status),
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {getStatusText(note.status)}
          </span>
          {note.totalPages && (
            <span style={{
              fontSize: '12px',
              color: theme.colors.textSecondary
            }}>
              {note.currentPage || 0}/{note.totalPages} 页
            </span>
          )}
        </div>
        <div style={{
          fontSize: '12px',
          color: theme.colors.textSecondary
        }}>
          {formatDate(note.createdAt)}
        </div>
      </div>

      {/* 进度条 */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px'
        }}>
          <span style={{
            fontSize: '12px',
            color: theme.colors.textSecondary
          }}>
            进度
          </span>
          <span style={{
            fontSize: '12px',
            color: theme.colors.textSecondary
          }}>
            {note.progress}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: theme.colors.border,
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${note.progress}%`,
            height: '100%',
            backgroundColor: theme.colors.primary,
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* 评分 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{
          fontSize: '12px',
          color: theme.colors.textSecondary
        }}>
          评分:
        </span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={(e) => {
                e.stopPropagation();
                handleRatingChange(star);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                color: star <= note.rating ? '#F59E0B' : theme.colors.border,
                padding: '0',
                lineHeight: 1
              }}
            >
              ⭐
            </button>
          ))}
        </div>
        <span style={{
          fontSize: '12px',
          color: theme.colors.textSecondary
        }}>
          ({note.rating}/5)
        </span>
      </div>
    </div>
  );
};

export default NoteCard; 