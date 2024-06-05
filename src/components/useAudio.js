import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../URLS';
export default function useAudio() {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const playAudio = async (text, onFinish) => {
    let audioInstance;
    setIsFetching(true); // Start fetching
    try {
      // Fetch the audio data from the server
      const response = await axios.post(
        `${BACKEND_URL}/generate-audio`,
        { text },
        { responseType: 'blob' }
      );

      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create a new Audio object
      audioInstance = new Audio(audioUrl);

      // Handle the end of the audio playback
      audioInstance.addEventListener('ended', () => {
        setIsPlaying(false);
        // Clean up the audio object and URL
        URL.revokeObjectURL(audioUrl);
        // Execute the onFinish callback
        if (typeof onFinish === 'function') {
          onFinish();
        }
      });

      // Handle any errors that occur during playback
      audioInstance.addEventListener('error', (event) => {
        console.error('Error during audio playback:', event);
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      });

      // Set the audio instance in the state
      setAudio(audioInstance);

      // Play the new audio immediately
      audioInstance.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error fetching audio:', error);
    } finally {
      setIsFetching(false); // End fetching
    }
  };

  const stopAudio = () => {
    if (audio) {
      setIsFetching(false);
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      // Clean up the audio object and URL
      URL.revokeObjectURL(audio.src);
      setAudio(null);
    }
  };

  return { playAudio, isPlaying, isFetching, stopAudio };
}
