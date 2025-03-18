import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import LogoutButton from '../auth/LogoutButton';
import '../../App.css';
import AppHeader from './AppHeader'; 

function HomePage() {
  const { user, profile, loading } = useAuth();
  if (loading) {
    return <div className="diary-detail-page"> {/* 新しいクラスを適用 */}
                読み込み中...</div>;
  }
  console.log(profile);
  let active_rate = 0;
  return (
    <div className="App-body"> {/* 新しいクラスを適用 */}
      <LogoutButton />
      <h1>Home</h1>
      {
        active_rate <= 60 && active_rate >= 30 ? (
          <img
            src="/images/kairu_normal.gif" 
            alt="可愛いイルカ"
            style={{ width: '100px', height: '100px', marginTop: '50px' }}
          />
        ) : active_rate > 60 ? (
          <img
            src="/images/kairu_happy.gif" 
            alt="可愛いイルカ"
            style={{ width: '100px', height: '100px', marginTop: '50px' }}
          />
        ) : (
          <img
            src="/images/kairu_sad.gif" 
            alt="可愛いイルカ"
            style={{ width: '100px', height: '100px', marginTop: '50px' }}
          />
        )
      }
      <p>
        ようこそ、<strong>{profile.nickname}</strong> さん&nbsp;
      </p>
      <Link to="/profile/edit" style={{ fontSize: '0.8em' }}>
          [プロフィールの詳細を編集]
      </Link>
      <p>誕生日: {profile.birth_date}</p>
      <p>性別: {profile.gender}</p>
      <nav>
       <ul>
        <li><Link to="/diaries" className="button-link">日記一覧</Link></li>
        <li><Link to="/diaries/new" className="button-link">新しい日記を作成</Link></li>
       </ul>
      </nav>
    </div>
  );
}

export default HomePage;
