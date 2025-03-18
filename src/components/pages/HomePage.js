import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import '../../App.css';
import AppHeader from './AppHeader'; 
import { Mail} from 'lucide-react';
import { Mic } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Edit } from 'lucide-react';

import {fetchDiaries} from '../../api/fetchDiaries';
import useSWR from 'swr';


function HomePage() {
  const { user, profile, loading } = useAuth();
  const date = new Date().toLocaleDateString('ja-JP');
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoDate = oneWeekAgo.toLocaleDateString('ja-JP');

  const { data, error } = useSWR('diaries', () => fetchDiaries({
      author: user.id ,
      startDate: oneWeekAgoDate,
      endDate: date,
     }));
  if (loading) {
    return <div className="diary-detail-page"> {/* 新しいクラスを適用 */}
                読み込み中...</div>;
  }

  console.log(data);
  // const numberofDiaries = data.length;
  // console.log("日記の数：",numberofDiaries);
  let active_rate = Math.random() * 100;  // TODO: アクティブ率を計算する
  if (data) {
    active_rate = data.length / 30 * 100;
  }
  
  return (
    <div className="App-body"> {/* 新しいクラスを適用 */}
      <h1 className="h1">ホーム</h1>
      {
        active_rate <= 60 && active_rate >= 30 ? (
          <img
            src="/images/kairu_normal.gif" 
            alt="可愛いイルカ"
            style={{ width: '150px', height: '150px', marginTop: '40px' }}
          />
        ) : active_rate > 60 ? (
          <img
            src="/images/kairu_happy.gif" 
            alt="可愛いイルカ"
            style={{ width: '150px', height: '150px', marginTop: '40px' }}
          />
        ) : (
          <img
            src="/images/kairu_sad.gif" 
            alt="可愛いイルカ"
            style={{ width: '150px', height: '150px', marginTop: '40px' }}
          />
        )
      }

<div className="profile-container">
      <Link to="/profile/edit" style={{ fontSize: '0.8em' }}>
      <Edit size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />   
      </Link>
      <p>
        ようこそ、<strong>{profile.nickname}</strong> さん&nbsp;
      </p>
      <p>誕生日: {profile.birth_date}</p>
      <p>性別: {profile.gender === 'male' ? '男性' : profile.gender === 'female' ? '女性' : profile.gender}</p>
  
      </div>
      <nav>
  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
    <li>
      <Link to="/diaries" className="button-link">
      <FileText size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        今までの日記一覧
      </Link>
    </li>
    <li>
      <Link to="/diaries/new" className="button-link">
      <Mic size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        新しい日記を作成
      </Link>
    </li>
    <li>
      <Link to="/summary" className="button-link">
      <Mail size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        ふりかえりレター
      </Link>
    </li>
  </ul>
</nav>

    </div>
  );
}

export default HomePage;
