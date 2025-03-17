// DiaryListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { fetchDiaries } from '../../api/fetchDiaries';

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
    <div>
      <h1>Diary List</h1>
      <p>日記一覧</p>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <Link to={`/diaries/${diary.id}`}>{diary.title}</Link>
          </li>
        ))}
      </ul>
      
      <Link to={`/`}>Back to Home</Link>
    </div>
  );
};

export default DiaryListPage;
