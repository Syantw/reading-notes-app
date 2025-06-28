import React from 'react';
import { useAppState } from '../App';
import Sidebar from '../components/Sidebar';
import { theme } from '../styles/theme';

const SettingsPage = () => {
  const { state, dispatch } = useAppState();

  const handleThemeChange = (newTheme) => {
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(state.notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reading-notes-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedNotes = JSON.parse(e.target.result);
          if (Array.isArray(importedNotes)) {
            dispatch({ type: 'SET_NOTES', payload: importedNotes });
            alert('数据导入成功！');
          } else {
            alert('文件格式不正确，请选择有效的JSON文件。');
          }
        } catch (error) {
          alert('文件解析失败，请检查文件格式。');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    if (window.confirm('确定要清空所有数据吗？此操作不可恢复！')) {
      dispatch({ type: 'SET_NOTES', payload: [] });
      alert('数据已清空！');
    }
  };

  const SettingSection = ({ title, children }) => (
    <div style={{
      background: theme.colors.white,
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.colors.border}`,
      marginBottom: '20px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: theme.colors.text,
        margin: '0 0 20px 0'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const SettingItem = ({ label, children }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: `1px solid ${theme.colors.border}`
    }}>
      <span style={{
        fontSize: '14px',
        fontWeight: '600',
        color: theme.colors.text
      }}>
        {label}
      </span>
      {children}
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
            设置
          </h1>
          <p style={{
            fontSize: '16px',
            color: theme.colors.textSecondary,
            margin: 0
          }}>
            个性化你的阅读笔记体验
          </p>
        </div>

        {/* 外观设置 */}
        <SettingSection title="外观设置">
          <SettingItem label="主题模式">
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleThemeChange('light')}
                style={{
                  padding: '8px 16px',
                  border: `2px solid ${state.theme === 'light' ? theme.colors.primary : theme.colors.border}`,
                  borderRadius: '6px',
                  backgroundColor: state.theme === 'light' ? theme.colors.primary : 'transparent',
                  color: state.theme === 'light' ? theme.colors.white : theme.colors.text,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                浅色模式
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                style={{
                  padding: '8px 16px',
                  border: `2px solid ${state.theme === 'dark' ? theme.colors.primary : theme.colors.border}`,
                  borderRadius: '6px',
                  backgroundColor: state.theme === 'dark' ? theme.colors.primary : 'transparent',
                  color: state.theme === 'dark' ? theme.colors.white : theme.colors.text,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                深色模式
              </button>
            </div>
          </SettingItem>
        </SettingSection>

        {/* 数据管理 */}
        <SettingSection title="数据管理">
          <SettingItem label="导出数据">
            <button
              onClick={handleExportData}
              style={{
                padding: '8px 16px',
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              导出JSON
            </button>
          </SettingItem>
          
          <SettingItem label="导入数据">
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              style={{ display: 'none' }}
              id="import-file"
            />
            <label
              htmlFor="import-file"
              style={{
                padding: '8px 16px',
                backgroundColor: theme.colors.accent,
                color: theme.colors.white,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'inline-block'
              }}
            >
              选择文件
            </label>
          </SettingItem>
          
          <SettingItem label="清空数据">
            <button
              onClick={handleClearData}
              style={{
                padding: '8px 16px',
                backgroundColor: '#EF4444',
                color: theme.colors.white,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              清空所有数据
            </button>
          </SettingItem>
        </SettingSection>

        {/* 应用信息 */}
        <SettingSection title="应用信息">
          <SettingItem label="当前版本">
            <span style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
              1.0.0
            </span>
          </SettingItem>
          
          <SettingItem label="笔记总数">
            <span style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
              {state.notes.length} 篇
            </span>
          </SettingItem>
          
          <SettingItem label="最后更新">
            <span style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
              {new Date().toLocaleDateString('zh-CN')}
            </span>
          </SettingItem>
        </SettingSection>

        {/* 使用说明 */}
        <SettingSection title="使用说明">
          <div style={{
            fontSize: '14px',
            color: theme.colors.textSecondary,
            lineHeight: '1.6'
          }}>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong>创建笔记：</strong>点击侧边栏的"创建笔记"按钮，填写笔记信息并保存。
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong>编辑笔记：</strong>点击笔记卡片上的编辑按钮，修改笔记内容。
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong>搜索过滤：</strong>在首页使用搜索框和过滤器快速找到需要的笔记。
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong>查看统计：</strong>在统计页面查看你的阅读进度和习惯分析。
            </p>
            <p style={{ margin: 0 }}>
              <strong>数据备份：</strong>定期导出数据以备份你的阅读笔记。
            </p>
          </div>
        </SettingSection>
      </main>
    </div>
  );
};

export default SettingsPage; 