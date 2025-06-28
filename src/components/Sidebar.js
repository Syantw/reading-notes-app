import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppState } from '../App';
import { theme, noteTypes, folders } from '../styles/theme';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useAppState();

  const handleNavigation = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    navigate(`/${page}`);
  };

  const handleCreateNote = () => {
    dispatch({ type: 'SET_SHOW_CREATE_MODAL', payload: true });
  };

  const isActive = (path) => {
    return location.pathname === `/${path}` || (path === 'home' && location.pathname === '/');
  };

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: theme.colors.primary,
      padding: '20px',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          color: theme.colors.white,
          fontSize: '24px',
          fontWeight: 'bold',
          margin: 0
        }}>
          📚 阅读笔记
        </h1>
        <p style={{
          color: theme.colors.lightText,
          fontSize: '14px',
          margin: '5px 0 0 0'
        }}>
          记录你的阅读旅程
        </p>
      </div>

      <nav>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            { id: 'home', label: '首页', icon: '🏠' },
            { id: 'stats', label: '统计', icon: '📊' },
            { id: 'settings', label: '设置', icon: '⚙️' }
          ].map(item => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              <button
                onClick={() => handleNavigation(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: isActive(item.id) ? theme.colors.accent : 'transparent',
                  color: theme.colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.id)) {
                    e.target.style.backgroundColor = theme.colors.accent + '40';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.id)) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }}>
        <button
          onClick={handleCreateNote}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: theme.colors.accent,
            color: theme.colors.white,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = theme.colors.accentHover;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = theme.colors.accent;
          }}
        >
          <span>✏️</span>
          创建笔记
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 