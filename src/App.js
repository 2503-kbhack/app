import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import AuthCallback from './components/pages/AuthCallback';
import HomePage from './components/pages/HomePage';
import DiaryListPage from './components/pages/DiaryListPage';
import DiaryDetailPage from './components/pages/DiaryDetailPage';
import DiaryInputPage from './components/pages/DiaryInputPage';
import DiaryEditPage from './components/pages/DiaryEditPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/diaries" element={<DiaryListPage />} />
        <Route path="/diaries/:id" element={<DiaryDetailPage />} />
        <Route path="/diaries/new" element={<DiaryInputPage />} />
        <Route path="/diaries/:id/edit" element={<DiaryEditPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
