import { supabase } from './supabaseClient';

export const fetchProfile = async (userId) => {
  // profiles テーブルから userId に合致するレコードを取得する。
  // もし、profiles テーブルで user_id というカラムを使っている場合は、eq('user_id', userId) に変更してください。
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('プロフィール取得エラー:', error.message);
    return null;
  }
  return data;
};
