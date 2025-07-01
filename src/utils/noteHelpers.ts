import { Note, CreateNoteData, NoteColor } from '../types/Note';

export const createNote = (data: CreateNoteData): Note => {
  return {
    id: Date.now().toString(),
    title: data.title,
    content: data.content,
    color: data.color,
    createdAt: new Date(),
  };
};

export const getNotesByColor = (notes: Note[], color: string): Note[] => {
  return notes.filter(note => note.color === color);
};

export const getRandomNoteColor = (): string => {
  const colors = Object.values(NoteColor);
  return colors[Math.floor(Math.random() * colors.length)];
};

// 这些函数将在演示中添加，用于处理标签功能
// export const getTagsByColor = (notes: Note[], color: string) => {
//   return notes.flatMap(note => note.tags?.filter(tag => tag.color === color) || []);
// };

// export const getNotesWithTag = (notes: Note[], tagName: string): Note[] => {
//   return notes.filter(note => 
//     note.tags?.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())
//   );
// }; 