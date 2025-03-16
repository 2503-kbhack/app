import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここに実際の認証ロジックを実装
    // 仮の実装としてemailとpasswordが入力されていればホームページに遷移
    if (email && password) {
      // ログイン成功時の処理
      // 実際のプロジェクトではトークンの保存などを行います
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home');
    } else {
      setError('メールアドレスとパスワードを入力してください');
    }
  };

  return (
    <div className="login-container">
      <h1>ログイン</h1>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレスを入力"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            required
          />
        </div>
        
        <button type="submit" className="login-button">ログイン</button>
      </form>
    </div>
  );
};

export default LoginPage;
