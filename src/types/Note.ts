export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  color: string;
  // 新增字段 - 这些将在演示中逐步添加
  // category: NoteCategory;
  // priority: NotePriority;
  // status: NoteStatus;
  // tags: Tag[];
}

// 这些枚举将在演示中逐步添加
// export enum NoteCategory {
//   WORK = 'work',
//   PERSONAL = 'personal',
//   LEARNING = 'learning',
//   PROJECT = 'project'
// }

// export enum NotePriority {
//   LOW = 'low',
//   MEDIUM = 'medium',
//   HIGH = 'high',
//   URGENT = 'urgent'
// }

// export enum NoteStatus {
//   TODO = 'todo',
//   IN_PROGRESS = 'in_progress',
//   DONE = 'done',
//   ARCHIVED = 'archived'
// }

// export interface Tag {
//   id: string;
//   name: string;
//   color: string;
// }

export enum NoteColor {
  Purple = "#e6e6fa",
  Beige = "#ffe4c4", 
  Green = "#e6ffe6",
  Yellow = "#fff9e6"
}

export interface CreateNoteData {
  title: string;
  content: string;
  color: string;
} 