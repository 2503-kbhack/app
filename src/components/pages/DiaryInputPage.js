import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const DiaryInputPage = () => {
  const [recording, setRecording] = useState(false);  // 録音中かどうか
  const [audioLevel, setAudioLevel] = useState(0);    // 音量のレベル (0〜1の範囲を想定)
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rafIdRef = useRef(null);

  // 顔のイメージを切り替えるための関数
  const getFaceExpression = (level) => {
    // ここでは簡単にレベルに応じて文字を変化させます
    // 実際は <img src="..." /> などの切り替えでもOK
    if (level > 0.7) {
      return 'ヽ(ﾟДﾟ)ﾉ';    // びっくり顔
    } else if (level > 0.3) {
      return '(｀・ω・´)';  // ちょっと集中した顔
    } else {
      return '(・_・)';      // 通常の顔
    }
  };

  const startRecording = async () => {
    try {
      // マイクへのアクセス権をユーザーにリクエスト
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // AudioContext を生成
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      // AnalyserNode を作成
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      dataArrayRef.current = new Uint8Array(analyserRef.current.fftSize);

      // ソースとアナライザーを接続
      source.connect(analyserRef.current);

      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('マイクへのアクセスが許可されていない、または何らかのエラーが発生しました。');
    }
  };

  const stopRecording = () => {
    setRecording(false);

    // AudioContext やループの後処理
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  // 音声レベルを解析してステートに反映するためのループ
  const analyzeAudio = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

      // time domain のデータを使って、大まかな音量レベルを計算する例
      // 値は 0-255 の範囲を想定
      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const val = dataArrayRef.current[i] - 128;  // 中心を 128 として振り幅を計算
        sum += Math.abs(val);
      }
      // 平均音量を 0-1 の範囲に正規化
      const avg = sum / dataArrayRef.current.length;
      const normalized = avg / 128; // 128 が最大の振り幅

      setAudioLevel(normalized);
    }
    // 次のフレームで再度呼び出す
    rafIdRef.current = requestAnimationFrame(analyzeAudio);
  };

  // recording が true になったら解析を開始し、false になったら停止
  useEffect(() => {
    if (recording) {
      analyzeAudio();
    } else {
      // 停止時には値をリセット
      setAudioLevel(0);
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording]);

  return (
    <div>
      <h1>Diary Input</h1>
      <p>ここで音声を入力</p>

      {/* ボタン：録音中でなければ「録音開始」、録音中なら「録音停止」 */}
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {/* キャラクターの顔を表示（音声レベルに応じて表情を変更） */}
      <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
        {getFaceExpression(audioLevel)}
      </div>

      <Link to="/diaries/:id/edit">Create</Link>
      <nav>
        <ul>
          <li><Link to="/diaries">Back to Diary List</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default DiaryInputPage;
