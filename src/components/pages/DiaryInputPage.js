import React from 'react';
import { Link } from 'react-router-dom';

const DiaryInputPage = () => {
  return (
    <div>
      <h1>Diary Input</h1>
      <p>ここで音声を入力</p>
      <Link to="/diaries/:id/edit">Create</Link>
      <nav>
        <ul>
          <li><Link to="/diaries">Back to Diary List</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default DiaryInputPage;
