import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import LogoutButton from '../auth/LogoutButton';

function HomePage() {
  const { user, profile, loading } = useAuth();
  if (loading) {
    return <div>読み込み中...</div>;
  }
  console.log(profile);

  return (
    <div>
      <LogoutButton />
      <h1>Home Page</h1>
      <p>
        ようこそ、<strong>{profile.nickname}</strong> さん&nbsp;
        <Link to="/profile/edit" style={{ fontSize: '0.8em' }}>
          [プロフィールの詳細を編集]
        </Link>
      </p>
      <p>誕生日: {profile.birth_date}</p>
      <p>性別: {profile.gender}</p>
      <nav>
        <ul>
          <li><Link to="/diaries">Diary List</Link></li>
          <li><Link to="/diaries/new">New Diary</Link></li>
          <li><Link to="/summary"> Weekly Summary</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
