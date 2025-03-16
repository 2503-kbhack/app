// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ユーザー情報（id, email だけ保持）
  const [user, setUser] = useState(null);

  // プロフィール情報（まだバックエンドに問い合わせせず、初期値のみ定義）
  const [profile, setProfile] = useState({
    nickname: '',
    birth_date: '',
    gender: '',
    occupation: '',
    location: '',
    hobby: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // セッション取得 → user.id と user.email をセット
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('セッション取得エラー:', error.message);
      } else {
        const sessionUser = data?.session?.user;
        if (sessionUser) {
          setUser({
            id: sessionUser.id,
            email: sessionUser.email,
          });
        }
      }
      setLoading(false);
    };

    fetchSession();

    // 認証状態の変更を監視
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const sessionUser = session?.user;
      if (sessionUser) {
        setUser({
          id: sessionUser.id,
          email: sessionUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,       // { id, email } だけ
        profile,    // { nickname, birth_date, ... } 初期定義
        setProfile, // プロフィールを更新できるようにエクスポート
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);