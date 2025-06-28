import React, { useMemo } from 'react';
import { useAppState } from '../App';
import Sidebar from '../components/Sidebar';
import { theme } from '../styles/theme';
import { formatDate } from '../utils/dateUtils';

const StatsPage = () => {
  const { state } = useAppState();

  // 计算统计数据
  const stats = useMemo(() => {
    const total = state.notes.length;
    const completed = state.notes.filter(note => note.status === 'completed').length;
    const reading = state.notes.filter(note => note.status === 'reading').length;
    const paused = state.notes.filter(note => note.status === 'paused').length;
    
    const totalPages = state.notes.reduce((sum, note) => sum + (note.totalPages || 0), 0);
    const readPages = state.notes.reduce((sum, note) => sum + (note.currentPage || 0), 0);
    const avgRating = total > 0 ? (state.notes.reduce((sum, note) => sum + note.rating, 0) / total).toFixed(1) : 0;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const readingProgress = totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0;

    // 按月份统计
    const monthlyStats = {};
    state.notes.forEach(note => {
      const month = new Date(note.createdAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
      monthlyStats[month] = (monthlyStats[month] || 0) + 1;
    });

    // 按类型统计
    const typeStats = {};
    state.notes.forEach(note => {
      const type = note.type || '其他';
      typeStats[type] = (typeStats[type] || 0) + 1;
    });

    return {
      total,
      completed,
      reading,
      paused,
      totalPages,
      readPages,
      avgRating,
      completionRate,
      readingProgress,
      monthlyStats,
      typeStats
    };
  }, [state.notes]);

  const StatCard = ({ title, value, subtitle, color, icon }) => (
    <div style={{
      background: theme.colors.white,
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.colors.border}`,
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
      <div style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: color || theme.colors.primary,
        marginBottom: '4px'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '16px',
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: '4px'
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{
          fontSize: '14px',
          color: theme.colors.textSecondary
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );

  const ProgressBar = ({ value, max, label, color }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: '600',
          color: theme.colors.text
        }}>
          {label}
        </span>
        <span style={{
          fontSize: '14px',
          color: theme.colors.textSecondary
        }}>
          {value}%
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: theme.colors.border,
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${value}%`,
          height: '100%',
          backgroundColor: color || theme.colors.primary,
          borderRadius: '4px',
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <main style={{
        flex: 1,
        marginLeft: '250px',
        padding: '20px',
        backgroundColor: theme.colors.background,
        minHeight: '100vh'
      }}>
        {/* 头部 */}
        <div style={{
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: `1px solid ${theme.colors.border}`
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: theme.colors.text,
            margin: '0 0 8px 0'
          }}>
            阅读统计
          </h1>
          <p style={{
            fontSize: '16px',
            color: theme.colors.textSecondary,
            margin: 0
          }}>
            了解你的阅读习惯和进度
          </p>
        </div>

        {/* 主要统计卡片 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <StatCard
            title="总笔记数"
            value={stats.total}
            subtitle="篇笔记"
            color={theme.colors.primary}
            icon="📚"
          />
          <StatCard
            title="已完成"
            value={stats.completed}
            subtitle={`${stats.completionRate}% 完成率`}
            color="#10B981"
            icon="✅"
          />
          <StatCard
            title="阅读中"
            value={stats.reading}
            subtitle="进行中"
            color="#3B82F6"
            icon="📖"
          />
          <StatCard
            title="平均评分"
            value={stats.avgRating}
            subtitle="⭐ 分"
            color="#F59E0B"
            icon="⭐"
          />
        </div>

        {/* 进度统计 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: theme.colors.white,
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.colors.border}`
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: theme.colors.text,
              margin: '0 0 20px 0'
            }}>
              阅读进度
            </h3>
            <ProgressBar
              value={stats.completionRate}
              label="笔记完成率"
              color="#10B981"
            />
            <ProgressBar
              value={stats.readingProgress}
              label="页面阅读进度"
              color="#3B82F6"
            />
          </div>

          <div style={{
            background: theme.colors.white,
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.colors.border}`
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: theme.colors.text,
              margin: '0 0 20px 0'
            }}>
              页面统计
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
                已读页面
              </span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: theme.colors.primary }}>
                {stats.readPages}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
                总页面
              </span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: theme.colors.text }}>
                {stats.totalPages}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
                剩余页面
              </span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: theme.colors.textSecondary }}>
                {stats.totalPages - stats.readPages}
              </span>
            </div>
          </div>
        </div>

        {/* 详细统计 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px'
        }}>
          {/* 月度统计 */}
          <div style={{
            background: theme.colors.white,
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.colors.border}`
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: theme.colors.text,
              margin: '0 0 20px 0'
            }}>
              月度笔记统计
            </h3>
            {Object.keys(stats.monthlyStats).length === 0 ? (
              <p style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
                暂无数据
              </p>
            ) : (
              <div>
                {Object.entries(stats.monthlyStats).map(([month, count]) => (
                  <div key={month} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: `1px solid ${theme.colors.border}`
                  }}>
                    <span style={{ fontSize: '14px', color: theme.colors.text }}>
                      {month}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: theme.colors.primary }}>
                      {count} 篇
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 类型统计 */}
          <div style={{
            background: theme.colors.white,
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.colors.border}`
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: theme.colors.text,
              margin: '0 0 20px 0'
            }}>
              笔记类型分布
            </h3>
            {Object.keys(stats.typeStats).length === 0 ? (
              <p style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
                暂无数据
              </p>
            ) : (
              <div>
                {Object.entries(stats.typeStats).map(([type, count]) => (
                  <div key={type} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: `1px solid ${theme.colors.border}`
                  }}>
                    <span style={{ fontSize: '14px', color: theme.colors.text }}>
                      {type}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: theme.colors.primary }}>
                      {count} 篇
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatsPage; 