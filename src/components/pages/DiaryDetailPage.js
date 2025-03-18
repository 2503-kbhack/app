// DiaryDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDiaries } from '../../api/fetchDiaries';
import { useAuth } from '../../hooks/AuthContext';

const DiaryDetailPage = (props) => {
  const { date } = useParams(); // ルートパラメータから日付 (YYYY-MM-DD) を取得
  const { user } = useAuth();
  const [diaries, setDiaries] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  console.log(date);
  useEffect(() => {
    const getDiaries = async () => {
      if (!user) return; // ユーザー情報が無ければ処理しない
      if (!date) {
        setErrorMsg('日付パラメータが無効です');
        return;
      }

      const data = await fetchDiaries({
        author: user.id,
        startDate: date,
        endDate: date,
       
      });
      if (data) {
        setDiaries(data);
      }
    };

    getDiaries();
  }, []);
  console.log(diaries);
  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  if (!user || diaries.length === 0) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1>{date} の日記詳細</h1>
      {diaries.map((diary) => (
        <div
          key={diary.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <h2>{diary.title}</h2>
          <p>{diary.contents}</p>
        </div>
      ))}
      <Link to="/diaries">Back to Diaries</Link>
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default DiaryDetailPage;
