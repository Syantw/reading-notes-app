import React, { useState, useEffect } from 'react';
import { theme, noteTypes } from '../styles/theme';
import { getCurrentDate } from '../utils/dateUtils';

const NoteForm = ({ note, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState({
    title: '',
    type: 'reading',
    content: '',
    date: getCurrentDate(),
    tags: '',
    author: '',
    director: '',
    year: '',
    rating: 0,
    progress: 0,
    status: 'ongoing',
  });

  useEffect(() => {
    if (note) {
      setForm({
        title: note.title || '',
        type: note.type || 'reading',
        content: note.content ? note.content.join('\n') : '',
        date: note.date || getCurrentDate(),
        tags: note.tags ? note.tags.join(', ') : '',
        author: note.author || '',
        director: note.director || '',
        year: note.year || '',
        rating: note.rating || 0,
        progress: note.progress || 0,
        status: note.status || 'ongoing',
      });
    }
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    const noteData = {
      title: form.title.trim(),
      type: form.type,
      content: form.content.split('\n').filter(line => line.trim()),
      date: form.date,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: form.status,
      rating: parseInt(form.rating) || 0,
      progress: parseInt(form.progress) || 0,
    };

    // 根据笔记类型添加特定字段
    if (form.type === 'reading' && form.author) {
      noteData.author = form.author.trim();
    }
    if (form.type === 'watching' && form.director) {
      noteData.director = form.director.trim();
      if (form.year) {
        noteData.year = parseInt(form.year);
      }
    }
    if (form.type === 'listening' && form.author) {
      noteData.author = form.author.trim();
    }

    onSubmit(noteData);
  };

  const getTypeSpecificFields = () => {
    switch (form.type) {
      case 'reading':
        return (
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>作者</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="例如：沈复"
              style={inputStyle}
            />
          </div>
        );
      case 'watching':
        return (
          <>
            <div style={{ marginBottom: theme.spacing[4] }}>
              <label style={labelStyle}>导演</label>
              <input
                name="director"
                value={form.director}
                onChange={handleChange}
                placeholder="例如：弗兰克·德拉邦特"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: theme.spacing[4] }}>
              <label style={labelStyle}>年份</label>
              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="例如：1994"
                style={inputStyle}
              />
            </div>
          </>
        );
      case 'listening':
        return (
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>作者/主播</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="例如：罗振宇"
              style={inputStyle}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const labelStyle = {
    display: 'block',
    marginBottom: theme.spacing[2],
    fontWeight: 600,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.primary,
  };

  const inputStyle = {
    width: '100%',
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    border: `1px solid ${theme.colors.secondary[200]}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.fontSize.sm,
    background: theme.colors.background.card,
    color: theme.colors.text.primary,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: theme.spacing[4],
      }}
    >
      <div
        style={{
          background: theme.colors.background.modal,
          borderRadius: theme.borderRadius.xl,
          boxShadow: theme.shadows.xl,
          padding: theme.spacing[8],
          maxWidth: 600,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing[6],
          }}
        >
          <h2 style={{ 
            margin: 0, 
            fontWeight: 700, 
            fontSize: theme.fontSize['2xl'],
            color: theme.colors.text.primary,
          }}>
            {isEdit ? '编辑笔记' : '创建新笔记'}
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: theme.colors.text.muted,
              padding: theme.spacing[1],
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 笔记类型 */}
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>笔记类型</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              style={selectStyle}
            >
              {Object.entries(noteTypes).map(([key, type]) => (
                <option key={key} value={key}>
                  {type.icon} {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* 标题 */}
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>标题 *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="例如：《浮生六记》读书笔记"
              style={inputStyle}
              required
            />
          </div>

          {/* 日期 */}
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>日期</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* 类型特定字段 */}
          {getTypeSpecificFields()}

          {/* 状态 */}
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>状态</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="ongoing">进行中</option>
              <option value="completed">已完成</option>
              <option value="draft">草稿</option>
            </select>
          </div>

          {/* 进度 */}
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>进度 (%)</label>
            <input
              name="progress"
              type="number"
              min="0"
              max="100"
              value={form.progress}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* 评分 */}
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>评分</label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="0">未评分</option>
              <option value="1">⭐ 1星</option>
              <option value="2">⭐⭐ 2星</option>
              <option value="3">⭐⭐⭐ 3星</option>
              <option value="4">⭐⭐⭐⭐ 4星</option>
              <option value="5">⭐⭐⭐⭐⭐ 5星</option>
            </select>
          </div>

          {/* 标签 */}
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label style={labelStyle}>标签</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="用逗号分隔，例如：古典文学, 生活随笔, 爱情"
              style={inputStyle}
            />
          </div>

          {/* 内容 */}
          <div style={{ marginBottom: theme.spacing[6] }}>
            <label style={labelStyle}>内容 *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="每行一个要点，例如：&#10;沈复与芸娘的伉俪情深令人动容&#10;书中对生活细节的描写非常细腻&#10;体现了清代文人的生活情趣和审美追求"
              style={{
                ...inputStyle,
                minHeight: '120px',
                resize: 'vertical',
                fontFamily: theme.fonts.sans,
              }}
              required
            />
          </div>

          {/* 按钮 */}
          <div
            style={{
              display: 'flex',
              gap: theme.spacing[3],
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                border: `1px solid ${theme.colors.secondary[200]}`,
                borderRadius: theme.borderRadius.md,
                background: theme.colors.background.card,
                color: theme.colors.text.secondary,
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: theme.fontSize.sm,
                transition: 'all 0.2s ease',
              }}
            >
              取消
            </button>
            <button
              type="submit"
              style={{
                padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                border: 'none',
                borderRadius: theme.borderRadius.md,
                background: `linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.primary[600]} 100%)`,
                color: theme.colors.text.inverse,
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: theme.fontSize.sm,
                transition: 'all 0.2s ease',
              }}
            >
              {isEdit ? '保存修改' : '创建笔记'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm; 