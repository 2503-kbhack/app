import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient'; // パスはプロジェクトに合わせて変更
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css';


const ProfileCreationPage = () => {
  const { user, setProfile } = useAuth();
  const navigate = useNavigate();
  
  // フォーム用の state
  const [nickname, setNickname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // フォーム送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 必須項目チェック
    if (!nickname || !birthDate || !gender) {
      setMessage('すべての項目を入力してください。');
      return;
    }

    setLoading(true);
    setMessage('');

    // Supabase の profiles テーブルにデータを挿入
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id, // auth.users.id と同じ値を使う（もし user_id を使うならフィールド名を変更）
          nickname: nickname,
          birth_date: birthDate,
          gender: gender,
          created_at: new Date().toISOString()  // 作成日時を挿入
        }
      ])
      .select()  // 明示的に返却データを要求
      .single();
    console.log(data, error);
    if (error) {
      console.error('プロフィール作成エラー:', error.message);
      setMessage('プロフィール作成に失敗しました。');
    } else {
      setMessage('プロフィール作成に成功しました。');
      // AuthContext の profile を更新
      setProfile({
        nickname: data.nickname,
        birth_date: data.birth_date,
        gender: data.gender,
        // 他に必要なフィールドがあれば追加
      });
      // 作成完了後、ホームページに遷移
      navigate('/profile/edit');
    }
    setLoading(false);
  };

  return (
    <div className="App-body"> {/* 新しいクラスを適用 */}
      <h2>プロフィール作成</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="birthDate">生年月日</label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">性別</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">選択してください</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="button-link">
          {loading ? '送信中...' : 'プロフィール作成'}
        </button>
      </form>
    </div>
  );
};

export default ProfileCreationPage;
