import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);  
  const [loading, setLoading] = useState(true);

  // 初回セッション取得
  useEffect(() => {
    const getSessionAndProfile  = async () => {
      const { data, error } = await supabase.auth.getSession();
        
      if (error) {
        console.error('セッション取得エラー:', error.message);
      } else {
        setUser(data?.session?.user || null);
      }
      setLoading(false);
    };

    getSessionAndProfile ();

    // 認証状態の変更をリッスン
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
