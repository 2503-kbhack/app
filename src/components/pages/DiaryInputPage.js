import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import useAudioRecorder from '../../hooks/useAudioRecorder';

import '../../App.css';

const DiaryInputPage = () => {
  const [face, setFace] = useState('/images/kairu_normal_mic.gif');
  const [transcript, setTranscript] = useState('');

  const updateFaceExpression = (level) => {
    if (level > 0.7) {
      setFace('/images/kairu_happy_mic.png');
    } else {
      setFace('/images/kairu_normal_mic.png');
    }
  };


  const { recording, startRecording, stopRecording, audioLevel, transcript: recordedTranscript } = useAudioRecorder({});

  useEffect(() => {
    
    if (recordedTranscript) {
      setTranscript(recordedTranscript);
    }
  }, [recordedTranscript]);
  
  
  useEffect(() => {
    console.log(audioLevel);
    updateFaceExpression(audioLevel);
  }, [audioLevel]);

  return (
    <div className="App-body">
      <h1>今日の日記を作成</h1>

      {/* transcript のリアルタイム表示（編集可能にする） */}
      <label htmlFor="transcript">Transcript:</label><br />
      <textarea
        id="transcript"
        name="transcript"
        rows="4"
        cols="50"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />


      {/* --- ここに「送信ボタン」を配置 --- */}
      <Link to="/diaries/:id/edit" className="button-link" style={{ marginTop: '1rem', display: 'inline-block' }}>
        送信
      </Link>

      {/* ミュートボタンを左・イルカの画像を右に配置 */}
      <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-end', margin: '1rem 0' }}>
        {/* イルカの画像 */}
        <img
          src={face}
          alt="可愛いイルカ"
          style={{ width: '200px', height: '200px' }}
        />


        {/* ミュートボタン（左側に配置） */}
        <button
          onClick={recording ? stopRecording : startRecording}
          className="button-link"
          style={{ marginRight: '1rem' }}
        >
          {recording ? (
            <Volume2 size={20} />
          ) : (
            <VolumeX size={20} />
          )}
        </button>
      </div>


      {/* 「Back to Diary List」へのリンクはそのまま残す */}

      <nav>
        <ul>
          <li><Link to="/diaries" className="button-link">Homeに戻る</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default DiaryInputPage;
