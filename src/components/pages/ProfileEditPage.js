import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfileEditPage() {
  const { user, profile, setProfile } = useAuth();
  const navigate = useNavigate();

  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');
  const [hobby, setHobby] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 初期値を既存の profile から設定
  useEffect(() => {
    if (profile) {
      setOccupation(profile.occupation || '');
      setLocation(profile.location || '');
      setHobby(profile.hobby || '');
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // profiles テーブルの該当レコードを更新する
    const { data, error } = await supabase
      .from('profiles')
      .update({
        occupation: occupation,
        location: location,
        hobby: hobby
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error || !data) {
      console.error('プロフィール更新エラー:', error ? error.message : 'No data returned');
      setMessage('プロフィール更新に失敗しました。');
    } else {
      setMessage('プロフィール更新に成功しました。');
      // AuthContext の profile を更新
      setProfile((prev) => ({
        ...prev,
        occupation: data.occupation,
        location: data.location,
        hobby: data.hobby
      }));
      // 更新後、/profile や /home へ遷移（ここでは /profile に戻す例）
      navigate('/profile');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>プロフィールの詳細を編集</h2>
        <p>後で追加することも出来ます</p>   
      {message && <p>{message}</p>}
        
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="occupation">職業</label>
          <input
            id="occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="職業を入力"
          />
        </div>
        <div>
          <label htmlFor="location">居住地</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="居住地を入力"
          />
        </div>
        <div>
          <label htmlFor="hobby">趣味</label>
          <input
            id="hobby"
            type="text"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            placeholder="趣味を入力"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '更新中...' : 'ホームへ'}
        </button>
      </form>
    </div>
  );
}

export default ProfileEditPage;
