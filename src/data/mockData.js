import { THEME } from '../constants/theme';

// 文件夹数据
export const FOLDERS = [
  { id: 'ongoing', abbr: 'O', name: 'Ongoing' },
  { id: 'reading', abbr: 'R', name: 'Reading' },
  { id: 'watching', abbr: 'W', name: 'Watching' },
  { id: 'listening', abbr: 'L', name: 'Listening' },
  { id: 'personal', abbr: 'P', name: 'Personal' },
  { id: 'work', abbr: 'Wo', name: 'Work' },
  { id: 'projects', abbr: 'Pr', name: 'Projects' },
  { id: 'books', abbr: 'B', name: 'Books' },
];

// 初始笔记数据
export const INITIAL_NOTES = [
  {
    id: '1',
    title: '提醒事项',
    date: '2024-01-15',
    color: THEME.colors.note.colors[0],
    folderId: 'personal',
    items: [
      'Dentist appointment on Tuesday',
      'Submit report by end of the day',
      'Send email to boss',
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: '每日任务',
    date: '2024-01-16',
    color: THEME.colors.note.colors[1],
    folderId: 'work',
    items: [
      'Review code changes',
      'Attend team meeting',
      'Update project documentation',
    ],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    title: '随机想法',
    date: '2024-01-17',
    color: THEME.colors.note.colors[2],
    folderId: 'personal',
    items: [
      'Success is a journey, not a destination.',
      'Try a new recipe this weekend',
      "Don't forget to water the plants",
    ],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    title: '书籍',
    date: '2024-01-18',
    color: THEME.colors.note.colors[3],
    folderId: 'books',
    items: ['The Alchemist', 'The Power of Now', 'The Art of War'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
];
