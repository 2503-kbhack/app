import React from 'react';
import '../../App.css';
import LogoutButton from '../auth/LogoutButton';

function AppHeader() {
  return (
    <header className="app-header">
      <img src="/Bazaart_20250317_040552_859.png" alt="App Icon" className="app-icon" />
      <h1 className="app-title">Coe-Nikki</h1>
      <LogoutButton className="logout-button" /> {/* ③ここで props として className を渡す */}
    </header>
  );
}

export default AppHeader;
