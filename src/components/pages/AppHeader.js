import React from 'react';
import '../../App.css';
import LogoutButton from '../auth/LogoutButton';

function AppHeader() {
  return (
    <header className="app-header">
      <img src="/Bazaart_20250317_040552_859.png" alt="App Icon" className="app-icon" />
      {/* アプリ名 */}
      <img src="/title_logo.png" alt="App Icon" className="app-icon" />
    
      <LogoutButton className="logout-button" /> {/* ③ここで props として className を渡す */}
    </header>
  );
}

export default AppHeader;
