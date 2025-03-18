import React from 'react';
import '../../App.css';


function AppHeader() {
  return (
    <header className="app-header">
      {/* アイコン画像 */}
      <img src="/Bazaart_20250317_040552_859.png" alt="App Icon" className="app-icon" />
      
      {/* アプリ名 */}
      <h1 className="app-title">Coe-Nikki</h1>

    </header>
  );
}

export default AppHeader;