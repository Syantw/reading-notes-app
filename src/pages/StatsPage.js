import React from 'react';
import { theme, noteTypes } from '../styles/theme';
import { useNotes } from '../hooks/useNotes';

const StatsPage = () => {
  const { allNotes, getStats } = useNotes();
  const stats = getStats();

  // 计算月度统计
  const getMonthlyStats = () => {
    const months = {};
    const now = new Date();
    
    allNotes.forEach(note => {
      const noteDate = new Date(note.date);
      const monthKey = `${noteDate.getFullYear()}-${String(noteDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (!months[monthKey]) {
        months[monthKey] = {
          total: 0,
          completed: 0,
          ongoing: 0,
          types: {}
        };
      }
      
      months[monthKey].total++;
      months[monthKey][note.status]++;
      
      if (!months[monthKey].types[note.type]) {
        months[monthKey].types[note.type] = 0;
      }
      months[monthKey].types[note.type]++;
    });
    
    return Object.entries(months)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 6);
  };

  // 计算标签统计
  const getTagStats = () => {
    const tagCounts = {};
    
    allNotes.forEach(note => {
      note.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  };

  const monthlyStats = getMonthlyStats();
  const tagStats = getTagStats();

  return (
    <div
      style={{
        background: theme.colors.background.main,
        minHeight: '100vh',
        fontFamily: theme.fonts.sans,
        padding: theme.spacing[8],
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* 头部 */}
        <div style={{ marginBottom: theme.spacing[8] }}>
          <h1
            style={{
              fontWeight: 700,
              fontSize: theme.fontSize['3xl'],
              color: theme.colors.text.primary,
              margin: 0,
              marginBottom: theme.spacing[2],
            }}
          >
            阅读统计
          </h1>
          <p
            style={{
              fontSize: theme.fontSize.lg,
              color: theme.colors.text.secondary,
              margin: 0,
            }}
          >
            了解你的阅读习惯和进度
          </p>
        </div>

        {/* 概览卡片 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: theme.spacing[6],
            marginBottom: theme.spacing[8],
          }}
        >
          <div
            style={{
              background: theme.colors.background.card,
              padding: theme.spacing[6],
              borderRadius: theme.borderRadius.xl,
              boxShadow: theme.shadows.md,
              border: `1px solid ${theme.colors.secondary[100]}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: theme.fontSize['4xl'],
                fontWeight: 700,
                color: theme.colors.primary[600],
                marginBottom: theme.spacing[2],
              }}
            >
              {stats.total}
            </div>
            <div
              style={{
                fontSize: theme.fontSize.lg,
                color: theme.colors.text.primary,
                fontWeight: 600,
                marginBottom: theme.spacing[1],
              }}
            >
              总笔记数
            </div>
            <div
              style={{
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              累计记录的知识
            </div>
          </div>

          <div
            style={{
              background: theme.colors.background.card,
              padding: theme.spacing[6],
              borderRadius: theme.borderRadius.xl,
              boxShadow: theme.shadows.md,
              border: `1px solid ${theme.colors.secondary[100]}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: theme.fontSize['4xl'],
                fontWeight: 700,
                color: theme.colors.status.success,
                marginBottom: theme.spacing[2],
              }}
            >
              {stats.completed}
            </div>
            <div
              style={{
                fontSize: theme.fontSize.lg,
                color: theme.colors.text.primary,
                fontWeight: 600,
                marginBottom: theme.spacing[1],
              }}
            >
              已完成
            </div>
            <div
              style={{
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              完成率 {stats.completionRate}%
            </div>
          </div>

          <div
            style={{
              background: theme.colors.background.card,
              padding: theme.spacing[6],
              borderRadius: theme.borderRadius.xl,
              boxShadow: theme.shadows.md,
              border: `1px solid ${theme.colors.secondary[100]}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: theme.fontSize['4xl'],
                fontWeight: 700,
                color: theme.colors.status.info,
                marginBottom: theme.spacing[2],
              }}
            >
              {stats.ongoing}
            </div>
            <div
              style={{
                fontSize: theme.fontSize.lg,
                color: theme.colors.text.primary,
                fontWeight: 600,
                marginBottom: theme.spacing[1],
              }}
            >
              进行中
            </div>
            <div
              style={{
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              正在学习的内容
            </div>
          </div>

          <div
            style={{
              background: theme.colors.background.card,
              padding: theme.spacing[6],
              borderRadius: theme.borderRadius.xl,
              boxShadow: theme.shadows.md,
              border: `1px solid ${theme.colors.secondary[100]}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: theme.fontSize['4xl'],
                fontWeight: 700,
                color: theme.colors.status.warning,
                marginBottom: theme.spacing[2],
              }}
            >
              {stats.drafts}
            </div>
            <div
              style={{
                fontSize: theme.fontSize.lg,
                color: theme.colors.text.primary,
                fontWeight: 600,
                marginBottom: theme.spacing[1],
              }}
            >
              草稿
            </div>
            <div
              style={{
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              待完善的想法
            </div>
          </div>
        </div>

        {/* 笔记类型分布 */}
        <div
          style={{
            background: theme.colors.background.card,
            padding: theme.spacing[6],
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.secondary[100]}`,
            marginBottom: theme.spacing[8],
          }}
        >
          <h2
            style={{
              fontSize: theme.fontSize.xl,
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              marginBottom: theme.spacing[6],
            }}
          >
            笔记类型分布
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: theme.spacing[4],
            }}
          >
            {Object.entries(noteTypes).map(([key, type]) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: theme.spacing[4],
                  background: `${type.color}20`,
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid ${type.color}40`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: type.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginRight: theme.spacing[3],
                  }}
                >
                  {type.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: theme.fontSize.lg,
                      fontWeight: 600,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    {type.name}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSize['2xl'],
                      fontWeight: 700,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {stats.typeStats[key] || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 月度趋势 */}
        <div
          style={{
            background: theme.colors.background.card,
            padding: theme.spacing[6],
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.secondary[100]}`,
            marginBottom: theme.spacing[8],
          }}
        >
          <h2
            style={{
              fontSize: theme.fontSize.xl,
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              marginBottom: theme.spacing[6],
            }}
          >
            月度趋势
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: theme.spacing[4],
                minWidth: 600,
              }}
            >
              {monthlyStats.map(([month, data]) => (
                <div
                  key={month}
                  style={{
                    textAlign: 'center',
                    padding: theme.spacing[4],
                    background: theme.colors.primary[50],
                    borderRadius: theme.borderRadius.lg,
                    border: `1px solid ${theme.colors.primary[100]}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: theme.fontSize.sm,
                      color: theme.colors.text.secondary,
                      marginBottom: theme.spacing[2],
                    }}
                  >
                    {month}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSize['2xl'],
                      fontWeight: 700,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    {data.total}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSize.xs,
                      color: theme.colors.text.muted,
                    }}
                  >
                    完成: {data.completed}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 热门标签 */}
        <div
          style={{
            background: theme.colors.background.card,
            padding: theme.spacing[6],
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.secondary[100]}`,
          }}
        >
          <h2
            style={{
              fontSize: theme.fontSize.xl,
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              marginBottom: theme.spacing[6],
            }}
          >
            热门标签
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.spacing[3],
            }}
          >
            {tagStats.map(([tag, count]) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                  background: theme.colors.primary[100],
                  color: theme.colors.primary[700],
                  borderRadius: theme.borderRadius.lg,
                  fontSize: theme.fontSize.sm,
                  fontWeight: 600,
                }}
              >
                <span style={{ marginRight: theme.spacing[2] }}>🏷️</span>
                {tag}
                <span
                  style={{
                    marginLeft: theme.spacing[2],
                    background: theme.colors.primary[200],
                    color: theme.colors.primary[800],
                    padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: theme.fontSize.xs,
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage; 