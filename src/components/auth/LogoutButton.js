import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import { useAuth } from '../../hooks/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser, setProfile } = useAuth();

  const handleLogout = async () => {
    // Supabase のサインアウト処理
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('ログアウトエラー:', error.message);
      return;
    }

    // グローバル状態のリセット（ユーザー情報、プロフィール情報をクリア）
    setUser(null);
    setProfile({
      nickname: '',
      birth_date: '',
      gender: '',
      occupation: '',
      location: '',
      hobby: '',
    });

    // ログインページへリダイレクト
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>
      ログアウト
    </button>
  );
};

export default LogoutButton;
