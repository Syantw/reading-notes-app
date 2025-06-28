import React, { useState } from 'react';
import { theme } from '../styles/theme';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'zh-CN',
    autoSave: true,
    notifications: true,
    exportFormat: 'json',
    backupEnabled: true,
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingItem = ({ title, description, children }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${theme.spacing[4]} 0`,
        borderBottom: `1px solid ${theme.colors.secondary[100]}`,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: theme.fontSize.lg,
            fontWeight: 600,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing[1],
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.text.secondary,
          }}
        >
          {description}
        </div>
      </div>
      <div style={{ marginLeft: theme.spacing[4] }}>
        {children}
      </div>
    </div>
  );

  const Switch = ({ checked, onChange }) => (
    <button
      style={{
        width: 48,
        height: 24,
        borderRadius: 12,
        border: 'none',
        background: checked ? theme.colors.primary[500] : theme.colors.secondary[300],
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s ease',
      }}
      onClick={() => onChange(!checked)}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: theme.colors.background.card,
          position: 'absolute',
          top: 2,
          left: checked ? 26 : 2,
          transition: 'left 0.2s ease',
          boxShadow: theme.shadows.sm,
        }}
      />
    </button>
  );

  const Select = ({ value, onChange, options }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
        border: `1px solid ${theme.colors.secondary[200]}`,
        borderRadius: theme.borderRadius.md,
        fontSize: theme.fontSize.sm,
        background: theme.colors.background.card,
        color: theme.colors.text.primary,
        cursor: 'pointer',
        outline: 'none',
        minWidth: 120,
      }}
    >
      {options.map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );

  return (
    <div
      style={{
        background: theme.colors.background.main,
        minHeight: '100vh',
        fontFamily: theme.fonts.sans,
        padding: theme.spacing[8],
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
            设置
          </h1>
          <p
            style={{
              fontSize: theme.fontSize.lg,
              color: theme.colors.text.secondary,
              margin: 0,
            }}
          >
            个性化你的阅读笔记体验
          </p>
        </div>

        {/* 设置卡片 */}
        <div
          style={{
            background: theme.colors.background.card,
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.secondary[100]}`,
            overflow: 'hidden',
          }}
        >
          {/* 外观设置 */}
          <div style={{ padding: theme.spacing[6] }}>
            <h2
              style={{
                fontSize: theme.fontSize.xl,
                fontWeight: 700,
                color: theme.colors.text.primary,
                margin: 0,
                marginBottom: theme.spacing[6],
              }}
            >
              🎨 外观设置
            </h2>

            <SettingItem
              title="主题模式"
              description="选择你喜欢的界面主题"
            >
              <Select
                value={settings.theme}
                onChange={(value) => handleSettingChange('theme', value)}
                options={[
                  ['light', '浅色模式'],
                  ['dark', '深色模式'],
                  ['auto', '跟随系统'],
                ]}
              />
            </SettingItem>

            <SettingItem
              title="语言"
              description="选择应用界面语言"
            >
              <Select
                value={settings.language}
                onChange={(value) => handleSettingChange('language', value)}
                options={[
                  ['zh-CN', '简体中文'],
                  ['en-US', 'English'],
                  ['ja-JP', '日本語'],
                ]}
              />
            </SettingItem>
          </div>

          {/* 功能设置 */}
          <div style={{ padding: theme.spacing[6], borderTop: `1px solid ${theme.colors.secondary[100]}` }}>
            <h2
              style={{
                fontSize: theme.fontSize.xl,
                fontWeight: 700,
                color: theme.colors.text.primary,
                margin: 0,
                marginBottom: theme.spacing[6],
              }}
            >
              ⚙️ 功能设置
            </h2>

            <SettingItem
              title="自动保存"
              description="编辑笔记时自动保存更改"
            >
              <Switch
                checked={settings.autoSave}
                onChange={(value) => handleSettingChange('autoSave', value)}
              />
            </SettingItem>

            <SettingItem
              title="通知提醒"
              description="接收阅读进度和提醒通知"
            >
              <Switch
                checked={settings.notifications}
                onChange={(value) => handleSettingChange('notifications', value)}
              />
            </SettingItem>

            <SettingItem
              title="自动备份"
              description="定期备份你的笔记数据"
            >
              <Switch
                checked={settings.backupEnabled}
                onChange={(value) => handleSettingChange('backupEnabled', value)}
              />
            </SettingItem>
          </div>

          {/* 数据管理 */}
          <div style={{ padding: theme.spacing[6], borderTop: `1px solid ${theme.colors.secondary[100]}` }}>
            <h2
              style={{
                fontSize: theme.fontSize.xl,
                fontWeight: 700,
                color: theme.colors.text.primary,
                margin: 0,
                marginBottom: theme.spacing[6],
              }}
            >
              📊 数据管理
            </h2>

            <SettingItem
              title="导出格式"
              description="选择笔记导出时的文件格式"
            >
              <Select
                value={settings.exportFormat}
                onChange={(value) => handleSettingChange('exportFormat', value)}
                options={[
                  ['json', 'JSON 格式'],
                  ['markdown', 'Markdown 格式'],
                  ['txt', '纯文本格式'],
                  ['csv', 'CSV 格式'],
                ]}
              />
            </SettingItem>

            <div style={{ padding: `${theme.spacing[4]} 0` }}>
              <div
                style={{
                  fontSize: theme.fontSize.lg,
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing[1],
                }}
              >
                数据操作
              </div>
              <div
                style={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[4],
                }}
              >
                管理你的笔记数据
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing[3],
                  flexWrap: 'wrap',
                }}
              >
                <button
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                    border: `1px solid ${theme.colors.primary[500]}`,
                    borderRadius: theme.borderRadius.md,
                    background: 'transparent',
                    color: theme.colors.primary[600],
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: theme.fontSize.sm,
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => alert('导出功能开发中...')}
                >
                  📤 导出笔记
                </button>
                <button
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                    border: `1px solid ${theme.colors.secondary[300]}`,
                    borderRadius: theme.borderRadius.md,
                    background: 'transparent',
                    color: theme.colors.text.secondary,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: theme.fontSize.sm,
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => alert('导入功能开发中...')}
                >
                  📥 导入笔记
                </button>
                <button
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                    border: `1px solid ${theme.colors.status.error}`,
                    borderRadius: theme.borderRadius.md,
                    background: 'transparent',
                    color: theme.colors.status.error,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: theme.fontSize.sm,
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => {
                    if (window.confirm('确定要清空所有笔记吗？此操作不可恢复！')) {
                      alert('清空功能开发中...');
                    }
                  }}
                >
                  🗑️ 清空数据
                </button>
              </div>
            </div>
          </div>

          {/* 关于 */}
          <div style={{ padding: theme.spacing[6], borderTop: `1px solid ${theme.colors.secondary[100]}` }}>
            <h2
              style={{
                fontSize: theme.fontSize.xl,
                fontWeight: 700,
                color: theme.colors.text.primary,
                margin: 0,
                marginBottom: theme.spacing[6],
              }}
            >
              ℹ️ 关于
            </h2>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: `${theme.spacing[4]} 0`,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: theme.fontSize.lg,
                    fontWeight: 600,
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing[1],
                  }}
                >
                  阅读笔记
                </div>
                <div
                  style={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  版本 1.0.0
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing[3],
                }}
              >
                <button
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                    border: `1px solid ${theme.colors.secondary[300]}`,
                    borderRadius: theme.borderRadius.md,
                    background: 'transparent',
                    color: theme.colors.text.secondary,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: theme.fontSize.sm,
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => alert('帮助文档开发中...')}
                >
                  📖 帮助文档
                </button>
                <button
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                    border: `1px solid ${theme.colors.secondary[300]}`,
                    borderRadius: theme.borderRadius.md,
                    background: 'transparent',
                    color: theme.colors.text.secondary,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: theme.fontSize.sm,
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => alert('反馈功能开发中...')}
                >
                  💬 意见反馈
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 