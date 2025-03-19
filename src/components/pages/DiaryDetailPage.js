// DiaryDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDiaries } from '../../api/fetchDiaries';
import { useAuth } from '../../hooks/AuthContext';
import '../../App.css';

const DiaryDetailPage = (props) => {
  const { id } = useParams();
  const [diary, setDiary] = useState([]);
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
      <h1 className="h1">{date}</h1>
      {/* ここでカードを 1 枚だけ作る */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '0.5rem',
            width: '80%',
            maxWidth: '600px',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* diaries の内容をひとつのカード内に並べて表示 */}
          {diaries.map((diary) => (
            <div key={diary.id} style={{ marginBottom: '1rem' }}>
              <h3 style={{ textAlign: 'left' }}>{diary.title}</h3>
              <p style={{ textAlign: 'left' }}>{diary.contents}</p>
              {/* 必要に応じて区切り線などを入れても良い */}
              {/* <hr /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
    
    
      );
}

export default DiaryDetailPage;