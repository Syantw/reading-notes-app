import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { THEME } from '../../constants/theme';
import { FOLDERS } from '../../data/mockData';

const Detail = ({ note, onSave, onClose, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: note?.title || '',
    date: note?.date || '',
    color: note?.color || THEME.colors.note.colors[0],
    folderId: note?.folderId || 'personal',
    items: note?.items?.join('\n') || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedNote = {
      ...note,
      title: editForm.title,
      date: editForm.date,
      color: editForm.color,
      folderId: editForm.folderId,
      items: editForm.items.split('\n').filter(Boolean),
      updatedAt: new Date(),
    };
    onSave(updatedNote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: note?.title || '',
      date: note?.date || '',
      color: note?.color || THEME.colors.note.colors[0],
      folderId: note?.folderId || 'personal',
      items: note?.items?.join('\n') || '',
    });
    setIsEditing(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
    animation: 'fadeIn 0.3s ease',
  };

  const modalStyle = {
    background: THEME.colors.sidebar.bg,
    borderRadius: THEME.borderRadius.large,
    boxShadow: THEME.shadows.modal,
    width: '90%',
    maxWidth: 600,
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    transform: 'scale(1)',
    transition: `transform ${THEME.transitions.normal}`,
    animation: 'slideUp 0.3s ease',
  };

  const headerStyle = {
    padding: '24px 32px',
    borderBottom: `1px solid ${THEME.colors.sidebar.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const contentStyle = {
    padding: '32px',
  };

  const footerStyle = {
    padding: '24px 32px',
    borderTop: `1px solid ${THEME.colors.sidebar.border}`,
    display: 'flex',
    gap: 12,
    justifyContent: 'flex-end',
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
    boxShadow: THEME.shadows.button,
    transition: `all ${THEME.transitions.fast}`,
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: '#f0f0f0',
    color: THEME.colors.text.primary,
    transition: `all ${THEME.transitions.fast}`,
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    background: THEME.colors.status.error,
    color: THEME.colors.text.white,
    boxShadow: THEME.shadows.button,
    transition: `all ${THEME.transitions.fast}`,
  };

  const inputStyle = {
    width: '100%',
    padding: 12,
    borderRadius: THEME.borderRadius.small,
    border: `1px solid ${THEME.colors.sidebar.border}`,
    fontSize: 14,
    marginBottom: 16,
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: 120,
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  const getCurrentFolder = () => {
    return FOLDERS.find(
      f => f.id === (isEditing ? editForm.folderId : note?.folderId),
    );
  };

  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!note) return null;

  return (
    <div style={containerStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  marginBottom: 0,
                  fontSize: 20,
                  fontWeight: 700,
                }}
                placeholder="Note title"
              />
            ) : (
              <h2
                style={{
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 700,
                  color: THEME.colors.text.primary,
                }}
              >
                {note.title}
              </h2>
            )}
          </div>
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: THEME.colors.text.secondary,
            }}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div style={contentStyle}>
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: 'flex',
                gap: 16,
                marginBottom: 16,
                fontSize: 14,
                color: THEME.colors.text.secondary,
              }}
            >
              {isEditing ? (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>
                      Date:
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>
                      Folder:
                    </label>
                    <select
                      name="folderId"
                      value={editForm.folderId}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      {FOLDERS.map(folder => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 4 }}>
                      Color:
                    </label>
                    <select
                      name="color"
                      value={editForm.color}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      {THEME.colors.note.colors.map((color, index) => (
                        <option key={color} value={color}>
                          Color {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>📅 {formatDate(note.date)}</div>
                  <div>📁 {getCurrentFolder()?.name || 'Unknown'}</div>
                  <div>
                    🎨{' '}
                    <span
                      style={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        backgroundColor: note.color,
                        borderRadius: '50%',
                        verticalAlign: 'middle',
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: THEME.colors.text.primary,
                marginBottom: 12,
              }}
            >
              Content
            </h3>
            {isEditing ? (
              <textarea
                name="items"
                value={editForm.items}
                onChange={handleInputChange}
                style={textareaStyle}
                placeholder="One item per line"
              />
            ) : (
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {note.items?.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '8px 0',
                      borderBottom: `1px solid ${THEME.colors.sidebar.border}`,
                      fontSize: 14,
                      color: THEME.colors.text.primary,
                    }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div style={footerStyle}>
          {isEditing ? (
            <>
              <button style={secondaryButtonStyle} onClick={handleCancel}>
                Cancel
              </button>
              <button style={primaryButtonStyle} onClick={handleSave}>
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                style={dangerButtonStyle}
                onClick={() => onDelete(note.id)}
              >
                Delete
              </button>
              <button style={secondaryButtonStyle} onClick={handleEdit}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    color: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Detail;
