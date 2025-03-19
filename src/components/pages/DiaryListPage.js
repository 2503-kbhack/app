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
  }, []);

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
      <h1 className="h1">日記一覧</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sortedDates.length !== 0 ? sortedDates.map((date) => (
          // カード全体をリンク化。to のパスは各日付の日記詳細ページに合わせる
          <Link
            to={`/diaries/${date}`}
            key={date}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',           // カードを中央寄せするためのフレックス設定
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              className="card"
              style={{
                /* テキスト領域の余白を確保 */
                padding: '1rem 1rem 1rem 3rem',
                marginBottom: '1rem',
                width: '60%',
                maxWidth: '600px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            
                /* 横罫ノート風の背景 */
                backgroundColor: '#fff',
                backgroundImage: `
                  　
                  /* 横方向の線を 25px 間隔で繰り返し表示 */
                  repeating-linear-gradient(
                    to bottom,
                        rgba(204, 204, 204, 0.3) 0, /* ここで透明度を調整 */
                rgba(204, 204, 204, 0.3) 1px,
            
                    #ccc 0,
                    #ccc 1px,
                    transparent 1px,
                    transparent 24px
                  )
                `,
                /* 繰り返しのピッチを 25px として設定 */
                backgroundSize: '100% 25px',
              }}
            >
              <h2 style={{ textAlign: 'left' }}>{date}</h2>
              <ul>
                {groupedDiaries[date].map((diary) => (
                  <p key={diary.id} style={{ textAlign: 'left' }}>{diary.title}</p>
                ))}
              </ul>
            </div>
          </Link>
        )) : <p>日記がありません😭</p>}
      </div>
      <div className="link-container">
      <Link to="/diaries/new" className="button-link">新しい日記を作成</Link>
      <Link to="/home" className="button-link">ホームに戻る</Link>
      </div>
    </div>
  );
};

export default DiaryListPage;