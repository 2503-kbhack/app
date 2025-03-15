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
      const sessionUser = data?.session?.user ?? null;
      if (error) {
        console.error('セッション取得エラー:', error.message);
      } else if (sessionUser) {
        setUser(data?.session?.user || null);
        // プロフィール取得
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sessionUser.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    };

    getSessionAndProfile ();

    // 認証状態のリッスン
    const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const sessionUser = session?.user ?? null;
          setUser(sessionUser);
          if (sessionUser) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', sessionUser.id)
              .single();
            setProfile(profileData ?? null);
          } else {
            setProfile(null);
          }
        }
      );
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
