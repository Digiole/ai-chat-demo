import { useState, useEffect, useCallback } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

const useMicrophone = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [transcriptReady, setTranscriptReady] = useState(false);
  const [micStopped, setmicStopped] = useState(false);

  const handleListen = useCallback(() => {
    if (isListening && mic.readyState !== 'listening') {
      mic.start();
    } else if (!isListening && mic.readyState === 'listening') {
      mic.stop();
    }
  }, [isListening]);

  const stopMic = useCallback(() => {
    setIsListening(false);
    setTranscriptReady(false);
    setmicStopped(true);
    setTranscript('');
    if (mic.readyState === 'listening') {
      mic.stop();
    }
  }, []);

  useEffect(() => {
    let timeoutId;

    mic.onstart = () => {
      console.log('Mic is on');
      setTranscriptReady(false);
    };

    mic.onend = () => {
      console.log('Stopped Mic');
      if (!micStopped) {
        setTranscriptReady(true);
      } else {
        setTranscriptReady(false);
        setIsListening(false);
        setTranscript('');
      }
      clearTimeout(timeoutId);
    };

    mic.onresult = (event) => {
      const interimTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

      setTranscript(interimTranscript);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsListening(false);
        mic.stop();
        setTranscriptReady(true);
      }, 3000);
    };

    mic.onerror = (event) => {
      console.log(event.error);
    };

    handleListen();

    return () => {
      mic.stop();
    };
  }, [isListening, handleListen]);

  return {
    isListening,
    setIsListening,
    transcript,
    transcriptReady,
    setTranscriptReady,
    stopMic,
  };
};

export default useMicrophone;
