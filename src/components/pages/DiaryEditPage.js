import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = process.env.REACT_APP_SUPABASE_URL;

const DiaryEditPage = () => {
  // ▼ 「タイトル」「本文」「リマインドの有無」を持つ配列を用意
  const [diaryItems, setDiaryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // ▼ リマインドのラジオボタン変更時のハンドラー
  const handleReminderChange = (index, value) => {
    const updatedItems = [...diaryItems];
    updatedItems[index].remind = value; // true/false
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
      body: JSON.stringify({transcript}),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to generate diary');
      }
      return response.json();
    }
    ).then((data) => {
      const diaries = data;
      console.log(diaries);
      setDiaryItems(diaries);
      setIsLoading(false); // Set loading to false after data is fetched
    }).catch((error) => {
      console.error(error);
      setIsLoading(false); // Set loading to false even if there is an error
    });
  }, [])

  return (
    <div>
      <h1>Diary Edit</h1>
      <p>ここで書き起こしたテキストを修正</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
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

              {/* リマインド選択欄 */}
              <div style={{ marginTop: '4px' }}>
                <label>
                  <input
                    type="radio"
                    name={`reminder-${index}`}
                    value="yes"
                    checked={item.remind === true}
                    onChange={() => handleReminderChange(index, true)}
                  />
                  リマインド欲しい
                </label>
                <label style={{ marginLeft: '1rem' }}>
                  <input
                    type="radio"
                    name={`reminder-${index}`}
                    value="no"
                    checked={item.remind === false}
                    onChange={() => handleReminderChange(index, false)}
                  />
                  リマインド欲しくない
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link to="/diaries/:id">Submit</Link>
    </div>
  );
};

export default DiaryEditPage;
