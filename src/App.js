import React, { createContext, useContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

// 全局状态管理
const AppContext = createContext();

// 初始状态
const initialState = {
  notes: [],
  currentPage: 'home',
  searchTerm: '',
  filterStatus: 'all',
  sortBy: 'date',
  theme: 'light',
  showCreateModal: false,
  selectedNote: null
};

// 状态更新函数
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? action.payload : note
        )
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_FILTER_STATUS':
      return { ...state, filterStatus: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_SHOW_CREATE_MODAL':
      return { ...state, showCreateModal: action.payload };
    case 'SET_SELECTED_NOTE':
      return { ...state, selectedNote: action.payload };
    default:
      return state;
  }
}

// 自定义Hook用于访问全局状态
export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className={`app ${state.theme}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
