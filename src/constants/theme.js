// 主题配置
export const THEME = {
  colors: {
    sidebar: {
      bg: '#fff',
      border: '#f0f0f0',
    },
    main: {
      bg: '#f7f8fa',
    },
    note: {
      colors: [
        '#e6e6fa',
        '#ffe4c4',
        '#e6ffe6',
        '#fff9e6',
        '#ffd6d6',
        '#e6f3ff',
      ],
    },
    folder: {
      color: '#ffcc66',
      gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
      active: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    text: {
      primary: '#222',
      secondary: '#888',
      white: '#fff',
      muted: '#999',
    },
    status: {
      success: '#00b894',
      warning: '#fdcb6e',
      error: '#e17055',
      info: '#74b9ff',
    },
    interactive: {
      hover: '#f8f9fa',
      active: '#e9ecef',
      focus: '#007bff',
    },
  },
  shadows: {
    card: '0 2px 8px rgba(0,0,0,0.04)',
    cardHover: '0 4px 12px rgba(0,0,0,0.08)',
    modal: '0 10px 25px rgba(0,0,0,0.15)',
    button: '0 2px 4px rgba(0,0,0,0.1)',
  },
  spacing: {
    sidebar: {
      width: 260,
      padding: '32px 0 24px 0',
      innerPadding: '0 32px',
    },
    main: {
      padding: '48px 48px 0 48px',
    },
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    card: 18,
    button: 6,
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
  fontFamily:
    "'Inter', 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
};
