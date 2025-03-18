import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { fetchProfile } from '../../api/fetchProfile'; // ここで先ほどの fetchProfile.js をインポート

function ProfileCheckPage() {
  const { user, profile, setProfile } = useAuth(); // AuthContext からユーザーとプロフィールを取得
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. 未ログインならログインページへ
    if (!user) {
      navigate('/');
      return;
    }

    // 2. fetchProfile でプロフィール取得
    const checkProfile = async () => {
      const data = await fetchProfile(user.id);
      if (!data) {
        // 取得エラーまたは該当レコードなし
        navigate('/profile/create');
        setLoading(false);
        return;
      }

      // 3. AuthContext の profile ステートも更新しておく
      setProfile((prev) => ({
        ...prev,
        nickname: data.nickname || '',
        birth_date: data.birth_date || '',
        gender: data.gender || '',
        // 他にも必要なフィールドがあれば更新
      }));

      // 4. 必須フィールドをチェック (nickname, birth_date, gender)
      if (data.nickname && data.birth_date && data.gender) {
        // 3つともあれば /home
        navigate('/home');
      } else {
        // 一つでも空なら /profile/create
        navigate('/profile/create');
      }
      setLoading(false);
    };

    checkProfile();
  }, []);

  if (loading) {
    return <div>プロフィールをチェックしています...</div>;
  }

  // ほぼリダイレクトされるので、ここが表示されることは少ない
  return <div>処理中...</div>;
}

export default ProfileCheckPage;
