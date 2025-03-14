import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DiaryEditPage = () => {
  // ▼ 「タイトル」「本文」「リマインドの有無」を持つ配列を用意
  const [diaryItems, setDiaryItems] = useState([
    {
      title: '朝の運動の振り返り',
      body: 'ここに本文を入力してください',
      remind: false
    },
    {
      title: '昼食のメニュー',
      body: 'ここに本文を入力してください',
      remind: false
    },
    {
      title: '夜のリラックスタイム',
      body: 'ここに本文を入力してください',
      remind: false
    },
  ]);

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

  return (
    <div>
      <h1>Diary Edit</h1>
      <p>ここで書き起こしたテキストを修正</p>

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

      <Link to="/diaries/:id">Submit</Link>
    </div>
  );
};

export default DiaryEditPage;
