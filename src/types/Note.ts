export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  color: string;
  // 为了演示跨文件功能，这个 tags 字段我们稍后会添加
  // tags: Tag[];
}

// 标签接口 - 稍后在演示中会添加
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