// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { fetchProfile } from '../api/fetchProfile';
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
    let sessionUser = null;
    if (error) {
      console.error('セッション取得エラー:', error.message);
    } else {
      sessionUser = data?.session?.user;
      if (sessionUser) {
        setUser({
          id: sessionUser.id,
          email: sessionUser.email,
        });
      }
    }

    // プロフィール取得用関数
    const fetchuserProfile = async (userId) => {
      try {
        const profileData = await fetchProfile(userId);
        console.log('取得したプロフィール:', profileData);
        if (profileData) {
          setProfile({
            nickname: profileData.nickname || '',
            birth_date: profileData.birth_date || '',
            gender: profileData.gender || '',
            occupation: profileData.occupation || '',
            location: profileData.location || '',
            hobby: profileData.hobby || '',
          });
        } else {
          console.log('プロフィールは存在しません。');
        }
      } catch (err) {
        console.error('プロフィール取得中にエラー:', err.message);
      }
    };

    // セッションユーザーが存在する場合のみプロフィール取得を実行
    if (sessionUser) {
      await fetchuserProfile(sessionUser.id);
    }
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
    setLoading(false);
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
        setUser,    // ユーザー情報を更新できるようにエクスポート
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);