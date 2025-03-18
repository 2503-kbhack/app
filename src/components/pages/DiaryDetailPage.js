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
  }, [user, date]);
  console.log(diaries);
  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  if (!user || diaries.length === 0) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1 className="h1">{date} の日記詳細</h1>
      {diaries.map((diary) => (
        <div
          key={diary.id}
          style={{
            display: 'flex', // フレックスボックスを有効化
            justifyContent: 'center', // 水平方向の中央寄せ
            alignItems: 'center', // 垂直方向の中央寄せ
            
          }}
        >
          <div
    style={{
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '1rem',
      marginBottom: '0.5rem', // ここを小さくする
      width: '80%',
      maxWidth: '600px', // 最大幅を設定するとバランスがよくなる
      backgroundColor: '#fff',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h2 style={{ textAlign: 'center' }}>{diary.title}</h2>
    <p>{diary.contents}</p>
  </div>
        </div>
      ))}
      <Link to="/diaries" className="button-link">日記一覧に戻る</Link>
      <br />
      <Link to="/home" className="button-link">ホームに戻る</Link>
    </div>

  );
};

export default DiaryDetailPage;