import React from 'react';
import { theme, noteTypes, folders } from '../styles/theme';

const Sidebar = ({ onCreateNote, onSearch, onFilterChange, stats, activeFilters }) => {
  return (
    <aside
      style={{
        width: 280,
        background: theme.colors.background.sidebar,
        borderRight: `1px solid ${theme.colors.secondary[200]}`,
        padding: `${theme.spacing[8]} 0 ${theme.spacing[6]} 0`,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        boxSizing: 'border-box',
        fontFamily: theme.fonts.sans,
      }}
    >
      {/* 头部 */}
      <div style={{ padding: `0 ${theme.spacing[8]}`, marginBottom: theme.spacing[10] }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing[2],
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.colors.primary[400]} 0%, ${theme.colors.primary[600]} 100%)`,
              marginRight: theme.spacing[3],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: theme.colors.text.inverse,
              fontWeight: 700,
            }}
          >
            📚
          </div>
          <div>
            <div style={{ 
              fontWeight: 700, 
              fontSize: theme.fontSize.xl, 
              color: theme.colors.text.primary,
              marginBottom: theme.spacing[1],
            }}>
              阅读笔记
            </div>
            <div style={{ 
              fontSize: theme.fontSize.sm, 
              color: theme.colors.text.secondary 
            }}>
              记录你的阅读时光
            </div>
          </div>
        </div>
      </div>

      {/* 导航 */}
      <nav style={{ flex: 1 }}>
        <div style={{ padding: `0 ${theme.spacing[8]}` }}>
          {/* 创建笔记按钮 */}
          <button
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.primary[600]} 100%)`,
              color: theme.colors.text.inverse,
              border: 'none',
              borderRadius: theme.borderRadius.lg,
              padding: `${theme.spacing[3]} 0`,
              fontWeight: 600,
              fontSize: theme.fontSize.base,
              marginBottom: theme.spacing[6],
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing[2],
              boxShadow: theme.shadows.md,
              transition: 'all 0.2s ease',
            }}
            onClick={onCreateNote}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = theme.shadows.lg;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = theme.shadows.md;
            }}
          >
            <span style={{ fontSize: '18px' }}>✏️</span>
            创建笔记
          </button>

          {/* 搜索 */}
          <div style={{ marginBottom: theme.spacing[8] }}>
            <div style={{ 
              color: theme.colors.text.secondary, 
              fontWeight: 600, 
              fontSize: theme.fontSize.sm,
              marginBottom: theme.spacing[3],
            }}>
              搜索笔记
            </div>
            <input
              type="text"
              placeholder="搜索标题、内容或标签..."
              style={{
                width: '100%',
                padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                border: `1px solid ${theme.colors.secondary[200]}`,
                borderRadius: theme.borderRadius.md,
                fontSize: theme.fontSize.sm,
                background: theme.colors.background.main,
                color: theme.colors.text.primary,
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onChange={(e) => onSearch(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = theme.colors.primary[400];
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.colors.secondary[200];
              }}
            />
          </div>

          {/* 笔记类型 */}
          <div style={{ marginBottom: theme.spacing[8] }}>
            <div style={{ 
              color: theme.colors.text.secondary, 
              fontWeight: 600, 
              fontSize: theme.fontSize.sm,
              marginBottom: theme.spacing[3],
            }}>
              笔记类型
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
              {Object.entries(noteTypes).map(([key, type]) => (
                <button
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    border: 'none',
                    borderRadius: theme.borderRadius.md,
                    background: activeFilters.type === key 
                      ? `${type.color}20` 
                      : 'transparent',
                    color: activeFilters.type === key 
                      ? theme.colors.text.primary 
                      : theme.colors.text.secondary,
                    cursor: 'pointer',
                    fontSize: theme.fontSize.sm,
                    fontWeight: activeFilters.type === key ? 600 : 500,
                    transition: 'all 0.2s ease',
                    borderLeft: activeFilters.type === key 
                      ? `3px solid ${type.color}` 
                      : '3px solid transparent',
                  }}
                  onClick={() => onFilterChange({ type: key })}
                >
                  <span style={{ marginRight: theme.spacing[2], fontSize: '16px' }}>
                    {type.icon}
                  </span>
                  {type.name}
                  <span style={{ 
                    marginLeft: 'auto', 
                    fontSize: theme.fontSize.xs,
                    color: theme.colors.text.muted,
                  }}>
                    {stats?.typeStats?.[key] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 文件夹 */}
          <div style={{ marginBottom: theme.spacing[8] }}>
            <div style={{ 
              color: theme.colors.text.secondary, 
              fontWeight: 600, 
              fontSize: theme.fontSize.sm,
              marginBottom: theme.spacing[3],
            }}>
              文件夹
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    border: 'none',
                    borderRadius: theme.borderRadius.md,
                    background: activeFilters.status === folder.id 
                      ? `${theme.colors.primary[100]}` 
                      : 'transparent',
                    color: activeFilters.status === folder.id 
                      ? theme.colors.text.primary 
                      : theme.colors.text.secondary,
                    cursor: 'pointer',
                    fontSize: theme.fontSize.sm,
                    fontWeight: activeFilters.status === folder.id ? 600 : 500,
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => onFilterChange({ status: folder.id })}
                >
                  <span style={{ marginRight: theme.spacing[2], fontSize: '16px' }}>
                    {folder.icon}
                  </span>
                  {folder.name}
                  <span style={{ 
                    marginLeft: 'auto', 
                    fontSize: theme.fontSize.xs,
                    color: theme.colors.text.muted,
                  }}>
                    {folder.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 底部 */}
      <div style={{ padding: `0 ${theme.spacing[8]}`, marginTop: theme.spacing[8] }}>
        <div style={{ 
          padding: theme.spacing[4],
          background: theme.colors.primary[50],
          borderRadius: theme.borderRadius.lg,
          border: `1px solid ${theme.colors.primary[100]}`,
        }}>
          <div style={{ 
            fontSize: theme.fontSize.sm, 
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing[2],
          }}>
            今日统计
          </div>
          <div style={{ 
            fontSize: theme.fontSize.lg, 
            fontWeight: 700,
            color: theme.colors.text.primary,
          }}>
            {stats?.total || 0} 篇笔记
          </div>
          <div style={{ 
            fontSize: theme.fontSize.xs, 
            color: theme.colors.text.muted,
            marginTop: theme.spacing[1],
          }}>
            完成率 {stats?.completionRate || 0}%
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 