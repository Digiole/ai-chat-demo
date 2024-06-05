import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import thinking from './imgs/thinking.json';
import { svgDataUrl } from './imgs/fallbackimg';
import Lottie from 'react-lottie';
import useAudio from './useAudio';
import imgMicOnanimate from './imgs/abc.json';
import useMicrophone from './useMicrophone'; // Import the custom hook
import { keyframes } from '@emotion/react';
import roundSpeaker from './imgs/roundSpeaker.json';
import { ChatIcon } from '@chakra-ui/icons';
const MotionBox = motion(Box);
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.25;
  }
  20% {
    opacity: 0.5;
  }
  30% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
 
  50% {
    opacity: 0.5;
  }
  
  100% {
    opacity: 0;
  }
`;

const AiSpeaking = ({
  setisOpen,
  isOpen,
  avatar,
  name,
  isLoading,
  SearchTerm,
  setSearchTerm,
  submit,
  lastText,
}) => {
  const { playAudio, isPlaying, isFetching, stopAudio } = useAudio();
  const [AudioAllowed, setAudioAllowed] = useState(false);
  const {
    isListening,
    setIsListening,
    transcript,
    transcriptReady,
    setTranscriptReady,
    stopMic,
  } = useMicrophone();

  React.useEffect(() => {
    setSearchTerm(transcript);
  }, [transcript, setSearchTerm]);

  useEffect(() => {
    const handleSubmission = async () => {
      if (transcriptReady) {
        await submit(transcript);
        setTranscriptReady(false);
      }
    };

    handleSubmission();
  }, [transcriptReady]);

  useEffect(() => {
    if (lastText && AudioAllowed) {
      playAudio(lastText, () => {
        setIsListening(!isListening);
      });
    }
  }, [lastText]);

  const [send, setsend] = useState(false);
  const hasSentData = useRef(false);

  const sendData = useCallback(() => {
    if (hasSentData.current) return;

    submit(SearchTerm);
    setsend(false);
    hasSentData.current = true;
  }, [SearchTerm, submit]);

  useEffect(() => {
    if (send && !hasSentData.current) {
      sendData();
    }
  }, [send, sendData]);

  useEffect(() => {
    setAudioAllowed(isOpen);
  }, [isOpen]);
  return (
    <AnimatePresence>
      <MotionBox
        textColor="white"
        bg="#30313C"
        position="fixed"
        top={0}
        left={0}
        right={0}
        height="100vh"
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        exit={{ y: '100vh' }}
        transition={{ duration: 0.5 }}
        zIndex={9999999}
      >
        <Button
          zIndex={99999999}
          className="bg-secondary"
          position="absolute"
          roundedBottom="full"
          pr={10}
          pl={10}
          left="50%"
          top={0}
          textColor="#768486"
          bg="bg-secondary"
          _hover={{ background: 'bg-secondary' }}
          transform="translateX(-50%)"
          onClick={() => {
            setAudioAllowed(false);
            setisOpen(!isOpen);
          }}
        >
          <ChevronDownIcon boxSize={6} />
          <Text pl={3} pr={3}>
            Text Chat
          </Text>{' '}
          <ChatIcon />
        </Button>
        <Grid height="100%" placeItems="center" textAlign="center">
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              mb={4}
              position="relative"
              width="300px"
              height="250px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={avatar}
                fallbackSrc={svgDataUrl}
                width="200px"
                height="200px"
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                m="auto"
                zIndex="1"
              />
              <Lottie
                isClickToPauseDisabled={true}
                options={{
                  onClick: null,
                  loop: true,
                  autoplay: false,
                  animationData: roundSpeaker,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                isStopped={!isPlaying}
                height={600}
                width={600}
              />
              <Box
                position="absolute"
                zIndex={-4}
                animation={
                  isLoading || isFetching || isListening
                    ? `${fadeIn} 1s forwards`
                    : `${fadeOut} 1s forwards`
                }
              >
                <Lottie
                  options={{
                    loop: true,
                    autoplay: false,
                    animationData: thinking,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  isStopped={isPlaying}
                  height={500}
                  width={'100%'}
                />
              </Box>
            </Box>
            <Text pt={4} textAlign="center" mb={10}>
              <span className="capitalize">{name}</span>
            </Text>
            <Flex gap={4}>
              <Button
                onClick={() => {
                  setIsListening(!isListening);
                }}
                background={'white'}
                height={20}
                width={20}
                _hover={{ background: 'gray.100' }}
                rounded={'full'}
                isDisabled={isLoading || isListening || isPlaying || isFetching}
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
                    height={28}
                    width={28}
                  />
                }
              </Button>
              <Button
                background={'red.400'}
                textColor={'white'}
                height={20}
                width={20}
                _hover={{ background: 'red.600' }}
                rounded={'full'}
                onClick={() => {
                  setsend(false);
                  stopMic();
                  stopAudio();
                }}
              >
                | |
              </Button>
            </Flex>

            <Text p={4}>{SearchTerm}</Text>
          </Box>
        </Grid>
      </MotionBox>
    </AnimatePresence>
  );
};

export default AiSpeaking;
