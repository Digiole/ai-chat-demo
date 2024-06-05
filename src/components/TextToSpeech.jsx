import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Assuming you have Axios installed
import speaker from './imgs/speaker.json';
import Lottie from 'react-lottie';
import { Button, Image } from '@chakra-ui/react';
import img from './imgs/speakerimg.png';
import { BACKEND_URL } from '../URLS';

const AudioPlayer = ({ textProp, auto = false }) => {
  // Receive text as a prop
  const [audioData, setAudioData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeakOn, setisSpeakOn] = useState(false);
  const [error, setError] = useState(null);

  const fetchAudio = useCallback(async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/generate-audio`,
        {
          text: textProp,
        },
        {
          responseType: 'blob',
        }
      );

      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudioData(audioUrl);

      setError(null);
    } catch (error) {
      setError('Error fetching audio');
    }
  }, [textProp]);

  useEffect(() => {
    if (textProp && isPlaying) {
      fetchAudio();
    }

    // Clean up the temporary URL when the component unmounts
    return () => URL.revokeObjectURL(audioData);
  }, [audioData, fetchAudio, isPlaying, textProp]); // Re-fetch audio if textProp changes

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setisSpeakOn(!isSpeakOn);
  };

  useEffect(() => {
    if (audioData && isPlaying) {
      const audio = new Audio(audioData);

      // Play the audio
      audio.play();
      setisSpeakOn(true);
      // Set isPlaying to false when the audio finishes playing
      const handleAudioEnded = () => {
        setIsPlaying(false);
        setisSpeakOn(false);
        audio.removeEventListener('ended', handleAudioEnded); // Clean up event listener
      };

      audio.addEventListener('ended', handleAudioEnded);

      // Clean up the event listener and potentially the audio object on unmount
      return () => {
        if (audio) {
          audio.removeEventListener('ended', handleAudioEnded);
          audio.pause(); // Optional: Pause the audio if necessary on unmount
          setisSpeakOn(false);
          audio.currentTime = 0; // Optional: Reset audio position on unmount
        }
      };
    }
  }, [isPlaying, audioData]); // Re-run when isPlaying or audioData changes

  return (
    <React.Fragment>
      {error ? (
        ''
      ) : (
        <Button
          width={'auto'}
          p={0}
          m={0}
          onClick={auto ? togglePlay() : togglePlay}
          _hover={{ background: 'transparent' }}
          background="transparent"
        >
          {isPlaying ? (
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: speaker,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={29}
              width={29}
            />
          ) : (
            <Image src={img} width={5} />
          )}
        </Button>
      )}
    </React.Fragment>
  );
};

export default AudioPlayer;
