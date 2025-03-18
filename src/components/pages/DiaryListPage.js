// DiaryListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';
import { fetchDiaries } from '../../api/fetchDiaries';

import '../../App.css';
import AppHeader from './AppHeader';

const DiaryListPage = () => {
  const { user } = useAuth();
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    // コンポーネントがマウントされた時に実行
    const getDiaries = async () => {
      if (!user) return; // ユーザー情報が無ければスキップ
      const data = await fetchDiaries({ author: user.id });
      if (data) {
        setDiaries(data);
      }
    };

    getDiaries();
  }, []);

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