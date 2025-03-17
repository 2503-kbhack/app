import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAudioRecorder from '../../hooks/useAudioRecorder';

// ランダム表示したいアイコンの候補
const ICONS = ['👍', '❤️', '🌈', '✨', '👏', '👼', '🥹', '🎊', '🙌'];

const DiaryInputPage = () => {
  // UI 用のステート
  const [icon, setIcon] = useState(null);
  const [face, setFace] = useState('(・_・)');
  const [diary, setDiary] = useState('');

  /**
   * ランダムなアイコンを1秒間だけ表示する
   */
  const showRandomIcon = () => {
    const random = Math.floor(Math.random() * ICONS.length);
    setIcon(ICONS[random]);
    setTimeout(() => setIcon(null), 2000);
  };

  /**
   * 音量に応じて表情を変化させる
   */
  const updateFaceExpression = (level) => {
    if (level > 0.7) {
      setFace('*･゜ﾟ･*:.｡..｡.:*･(*ﾟ▽ﾟ*)･*:.｡. .｡.:*･゜ﾟ･*');
    } else if (level > 0.5) {
      setFace('ヾ(๑╹◡╹)ﾉ"');
    } else if (level > 0.05) {
      setFace('（＾Ｏ＾☆♪');
    } else {
      setFace('(・_・)');
    }
  };

  // カスタムフックの利用
  const { recording, audioLevel, transcript, setTranscript, startRecording, stopRecording } = useAudioRecorder({
    onSilence: showRandomIcon
  });

  // 音量レベルの変化に伴い表情を更新
  useEffect(() => {
    updateFaceExpression(audioLevel);
  }, [audioLevel]);

  return (
    <div>
      <h1>Diary Input</h1>
      <p>ここで音声を入力</p>

      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      <div>
        <strong>Transcript:</strong>
        <textarea 
          style={{ width: '100%', height: '100px' }} 
          disabled={recording} 
          onChange={e => { setTranscript(e.target.value) }} 
          value={transcript}
        />
      </div>

      {/* 顔とアイコンを横並びにして、アイコンを右に配置 */}
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', margin: '1rem 0' }}>
        <div>{face}</div>
        {icon && (
          <div style={{ marginLeft: '1rem' }}>{icon}</div>
        )}
      </div>

      <Link 
        to="/diaries/:id/edit" 
        onClick={() => sessionStorage.setItem('transcript', transcript)}
      >
        Create
      </Link>
      <nav>
        <ul>
          <li><Link to="/diaries">Back to Diary List</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default DiaryInputPage;
