import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import { useAuth } from '../../hooks/AuthContext';

const LogoutButton = ({ className }) => {  // ①ここで className を受け取る
  const navigate = useNavigate();
  const { setUser, setProfile } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('ログアウトエラー:', error.message);
      return;
    }
    setUser(null);
    setProfile({
      nickname: '',
      birth_date: '',
      gender: '',
      occupation: '',
      location: '',
      hobby: '',
    });
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className={className}> {/* ②ここで button に反映 */}
      ログアウト
    </button>
  );
};

export default LogoutButton;
