// DiaryListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';
import { fetchDiaries } from '../../api/fetchDiaries';

import '../../App.css';

const DiaryListPage = () => {
  const { user } = useAuth();
  const [diaries, setDiaries] = useState([]);
  console.log(diaries);
  useEffect(() => {
    const getDiaries = async () => {
      if (!user) return; // ユーザー情報がなければ処理しない
      const data = await fetchDiaries({ author: user.id });
      if (data) {
        setDiaries(data);
      }
    };

    getDiaries();
  }, [user]);

  const groupedDiaries = diaries.reduce((groups, diary) => {
    // created_at を取得し、15時間（ミリ秒換算）を引いてシフト
    console.log(diary.date);
    const dateKey = diary.date;
  
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(diary);
    return groups;
  }, {});

  // 新しい順に日付をソート
  const sortedDates = Object.keys(groupedDiaries).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div>
      <h1>Diary List</h1>
      <p>日記一覧</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sortedDates.length !== 0 ? sortedDates.map((date) => (
          // カード全体をリンク化。to のパスは各日付の日記詳細ページに合わせる
          <Link
            to={`/diaries/${date}`}
            key={date}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="card"
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '1rem',
                cursor: 'pointer'
              }}
            >
              <h2>{date}</h2>
              <ul>
                {groupedDiaries[date].map((diary) => (
                  <li key={diary.id}>{diary.title}</li>
                ))}
              </ul>
            </div>
          </Link>
        )) : <p>日記がありません😭</p>}
      </div>
      <Link to="/diaries/new">New Diary</Link>
      <br />
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default DiaryListPage;