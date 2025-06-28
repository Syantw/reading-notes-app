import React from 'react';
import PropTypes from 'prop-types';
import { THEME } from '../../constants/theme';

const NoteCard = ({ note, onClick }) => {
  const cardStyle = {
    background: note.color,
    borderRadius: THEME.borderRadius.card,
    boxShadow: THEME.shadows.card,
    padding: '20px 18px 18px 18px',
    minWidth: 220,
    maxWidth: 240,
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    cursor: 'pointer',
    transition: `transform ${THEME.transitions.normal}, box-shadow ${THEME.transitions.normal}, background-color ${THEME.transitions.fast}`,
    border: '1px solid transparent',
  };

  const hoverStyle = {
    transform: 'translateY(-4px)',
    boxShadow: THEME.shadows.cardHover,
    border: '1px solid rgba(255,255,255,0.3)',
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: 16,
    color: THEME.colors.text.primary,
    marginBottom: 8,
  };

  const dateStyle = {
    fontSize: 13,
    color: THEME.colors.text.secondary,
    marginBottom: 12,
    fontWeight: 500,
  };

  const itemsStyle = {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  };

  const itemStyle = {
    fontSize: 14,
    color: THEME.colors.text.primary,
    marginBottom: 6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const editIconStyle = {
    position: 'absolute',
    right: 16,
    bottom: 12,
    fontSize: 18,
    color: '#7ed957',
    cursor: 'pointer',
    transition: `transform ${THEME.transitions.fast}, opacity ${THEME.transitions.fast}`,
    opacity: 0.7,
  };

  const editIconHoverStyle = {
    transform: 'scale(1.1)',
    opacity: 1,
  };

  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={e => {
        Object.assign(e.currentTarget.style, hoverStyle);
        const icon = e.currentTarget.querySelector('[data-edit-icon]');
        if (icon) {
          Object.assign(icon.style, editIconHoverStyle);
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = THEME.shadows.card;
        e.currentTarget.style.border = '1px solid transparent';
        const icon = e.currentTarget.querySelector('[data-edit-icon]');
        if (icon) {
          icon.style.transform = 'scale(1)';
          icon.style.opacity = '0.7';
        }
      }}
    >
      <div style={titleStyle}>{note.title}</div>
      <div style={dateStyle}>{formatDate(note.date)}</div>
      <ul style={itemsStyle}>
        {note.items.slice(0, 3).map((item, index) => (
          <li key={index} style={itemStyle} title={item}>
            {item}
          </li>
        ))}
        {note.items.length > 3 && (
          <li style={{ ...itemStyle, fontStyle: 'italic' }}>
            +{note.items.length - 3} more items...
          </li>
        )}
      </ul>
      <span data-edit-icon style={editIconStyle} title="View Details">
        👁️
      </span>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    color: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NoteCard;
