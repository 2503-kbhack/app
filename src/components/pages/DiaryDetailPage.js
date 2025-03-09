import React from 'react';
import { Link } from 'react-router-dom';

const DiaryDetailPage = () => {
  return (
    <div>
      <h1>Diary Detail</h1>
      <p>日記を表示するとこ</p>
      <Link to={`/`}>Back to Home</Link>
    </div>
  );
};

export default DiaryDetailPage;
