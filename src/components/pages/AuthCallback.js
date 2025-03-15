import React, { useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
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

  return <div>認証中...</div>;
};

export default AuthCallback;
