import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const ProfileCreationPage = () => {
  const { user, setProfile } = useAuth();
  const navigate = useNavigate();
  
  const [nickname, setNickname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nickname || !birthDate || !gender) {
      setMessage('すべての項目を入力してください。');
      return;
    }

    setLoading(true);
    setMessage('');

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id,
          nickname,
          birth_date: birthDate,
          gender,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    console.log(data, error);
    if (error) {
      console.error('プロフィール作成エラー:', error.message);
      setMessage('プロフィール作成に失敗しました。');
    } else {
      setMessage('プロフィール作成に成功しました。');
      setProfile({
        nickname: data.nickname,
        birth_date: data.birth_date,
        gender
      });
      navigate('/profile/edit');
    }
    setLoading(false);
  };

  return (
    <div className="profile-edit-container">
      <h2>プロフィール作成</h2>
      {message && <p className="message-text">{message}</p>}
      
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="form-group">
          <label htmlFor="nickname">ユーザー名</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="ユーザー名を入力"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">生年月日</label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
         <label htmlFor="gender">性別</label>
         <select
           id="gender"
           value={gender}
           onChange={(e) => setGender(e.target.value)}
           required
  >
         <option value="">選択してください</option>
         <option value="male">男性</option>
         <option value="female">女性</option>
         </select>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? '送信中...' : 'プロフィール作成'}
        </button>
      </form>
    </div>
  );
};

export default ProfileCreationPage;
