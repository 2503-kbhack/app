import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import { useAuth } from '../../hooks/AuthContext';
import { LogOut } from 'lucide-react';

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();
  const { user, setUser, setProfile } = useAuth();

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

  if (!user) {
    return null;
  }

  return (
    <button onClick={handleLogout} className={className}>
      <LogOut />
    </button>
  );
};

export default LogoutButton;
