import React from 'react';
import { Link } from 'react-router-dom';

const DiaryEditPage = () => {
  return (
    <div>
      <h1>Diary Edit</h1>
      <p>ここで書き起こしたテキストを修正</p>
      <Link to={`/diaries/:id`}>Submit</Link>
    </div>
  );
};

export default DiaryEditPage;
