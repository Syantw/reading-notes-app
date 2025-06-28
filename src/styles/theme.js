// 阅读笔记应用主题配置
export const theme = {
  // 主色调 - 温暖的阅读色调
  colors: {
    primary: {
      50: '#fef7ed',
      100: '#fdedd4',
      200: '#fbd7a9',
      300: '#f8bb72',
      400: '#f5953a',
      500: '#f3771e',
      600: '#e45d13',
      700: '#bd4512',
      800: '#963816',
      900: '#7a3015',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // 笔记类型颜色
    noteTypes: {
      reading: '#e6f3ff',    // 阅读笔记 - 蓝色
      watching: '#fff2e6',   // 观影笔记 - 橙色
      listening: '#f0f9ff',  // 听书笔记 - 浅蓝
      personal: '#f0fdf4',   // 个人随笔 - 绿色
      work: '#fef3f2',       // 工作笔记 - 红色
      study: '#faf5ff',      // 学习笔记 - 紫色
    },
    // 状态颜色
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    // 背景色
    background: {
      main: '#f8fafc',
      sidebar: '#ffffff',
      card: '#ffffff',
      modal: '#ffffff',
    },
    // 文字颜色
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      muted: '#94a3b8',
      inverse: '#ffffff',
    },
  },
  
  // 阴影
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // 圆角
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
  },
  
  // 字体
  fonts: {
    sans: "'Inter', 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    serif: "'Georgia', 'Times New Roman', serif",
    mono: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
  },
  
  // 字体大小
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  
  // 间距
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  
  // 断点
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// 笔记类型配置
export const noteTypes = {
  reading: {
    name: '阅读笔记',
    icon: '📚',
    color: theme.colors.noteTypes.reading,
    description: '记录书籍、文章、论文等阅读内容',
  },
  watching: {
    name: '观影笔记',
    icon: '🎬',
    color: theme.colors.noteTypes.watching,
    description: '记录电影、纪录片、视频等观看体验',
  },
  listening: {
    name: '听书笔记',
    icon: '🎧',
    color: theme.colors.noteTypes.listening,
    description: '记录播客、有声书等音频内容',
  },
  personal: {
    name: '个人随笔',
    icon: '✍️',
    color: theme.colors.noteTypes.personal,
    description: '记录想法、感悟、创意等',
  },
  work: {
    name: '工作笔记',
    icon: '💼',
    color: theme.colors.noteTypes.work,
    description: '记录工作相关的内容和想法',
  },
  study: {
    name: '学习笔记',
    icon: '🎓',
    color: theme.colors.noteTypes.study,
    description: '记录学习过程中的重点和心得',
  },
};

// 文件夹配置
export const folders = [
  { id: 'ongoing', name: '进行中', icon: '🔄', count: 12 },
  { id: 'completed', name: '已完成', icon: '✅', count: 45 },
  { id: 'favorites', name: '收藏夹', icon: '⭐', count: 8 },
  { id: 'drafts', name: '草稿箱', icon: '📝', count: 3 },
  { id: 'archived', name: '归档', icon: '📦', count: 67 },
]; 