import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../App.css';
import AppHeader from './AppHeader';
import diaries from '../../data/DiaryData';
// 日記データをインポート

const DiaryDetailPage = () => {
  // URLの「:id」部分を取得する
  const { id } = useParams();

  // 取得した id (文字列) を数値に変換し、該当する日記オブジェクトを検索
  const diary = diaries.find(d => d.id === parseInt(id, 10));

  // 万が一、該当の日記が見つからない場合
  if (!diary) {
    return (
      <>
        <AppHeader />
        <div className="App-body">
          <h1>Diary Not Found</h1>
          <Link to={`/`} className="button-link">Back to Home</Link>
        </div>
      </>
    );
  }

  // 正常に見つかった場合はタイトルとコンテンツを表示
  return (
    <>
      <AppHeader />
      <div className="App-body">
        <h1>{diary.title}</h1>
        <p>{diary.content}</p>
        <Link to={`/`} className="button-link">Back to Home</Link>
      </div>
    </>
  );
};

export default DiaryDetailPage;