// 日期处理工具函数

/**
 * 格式化日期为可读字符串
 * @param {Date|string} date - 日期对象或日期字符串
 * @param {string} format - 格式化类型 ('short', 'long', 'relative')
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'short') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '无效日期';
  }
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    case 'long':
      return dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
    case 'relative':
      return getRelativeTime(dateObj);
    default:
      return dateObj.toLocaleDateString('zh-CN');
  }
};

/**
 * 获取相对时间描述
 * @param {Date} date - 日期对象
 * @returns {string} 相对时间描述
 */
const getRelativeTime = (date) => {
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
  if (diffInDays > 0) {
    if (diffInDays === 1) return '昨天';
    if (diffInDays < 7) return `${diffInDays}天前`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}周前`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}个月前`;
    return `${Math.floor(diffInDays / 365)}年前`;
  }
  
  if (diffInHours > 0) {
    return `${diffInHours}小时前`;
  }
  
  if (diffInMinutes > 0) {
    return `${diffInMinutes}分钟前`;
  }
  
  return '刚刚';
};

/**
 * 获取当前日期字符串
 * @returns {string} 当前日期字符串 (YYYY-MM-DD)
 */
export const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

/**
 * 检查日期是否为今天
 * @param {Date|string} date - 日期对象或日期字符串
 * @returns {boolean} 是否为今天
 */
export const isToday = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * 检查日期是否为本周
 * @param {Date|string} date - 日期对象或日期字符串
 * @returns {boolean} 是否为本周
 */
export const isThisWeek = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return dateObj >= startOfWeek && dateObj <= endOfWeek;
};

/**
 * 获取日期范围标签
 * @param {Date|string} date - 日期对象或日期字符串
 * @returns {string} 日期范围标签
 */
export const getDateRangeLabel = (date) => {
  if (isToday(date)) return '今天';
  if (isThisWeek(date)) return '本周';
  return '更早';
}; 