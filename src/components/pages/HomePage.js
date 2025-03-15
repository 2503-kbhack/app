import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { supabase } from '../../hooks/supabaseClient';
import { fetchProfile } from '../../hooks/fetchProfile';
function HomePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user.id);
  useEffect(() => {
    // user が取得できていない場合は何もしない
    if (!user) return;
    
    const loadProfile = async () => {
      const data = await fetchProfile(user.id);
      setProfile(data);
      setLoading(false);
    };

    loadProfile();
  }, [user]);

  if (loading) return <p>読み込み中...</p>;
  if (!profile) {
    return <div>プロフィールが見つかりませんでした。</div>;
  }
  console.log(user);
  return (
    <div>
      <h1>Home Page</h1>
      <p>ようこそ、<strong>{profile.nickname}</strong> さん</p>
      <p>誕生日: {profile.birth_date}</p>
      <p>作成日: {profile.created_at}</p>
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
