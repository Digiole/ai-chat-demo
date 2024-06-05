import React from 'react';
import { Button } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import imgMicOnanimate from './imgs/abc.json';
import useMicrophone from './useMicrophone'; // Import the custom hook

function SpeechToText({
  setSearchTerm,
  iconWidth = 28,
  iconHeight = 28,
  btnWidth = 28,
  btnHeight = 28,
  bg = 'transparent',
  hover = 'transparent',
  isLoading,
}) {
  const { isListening, setIsListening, transcript } = useMicrophone();

  React.useEffect(() => {
    setSearchTerm(transcript);
  }, [transcript, setSearchTerm]);

  return (
    <Button
      onClick={() => setIsListening(!isListening)}
      background={bg}
      height={btnHeight}
      width={btnWidth}
      _hover={{ background: hover }}
      rounded={'full'}
      isDisabled={isLoading}
    >
      {
        <Lottie
          options={{
            loop: true,
            autoplay: false,
            animationData: imgMicOnanimate,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          isStopped={!isListening}
          height={iconWidth}
          width={iconHeight}
        />
      }
    </Button>
  );
}

export default SpeechToText;
