// fetchDiaries.js
import { supabase } from './supabaseClient';

/**
 * 日記データを取得する関数
 * 
 * @param {Object} filters - 絞り込み用フィルタオブジェクト
 * @param {string} [filters.author] - 作者IDで絞り込み (テーブルのカラム名: Author_id)
 * @param {string} [filters.startDate] - 作成日の開始日 (例: '2021-01-01') 作成日 >= startDate
 * @param {string} [filters.endDate] - 作成日の終了日 (例: '2021-12-31') 作成日 <= endDate
 * @param {number|string} [filters.id] - 日記IDで絞り込み
 * @returns {Array|null} 絞り込みに合致した日記データの配列、エラー発生時は null
 */
export const fetchDiaries = async (filters = {}) => {
  try {
    let query = supabase.from('Diaries').select('*');

    // 作者で絞り込み (Author_id カラムが存在する前提)
    if (filters.author) {
      query = query.eq('Author_id', filters.author);
    }
    // 作成日の開始日で絞り込み (created_at >= startDate)
    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate);
    }
    // 作成日の終了日で絞り込み (created_at <= endDate)
    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate);
    }
    // 日記IDで絞り込み
    if (filters.id) {
      query = query.eq('id', filters.id);
    }

    // 作成日の降順で並べ替え
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('日記取得エラー:', error.message);
    return null;
  }
};

