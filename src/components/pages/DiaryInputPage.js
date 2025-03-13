import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ランダム表示したいアイコンの候補
const ICONS = ['👍', '❤️', '🌈', '✨', '👏', '👼','🥹', '🎊', '🙌'];

const DiaryInputPage = () => {
  const [recording, setRecording] = useState(false);    // 録音中かどうか
  const [audioLevel, setAudioLevel] = useState(0);      // 音量レベル (0〜1の範囲)
  const [icon, setIcon] = useState(null);               // ランダム表示するアイコン
  const [face, setFace] = useState('(・_・)');          // キャラクターの表情

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rafIdRef = useRef(null);

  // 「話している」かどうか（true/false）を管理するためのフラグ
  const isSpeakingRef = useRef(false);

  // 「静かになったフレーム数」をカウントする
  const quietFramesRef = useRef(0);

  // ======= しきい値 =======
  // 1) "音が小さい" とみなす閾値 (これ未満で静か)
  const QUIET_THRESHOLD = 0.05;
  // 2) "話し始めた" とみなす閾値 (これ以上で話している)
  const SPEAK_THRESHOLD = 0.1;
  // 3) 静かが何フレーム連続したら「途切れた」とみなすか
  const MIN_QUIET_FRAMES = 30; // 1フレームだけ静かならすぐ「途切れた」と判定

  /**
   * 音量に応じて表情を変化させる (小さな声でも変わりやすいしきい値設定)
   * @param {number} level 0〜1の音量レベル
   */
  const updateFaceExpression = (level) => {
    if (level > 0.7) {
      setFace('*･゜ﾟ･*:.｡..｡.:*･(*ﾟ▽ﾟ*)･*:.｡. .｡.:*･゜ﾟ･*',);      // びっくり顔
    } else if (level > 0.5) {
      setFace('ヾ(๑╹◡╹)ﾉ"');    // 小声でも変化
    }  else if (level > 0.05) {
      setFace('（＾Ｏ＾☆♪');    // 小声でも変化
    } else {
      setFace('(・_・)');       // 通常の顔
    }
  };

  /**
   * ランダムなアイコンを1秒間だけ表示する
   */
  const showRandomIcon = () => {
    const random = Math.floor(Math.random() * ICONS.length);
    setIcon(ICONS[random]);
    // 2秒後にアイコンを消す
    setTimeout(() => setIcon(null), 2000);
  };

  /**
   * 録音開始
   */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      dataArrayRef.current = new Uint8Array(analyserRef.current.fftSize);

      source.connect(analyserRef.current);

      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('マイクへのアクセスが許可されていない、またはエラーが発生しました。');
    }
  };

  /**
   * 録音停止
   */
  const stopRecording = () => {
    setRecording(false);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    // 表情・音量・フラグをリセット
    setAudioLevel(0);
    setFace('(・_・)');
    isSpeakingRef.current = false;
    quietFramesRef.current = 0;
  };

  /**
   * 音声をリアルタイム解析し、音量に応じて画面を更新するループ
   */
  const analyzeAudio = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

      // time-domain データから大まかな音量レベルを算出 (0～1)
      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const val = dataArrayRef.current[i] - 128;
        sum += Math.abs(val);
      }
      const avg = sum / dataArrayRef.current.length; // 0～128
      const normalized = avg / 128;                  // 0～1

      setAudioLevel(normalized);
      updateFaceExpression(normalized);

      // =========================
      // 音声が途切れたかどうかの判定
      // =========================
      if (isSpeakingRef.current) {
        // すでに「話している」と認識している状態
        if (normalized < QUIET_THRESHOLD) {
          // 小さな音が連続したら、話が途切れたと判定
          quietFramesRef.current += 1;
          if (quietFramesRef.current >= MIN_QUIET_FRAMES) {
            isSpeakingRef.current = false;
            quietFramesRef.current = 0;
            showRandomIcon(); // アイコン表示
          }
        } else {
          // まだ声が出ているのでカウントリセット
          quietFramesRef.current = 0;
        }
      } else {
        // 「話していない」状態
        if (normalized > SPEAK_THRESHOLD) {
          // しきい値超えたら「話し始めた」と判定
          isSpeakingRef.current = true;
          quietFramesRef.current = 0;
        }
      }
    }

    // 次フレームで再度実行
    rafIdRef.current = requestAnimationFrame(analyzeAudio);
  };

  /**
   * recording が true になったら音声解析開始、false になったら停止
   */
  useEffect(() => {
    if (recording) {
      analyzeAudio();
    } else {
      setAudioLevel(0);
      updateFaceExpression(0);
      isSpeakingRef.current = false;
      quietFramesRef.current = 0;
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

      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {/* 顔とアイコンを横並びにして、アイコンを右に配置 */}
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', margin: '1rem 0' }}>
        <div>{face}</div>
        {icon && (
          <div style={{ marginLeft: '1rem' }}>{icon}</div>
        )}
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
