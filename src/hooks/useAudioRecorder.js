import { useState, useRef, useEffect } from 'react';

function useAudioRecorder({ onSilence } = {}) {
  const [recording, setRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rafIdRef = useRef(null);
  const quietFramesRef = useRef(0);
  const isSpeakingRef = useRef(false);

  const QUIET_THRESHOLD = 0.05;
  const SPEAK_THRESHOLD = 0.1;
  const MIN_QUIET_FRAMES = 30;

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
    setAudioLevel(0);
    isSpeakingRef.current = false;
    quietFramesRef.current = 0;
  };

  const analyzeAudio = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const val = dataArrayRef.current[i] - 128;
        sum += Math.abs(val);
      }
      const avg = sum / dataArrayRef.current.length;
      const normalized = avg / 128;
      setAudioLevel(normalized);

      if (isSpeakingRef.current) {
        if (normalized < QUIET_THRESHOLD) {
          quietFramesRef.current += 1;
          if (quietFramesRef.current >= MIN_QUIET_FRAMES) {
            isSpeakingRef.current = false;
            quietFramesRef.current = 0;
            onSilence && onSilence();
          }
        } else {
          quietFramesRef.current = 0;
        }
      } else {
        if (normalized > SPEAK_THRESHOLD) {
          isSpeakingRef.current = true;
          quietFramesRef.current = 0;
        }
      }
    }
    rafIdRef.current = requestAnimationFrame(analyzeAudio);
  };

  useEffect(() => {
    if (recording) {
      analyzeAudio();
    } else {
      setAudioLevel(0);
      isSpeakingRef.current = false;
      quietFramesRef.current = 0;
    }
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [recording]);

  return { recording, audioLevel, startRecording, stopRecording };
}

export default useAudioRecorder;
