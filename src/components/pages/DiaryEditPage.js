import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { supabase } from '../../api/supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import AppHeader from './AppHeader'; 


const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = process.env.REACT_APP_SUPABASE_URL;

const DiaryEditPage = () => {
  // ▼ 「タイトル」「本文」「リマインドの有無」を持つ配列を用意
  const [diaryItems, setDiaryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  // ▼ タイトル変更時のハンドラー
  const handleTitleChange = (index, newTitle) => {
    const updatedItems = [...diaryItems];
    updatedItems[index].title = newTitle;
    setDiaryItems(updatedItems);
  };

  // ▼ 本文変更時のハンドラー
  const handleBodyChange = (index, newBody) => {
    const updatedItems = [...diaryItems];
    updatedItems[index].body = newBody;
    setDiaryItems(updatedItems);
  };
  

  // ▼ 重要イベントのチェックボックス変更時のハンドラー
  const handleImportantChange = (index) => {
    const updatedItems = diaryItems.map((item, i) => ({
      ...item,
      isImportant: i === index,
    }));
    setDiaryItems(updatedItems);
  };

  const transcript = sessionStorage.getItem('transcript');
  console.log(transcript);
  useEffect(() => {
    fetch(`${API_URL}/functions/v1/generate-diary`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to generate diary');
        }
        return response.json();
      })
      .then((data) => {
        // ここで diariesWithImportant を宣言
        const diariesWithImportant = data.map((item) => ({
          ...item,
          isImportant: false,
        }));
  
        console.log(diariesWithImportant);
        setDiaryItems(diariesWithImportant);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  
  // ▼ フォーム送信時のハンドラー
  const handleSubmit = async (e) => {
    
    // ▼ ここでサーバーにデータを送信する処理を書く
    // Create an array of diary objects for insertion
    const diariesToInsert = diaryItems.map(item => ({
      Author_id: user.id,
      title: item.title,
      contents: item.body,
      is_important: item.isImportant,
      index: diaryItems.indexOf(item),
    }));
    console.log(diariesToInsert);
    // Insert all diary items at once
    const { data, error } = await supabase
      .from('Diaries')
      .insert(diariesToInsert)
      .select();
    
    if (error) {
      console.error('Error inserting diaries:', error);
    } else {
      console.log('Diaries inserted successfully:', data);

    navigate("/diaries/embedding", data);
    }
    
  };

  return (
    <div className="App-body"> {/* 新しいクラスを適用 */}
      <h1 className="h1">Diary Edit</h1>
      <p>ここで書き起こしたテキストを修正</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {diaryItems.map((item, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                {/* タイトル編集欄 */}
                <div>
                  <label>タイトル: </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                  />
                </div>

                {/* 本文編集欄 */}
                <div style={{ marginTop: '4px' }}>
                  <label>本文: </label>
                  <textarea
                    rows={3}
                    cols={30}
                    value={item.body}
                    onChange={(e) => handleBodyChange(index, e.target.value)}
                  />
                </div>

                {/* 重要イベント選択欄 */}
                <div style={{ marginTop: '4px' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.isImportant}
                      onChange={() => handleImportantChange(index)}
                    />
                    一日を代表するイベント
                  </label>
                </div>
              </li>
            ))}
          </ul>
         
          <button type="button" onClick={handleSubmit}>Submit</button>
        </>
      )}


    </div>
  );
};

export default DiaryEditPage;
