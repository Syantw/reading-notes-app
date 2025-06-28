import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';

const NoteForm = ({ note, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    type: 'book',
    status: 'reading',
    tags: [],
    totalPages: '',
    currentPage: '',
    progress: 0,
    rating: 0
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (note) {
      setFormData({
        ...note,
        tags: note.tags || []
      });
    }
  }, [note]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('请输入笔记标题');
      return;
    }

    const submitData = {
      ...formData,
      id: note?.id,
      progress: parseInt(formData.progress) || 0,
      rating: parseInt(formData.rating) || 0,
      totalPages: parseInt(formData.totalPages) || 0,
      currentPage: parseInt(formData.currentPage) || 0
    };

    onSubmit(submitData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: theme.colors.white,
        borderRadius: '12px',
        padding: '24px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: theme.colors.text,
            margin: 0
          }}>
            {note ? '编辑笔记' : '创建新笔记'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: theme.colors.textSecondary,
              padding: '4px'
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '20px' }}>
            {/* 标题 */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.colors.text,
                marginBottom: '8px'
              }}>
                标题 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: theme.colors.white
                }}
                placeholder="输入笔记标题"
                required
              />
            </div>

            {/* 作者 */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.colors.text,
                marginBottom: '8px'
              }}>
                作者
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: theme.colors.white
                }}
                placeholder="输入作者姓名"
              />
            </div>

            {/* 类型和状态 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.colors.text,
                  marginBottom: '8px'
                }}>
                  类型
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: theme.colors.white,
                    cursor: 'pointer'
                  }}
                >
                  <option value="book">📚 书籍</option>
                  <option value="article">📄 文章</option>
                  <option value="paper">📝 论文</option>
                  <option value="video">🎥 视频</option>
                  <option value="podcast">🎧 播客</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.colors.text,
                  marginBottom: '8px'
                }}>
                  状态
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: theme.colors.white,
                    cursor: 'pointer'
                  }}
                >
                  <option value="reading">阅读中</option>
                  <option value="completed">已完成</option>
                  <option value="paused">暂停</option>
                </select>
              </div>
            </div>

            {/* 页面信息 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.colors.text,
                  marginBottom: '8px'
                }}>
                  总页数
                </label>
                <input
                  type="number"
                  value={formData.totalPages}
                  onChange={(e) => handleInputChange('totalPages', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: theme.colors.white
                  }}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.colors.text,
                  marginBottom: '8px'
                }}>
                  当前页数
                </label>
                <input
                  type="number"
                  value={formData.currentPage}
                  onChange={(e) => handleInputChange('currentPage', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: theme.colors.white
                  }}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* 进度 */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.colors.text,
                marginBottom: '8px'
              }}>
                进度 (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => handleInputChange('progress', e.target.value)}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: theme.colors.border,
                  outline: 'none'
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: theme.colors.textSecondary,
                marginTop: '4px'
              }}>
                <span>0%</span>
                <span>{formData.progress}%</span>
                <span>100%</span>
              </div>
            </div>

            {/* 评分 */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.colors.text,
                marginBottom: '8px'
              }}>
                评分
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleInputChange('rating', star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '24px',
                      color: star <= formData.rating ? '#F59E0B' : theme.colors.border,
                      padding: '4px'
                    }}
                  >
                    ⭐
                  </button>
                ))}
                <span style={{
                  fontSize: '14px',
                  color: theme.colors.textSecondary,
                  marginLeft: '8px'
                }}>
                  ({formData.rating}/5)
                </span>
              </div>
            </div>

            {/* 标签 */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.colors.text,
                marginBottom: '8px'
              }}>
                标签
              </label>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: theme.colors.white
                  }}
                  placeholder="输入标签后按回车添加"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  添加
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: theme.colors.primary + '20',
                        color: theme.colors.primary,
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: theme.colors.primary,
                          padding: '0',
                          marginLeft: '4px'
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 内容 */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.colors.text,
                marginBottom: '8px'
              }}>
                笔记内容
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: theme.colors.white,
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                placeholder="记录你的阅读笔记..."
              />
            </div>
          </div>

          {/* 按钮 */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: `1px solid ${theme.colors.border}`
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: theme.colors.textSecondary,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              取消
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {note ? '更新笔记' : '创建笔记'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm; 