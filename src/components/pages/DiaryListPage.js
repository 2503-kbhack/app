import React from 'react';
import { Link } from 'react-router-dom';

const DiaryListPage = () => {
  const diaries = [
    { id: 1, title: 'Diary 1' },
    { id: 2, title: 'Diary 2' },
    { id: 2, title: 'Diary 3' },
    // ...other diaries...
  ];

  return (
    <div>
      <h1>Diary List</h1>
      <p>日記一覧</p>
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <Link to={`/diaries/${diary.id}`}>{diary.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryListPage;
