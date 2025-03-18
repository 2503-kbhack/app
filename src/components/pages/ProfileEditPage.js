import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

function ProfileEditPage() {
  const { user, profile, setProfile } = useAuth();
  const navigate = useNavigate();

  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');
  const [hobby, setHobby] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

    const { data, error } = await supabase
      .from('profiles')
      .update({ occupation, location, hobby })
      .eq('id', user.id)
      .select()
      .single();

    if (error || !data) {
      console.error('プロフィール更新エラー:', error ? error.message : 'No data returned');
      setMessage('プロフィール更新に失敗しました。');
    } else {
      setMessage('プロフィール更新に成功しました。');
      setProfile((prev) => ({
        ...prev,
        occupation: data.occupation,
        location: data.location,
        hobby: data.hobby
      }));
      navigate('/profile');
    }
    setLoading(false);
  };

  return (
    <div className="profile-edit-container">
      <h2>プロフィールの詳細を編集</h2>
      <p className="info-text">後で追加することもできます</p>
      
      {message && <p className="message-text">{message}</p>}

      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="form-group">
          <label htmlFor="occupation">職業</label>
          <input
            id="occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="職業を入力"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">居住地</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="居住地を入力"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hobby">趣味</label>
          <input
            id="hobby"
            type="text"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            placeholder="趣味を入力"
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? '更新中...' : 'ホームへ'}
        </button>
      </form>
    </div>
  );
}

export default ProfileEditPage;
