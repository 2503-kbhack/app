import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import DiaryListPage from './components/pages/DiaryListPage';
import DiaryDetailPage from './components/pages/DiaryDetailPage';
import DiaryInputPage from './components/pages/DiaryInputPage';
import DiaryEditPage from './components/pages/DiaryEditPage';
import LoginPage from './components/pages/LoginPage';
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
        
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
