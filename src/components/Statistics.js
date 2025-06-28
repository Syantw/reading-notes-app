import React from 'react';
import './Statistics.css';

const Statistics = ({ notes }) => {
  // 计算统计数据
  const totalNotes = notes.length;
  const completedNotes = notes.filter(note => note.progress === 100).length;
  const ongoingNotes = notes.filter(note => note.progress > 0 && note.progress < 100).length;
  const notStartedNotes = notes.filter(note => note.progress === 0).length;
  
  // 按类型统计
  const typeStats = notes.reduce((acc, note) => {
    acc[note.type] = (acc[note.type] || 0) + 1;
    return acc;
  }, {});
  
  // 按月份统计
  const monthlyStats = notes.reduce((acc, note) => {
    const month = note.date.substring(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  
  // 平均进度
  const averageProgress = totalNotes > 0 
    ? Math.round(notes.reduce((sum, note) => sum + note.progress, 0) / totalNotes)
    : 0;
  
  // 最活跃的标签
  const tagStats = notes.reduce((acc, note) => {
    note.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
  
  const topTags = Object.entries(tagStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="statistics-page">
      <div className="stats-header">
        <h1>阅读统计</h1>
        <p>了解你的阅读进度和习惯</p>
      </div>
      
      <div className="stats-grid">
        {/* 概览卡片 */}
        <div className="stats-card overview">
          <h3>总体概览</h3>
          <div className="overview-stats">
            <div className="stat-item">
              <div className="stat-number">{totalNotes}</div>
              <div className="stat-label">总笔记数</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{completedNotes}</div>
              <div className="stat-label">已完成</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{ongoingNotes}</div>
              <div className="stat-label">进行中</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{notStartedNotes}</div>
              <div className="stat-label">未开始</div>
            </div>
          </div>
        </div>
        
        {/* 进度统计 */}
        <div className="stats-card progress">
          <h3>平均进度</h3>
          <div className="progress-circle">
            <div className="progress-ring">
              <svg width="120" height="120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e9ecef"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#667eea"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - averageProgress / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="progress-text">
                <span className="progress-percentage">{averageProgress}%</span>
                <span className="progress-label">平均完成度</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 类型分布 */}
        <div className="stats-card types">
          <h3>笔记类型分布</h3>
          <div className="type-chart">
            {Object.entries(typeStats).map(([type, count]) => {
              const percentage = Math.round((count / totalNotes) * 100);
              return (
                <div key={type} className="type-bar">
                  <div className="type-info">
                    <span className="type-name">{type}</span>
                    <span className="type-count">{count}</span>
                  </div>
                  <div className="type-progress">
                    <div 
                      className="type-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="type-percentage">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 热门标签 */}
        <div className="stats-card tags">
          <h3>热门标签</h3>
          <div className="tag-cloud">
            {topTags.map(([tag, count]) => (
              <div 
                key={tag} 
                className="tag-item"
                style={{ 
                  fontSize: `${Math.max(12, Math.min(20, 12 + count * 2))}px`,
                  opacity: Math.max(0.6, Math.min(1, 0.6 + count * 0.1))
                }}
              >
                {tag}
                <span className="tag-count">({count})</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 月度趋势 */}
        <div className="stats-card monthly">
          <h3>月度趋势</h3>
          <div className="monthly-chart">
            {Object.entries(monthlyStats)
              .sort(([a], [b]) => a.localeCompare(b))
              .slice(-6)
              .map(([month, count]) => (
                <div key={month} className="month-bar">
                  <div className="month-label">{month}</div>
                  <div className="month-bar-container">
                    <div 
                      className="month-fill" 
                      style={{ height: `${(count / Math.max(...Object.values(monthlyStats))) * 100}%` }}
                    ></div>
                  </div>
                  <div className="month-count">{count}</div>
                </div>
              ))}
          </div>
        </div>
        
        {/* 最近活动 */}
        <div className="stats-card recent">
          <h3>最近活动</h3>
          <div className="recent-activity">
            {notes
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map(note => (
                <div key={note.id} className="activity-item">
                  <div className="activity-icon">📝</div>
                  <div className="activity-content">
                    <div className="activity-title">{note.title}</div>
                    <div className="activity-meta">
                      {note.date} • {note.progress}% 完成
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 