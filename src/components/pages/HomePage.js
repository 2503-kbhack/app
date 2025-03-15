import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

function HomePage() {
  const { user, loading } = useAuth();
  if (loading) return <p>読み込み中...</p>;
  console.log(user);
  return (
    <div>
      <h1>Home Page</h1>
      <p>ようこそ、{user?.email} さん</p>
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
