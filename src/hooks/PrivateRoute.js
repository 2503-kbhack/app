import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) return <p>読み込み中...</p>;

  // 認証されていない場合は / にリダイレクト
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 認証済みなら Outlet でネストされたルートをレンダリング
  return <Outlet />;
};

export default PrivateRoute;
