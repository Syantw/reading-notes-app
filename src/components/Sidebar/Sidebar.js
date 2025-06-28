import React from 'react';
import PropTypes from 'prop-types';
import { THEME } from '../../constants/theme';
import { FOLDERS } from '../../data/mockData';

const Sidebar = ({ onCreateNote, onNavigate, currentView }) => {
  const sidebarStyle = {
    width: THEME.spacing.sidebar.width,
    background: THEME.colors.sidebar.bg,
    borderRight: `1px solid ${THEME.colors.sidebar.border}`,
    padding: THEME.spacing.sidebar.padding,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    boxSizing: 'border-box',
  };

  const logoStyle = {
    padding: THEME.spacing.sidebar.innerPadding,
    marginBottom: 40,
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  };

  const avatarStyle = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #c1ff72 60%, #1e2d1f 100%)',
    marginRight: 12,
  };

  const createButtonStyle = {
    width: '100%',
    background: THEME.colors.text.primary,
    color: THEME.colors.text.white,
    border: 'none',
    borderRadius: THEME.borderRadius.medium,
    padding: '12px 0',
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  };

  const navItemStyle = {
    color: THEME.colors.text.primary,
    fontWeight: 500,
    cursor: 'pointer',
    padding: '8px 0',
    borderRadius: THEME.borderRadius.small,
    paddingLeft: 8,
    transition: 'background-color 0.2s',
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    backgroundColor: '#f0f0f0',
  };

  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>
        <div style={brandStyle}>
          <div style={avatarStyle} />
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: THEME.colors.text.primary,
              }}
            >
              Syncscribe
            </div>
            <div style={{ fontSize: 12, color: THEME.colors.text.secondary }}>
              Reading Notes
            </div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <div style={{ padding: THEME.spacing.sidebar.innerPadding }}>
          <button style={createButtonStyle} onClick={onCreateNote}>
            <span>＋</span> Create Note
          </button>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              marginBottom: 32,
            }}
          >
            <div
              style={
                currentView === 'search' ? activeNavItemStyle : navItemStyle
              }
              onClick={() => onNavigate('search')}
            >
              🔍 Search
            </div>
            <div
              style={
                currentView === 'archives' ? activeNavItemStyle : navItemStyle
              }
              onClick={() => onNavigate('archives')}
            >
              🗄️ Archives
            </div>
          </div>

          <div>
            <div
              style={{
                color: THEME.colors.text.secondary,
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 8,
              }}
            >
              Folders
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {FOLDERS.map(folder => (
                <div
                  key={folder.id}
                  style={
                    currentView === `folder-${folder.id}`
                      ? activeNavItemStyle
                      : navItemStyle
                  }
                  onClick={() => onNavigate(`folder-${folder.id}`)}
                >
                  {folder.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        style={{ padding: THEME.spacing.sidebar.innerPadding, marginTop: 32 }}
      >
        <div
          style={{
            color: THEME.colors.text.secondary,
            fontSize: 14,
            marginBottom: 8,
            cursor: 'pointer',
          }}
        >
          ⚙️ Settings
        </div>
        <div
          style={{
            color: THEME.colors.text.secondary,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ❓ Help
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  onCreateNote: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};

export default Sidebar;
