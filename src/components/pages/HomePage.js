import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/diaries">Diary List</Link></li>
          <li><Link to="/diaries/new">New Diary</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
