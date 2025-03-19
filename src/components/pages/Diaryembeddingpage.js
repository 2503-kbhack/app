import React,{use, useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { fetchDiaries } from '../../api/fetchDiaries';
import useSWR from 'swr';
import textsembedding from '../../api/textsembedding';
const API_URL = process.env.REACT_APP_SUPABASE_URL;
const url = `${API_URL}/functions/v1/text-embedding`;

const DiaryembeddingPage =  (data) => {
  const { user } = useAuth();
  const [embeddings, setEmbeddings] = useState([]);
  // data[0]の形式は以下の通り
  // {
  //   Author_id: user.id,
  //   title: item.title,
  //   contents: item.body,
  //   is_important: item.isImportant,
  //   index: diaryItems.indexOf(item),
  // }
  const diaries= data.map((item) => {
    return {
      id : item.id,
      contents: item.contents,
      contents: item.contents,
      is_important: item.isImportant,
      index: item.index,
    };
  });
  const textsarray = diaries.map((diary) => diary.contents);
  useEffect(() => {
    console.count('DiaryembeddingPage.js');
    const embeddings =  textsembedding(textsarray);
    console.log(embeddings);
    setEmbeddings(embeddings);

  }, []);
  //embeddingをdiariesに追加
  const diariesWithEmbeddings = diaries.map((diary, index) => {
    return {
      ...diary,
      embedding: embeddings[index],
    };
  });
  for (const diary of diariesWithEmbeddings) {
    
  }
  console.log(diariesWithEmbeddings);
  return (
    <div>
      <h1>DiaryembeddingPage</h1>
    </div>
  );
};

export default DiaryembeddingPage;