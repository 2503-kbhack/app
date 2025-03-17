import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import ProfileCheckPage from './components/pages/ProfileCheckPage';
import ProfileCreationPage from './components/pages/ProfileCreationPage';
import ProfileEditPage from './components/pages/ProfileEditPage';
import HomePage from './components/pages/HomePage';
import DiaryListPage from './components/pages/DiaryListPage';
import DiaryDetailPage from './components/pages/DiaryDetailPage';
import DiaryInputPage from './components/pages/DiaryInputPage';
import DiaryEditPage from './components/pages/DiaryEditPage';
import PrivateRoute from './hooks/PrivateRoute';
import { AuthProvider } from './hooks/AuthContext';
import './App.css';
import AppHeader from './components/pages/AppHeader'; // ヘッダー


function App() {
  return (
    <AuthProvider>
      <Router>

        {/* ヘッダーを全ページ共通で表示する場合 */}
        <AppHeader />  
        <Routes>
          
          {/* 公開ルート */}
          <Route path="/" element={<LoginPage />} />
          {/* 保護したいルート群を PrivateRoute でラップ */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfileCheckPage />} />          
            <Route path="/profile/create" element={<ProfileCreationPage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/diaries" element={<DiaryListPage />} />
            <Route path="/diaries/new" element={<DiaryInputPage />} />
            <Route path="/diaries/:id" element={<DiaryDetailPage />} />
            <Route path="/diaries/:id/edit" element={<DiaryEditPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
