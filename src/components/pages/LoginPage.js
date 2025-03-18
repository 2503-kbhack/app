// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import '../../App.css';



const BASE_URL = process.env.REACT_APP_BASE_URL;

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
      }
    });
  }, [navigate]);




  const signInWithDiscord = async () => {
    console.log('Discord ログイン処理');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${BASE_URL}/profile` },
    });
    if (error) {
      console.error('Discord ログインエラー:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="App-body">
      <h1 className="h1">ログイン</h1>
      {error && <p className="error-message">{error}</p>}
      <button onClick={signInWithDiscord} className="button-link">
        Discord でログイン
      </button>

      {/* イルカの画像 */}
      <img
          src="/images/kairu_normal.gif" 
          alt="可愛いイルカ"
          style={{ width: '200px', height: '200px', marginTop: '50px' }}
        />
    </div>
  );
};

export default LoginPage;
