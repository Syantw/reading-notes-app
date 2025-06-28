import { useState, useEffect, useCallback } from 'react';
import { getCurrentDate } from '../utils/dateUtils';
import { noteTypes } from '../styles/theme';

// 笔记数据结构
const initialNotes = [
  {
    id: '1',
    title: '《浮生六记》读书笔记',
    type: 'reading',
    content: [
      '沈复与芸娘的伉俪情深令人动容',
      '书中对生活细节的描写非常细腻',
      '体现了清代文人的生活情趣和审美追求',
      '值得反复品读的经典之作'
    ],
    date: '2025-06-27',
    tags: ['古典文学', '生活随笔', '爱情'],
    status: 'completed',
    rating: 5,
    author: '沈复',
    progress: 100,
  },
  {
    id: '2',
    title: '《三体》科幻小说笔记',
    type: 'reading',
    content: [
      '刘慈欣的想象力令人震撼',
      '黑暗森林法则的设定非常深刻',
      '对人类文明的思考发人深省',
      '科幻与哲学的完美结合'
    ],
    date: '2025-06-25',
    tags: ['科幻', '哲学', '文明'],
    status: 'ongoing',
    rating: 5,
    author: '刘慈欣',
    progress: 60,
  },
  {
    id: '3',
    title: '《肖申克的救赎》观影笔记',
    type: 'watching',
    content: [
      '希望是好事，也许是最好的事',
      '安迪的智慧和毅力令人敬佩',
      '监狱中的友谊和人性光辉',
      '经典台词："希望让人自由"'
    ],
    date: '2025-06-20',
    tags: ['电影', '励志', '人性'],
    status: 'completed',
    rating: 5,
    director: '弗兰克·德拉邦特',
    year: 1994,
  },
  {
    id: '4',
    title: '《得到》听书笔记 - 认知升级',
    type: 'listening',
    content: [
      '认知升级的三个层次：知识、技能、智慧',
      '终身学习的重要性',
      '如何建立知识体系',
      '实践是检验真理的唯一标准'
    ],
    date: '2025-06-22',
    tags: ['认知', '学习', '成长'],
    status: 'ongoing',
    rating: 4,
    author: '罗振宇',
    progress: 30,
  },
  {
    id: '5',
    title: '关于时间管理的思考',
    type: 'personal',
    content: [
      '时间是最宝贵的资源',
      '番茄工作法的实践心得',
      '重要与紧急的四象限法则',
      '专注力比时间更重要'
    ],
    date: '2025-06-26',
    tags: ['时间管理', '效率', '思考'],
    status: 'draft',
    rating: 0,
  },
];

export const useNotes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [filteredNotes, setFilteredNotes] = useState(initialNotes);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all',
    search: '',
  });

  // 添加新笔记
  const addNote = useCallback((noteData) => {
    const newNote = {
      id: Date.now().toString(),
      date: getCurrentDate(),
      status: 'ongoing',
      progress: 0,
      rating: 0,
      tags: [],
      ...noteData,
    };
    
    setNotes(prev => [newNote, ...prev]);
  }, []);

  // 更新笔记
  const updateNote = useCallback((id, updates) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id ? { ...note, ...updates } : note
      )
    );
  }, []);

  // 删除笔记
  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  }, []);

  // 切换笔记状态
  const toggleNoteStatus = useCallback((id) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { 
              ...note, 
              status: note.status === 'completed' ? 'ongoing' : 'completed',
              progress: note.status === 'completed' ? 0 : 100
            }
          : note
      )
    );
  }, []);

  // 更新进度
  const updateProgress = useCallback((id, progress) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { 
              ...note, 
              progress: Math.max(0, Math.min(100, progress)),
              status: progress >= 100 ? 'completed' : 'ongoing'
            }
          : note
      )
    );
  }, []);

  // 添加标签
  const addTag = useCallback((id, tag) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, tags: [...new Set([...note.tags, tag])] }
          : note
      )
    );
  }, []);

  // 移除标签
  const removeTag = useCallback((id, tag) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, tags: note.tags.filter(t => t !== tag) }
          : note
      )
    );
  }, []);

  // 搜索笔记
  const searchNotes = useCallback((query) => {
    setFilters(prev => ({ ...prev, search: query }));
  }, []);

  // 过滤笔记
  const filterNotes = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // 应用过滤器
  useEffect(() => {
    let filtered = notes;

    // 按类型过滤
    if (filters.type !== 'all') {
      filtered = filtered.filter(note => note.type === filters.type);
    }

    // 按状态过滤
    if (filters.status !== 'all') {
      filtered = filtered.filter(note => note.status === filters.status);
    }

    // 按日期范围过滤
    if (filters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(note => {
        const noteDate = new Date(note.date);
        switch (filters.dateRange) {
          case 'today':
            return noteDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return noteDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return noteDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // 按搜索关键词过滤
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchLower) ||
        note.content.some(item => item.toLowerCase().includes(searchLower)) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredNotes(filtered);
  }, [notes, filters]);

  // 获取统计信息
  const getStats = useCallback(() => {
    const total = notes.length;
    const completed = notes.filter(note => note.status === 'completed').length;
    const ongoing = notes.filter(note => note.status === 'ongoing').length;
    const drafts = notes.filter(note => note.status === 'draft').length;
    
    const typeStats = Object.keys(noteTypes).reduce((acc, type) => {
      acc[type] = notes.filter(note => note.type === type).length;
      return acc;
    }, {});

    return {
      total,
      completed,
      ongoing,
      drafts,
      typeStats,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [notes]);

  return {
    notes: filteredNotes,
    allNotes: notes,
    filters,
    addNote,
    updateNote,
    deleteNote,
    toggleNoteStatus,
    updateProgress,
    addTag,
    removeTag,
    searchNotes,
    filterNotes,
    getStats,
  };
}; 