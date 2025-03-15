// LoginPage.jsx
import React, { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../hooks/supabaseClient';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      console.log(data);
      if (error || !data.session) {
        // 認証に失敗している場合はログインページにリダイレクト
        console.log(error);
        navigate('/');
      } else {
        
        // 認証に成功している場合はホームページなどへ
        navigate('/home');
      }
    });
  }, [navigate]);




  const signInWithDiscord = async () => {
    console.log('Discord ログイン処理');
    const { data,error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: 'http://localhost:3000/auth/callback' },
    });
    if (error) {
      console.error('Discord ログインエラー:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>ログイン</h1>
      {error && <p className="error-message">{error}</p>}
      <button onClick={signInWithDiscord} className="discord-login-button">
        Discord でログイン
      </button>
    </div>
  );
};

export default LoginPage;
