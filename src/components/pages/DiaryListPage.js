import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import AppHeader from './AppHeader'; 
import diaries from '../../data/DiaryData';  // ← ここでちゃんとインポート

const DiaryListPage = () => {
  return (
    <div className="App-body">
      <h1>日記一覧</h1>
      

      <div className="diary-list-container">
        <ul className="diary-list">
          {diaries.map(diary => (
            <li key={diary.id} className="diary-card">
              <Link to={`/diaries/${diary.id}`}>
                {diary.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link to={`/`} className="button-link">Homeに戻る</Link>
    </div>
  );
};

export default DiaryListPage;