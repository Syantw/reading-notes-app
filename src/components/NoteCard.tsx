import React from 'react';
import { Note } from '../types/Note';

interface NoteCardProps {
  note: Note;
  theme: 'light' | 'dark';
  onEdit?: (note: Note) => void;
  // 为演示准备 - 这个 prop 会在添加 tags 功能时用到
  // onTagClick?: (tag: Tag) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  theme, 
  onEdit 
}) => {
  const cardShadow = theme === "dark" 
    ? "0 2px 8px rgba(255,255,255,0.08)" 
    : "0 2px 8px rgba(0,0,0,0.04)";

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(note);
    }
  };

  return (
    <div
      style={{
        background: note.color,
        borderRadius: 18,
        boxShadow: cardShadow,
        padding: "20px 18px 18px 18px",
        minWidth: 220,
        maxWidth: 240,
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 16,
          color: "#222",
          marginBottom: 8,
        }}
      >
        {note.title}
      </div>
      
      <div
        style={{
          fontSize: 13,
          color: "#666",
          marginBottom: 12,
          fontWeight: 500,
        }}
      >
        {note.createdAt.toLocaleDateString()}
      </div>
      
      <div
        style={{
          fontSize: 14,
          color: "#333",
          marginBottom: 12,
          flexGrow: 1
        }}
      >
        {note.content}
      </div>

      {/* 这里将在演示中添加标签显示 */}
      {/* {note.tags && note.tags.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {note.tags.map(tag => (
            <TagBadge key={tag.id} tag={tag} onClick={onTagClick} />
          ))}
        </div>
      )} */}

      <span
        style={{
          position: "absolute",
          right: 16,
          bottom: 12,
          fontSize: 18,
          color: "#7ed957",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        title="Edit"
        onClick={handleEditClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        ✎
      </span>
    </div>
  );
};

export default NoteCard; 