import React, { useEffect, useRef, useState } from 'react';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import SearchInputWithButton from './SearchInput';
import ConversationBox from './ConversationBox';
import MyIcon from './imgs/headset';
import { SendMessage, GetMessage } from './openAi';

import { useParams } from 'react-router-dom';
import AiSpeaking from './AiSpeaking';
import { ChevronUpIcon } from '@chakra-ui/icons';

const MainScreen = () => {
  const [isOpen, setisOpen] = useState(false);
  const { convId } = useParams();
  const [lastText, setLastText] = useState('');

  const [SearchTerm, setSearchTerm] = useState('');

  const [messages, setMessages] = useState([]);
  const [data, setData] = useState({ name: '', avatarUrl: '' });
  const [isLoading, setisLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    GetMessage({ setData, setMessages, setisLoading, convId });
  }, [convId]);

  const handleSendMessage = (searchTerm) => {
    SendMessage({
      lastText,
      setLastText,
      setMessages,
      messages,
      SearchTerm: searchTerm,
      setisLoading,
      setSearchTerm,
      convId,
    });
  };

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo({
        top: boxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <Box position="relative">
      <Flex
        height={'100vh'}
        justifyContent="center"
        mx="auto"
        width={{ base: '100%' }}
        alignItems="flex-start"
        position="relative"
      >
        {messages ? (
          <React.Fragment>
            {isOpen ? (
              <AiSpeaking
                setisOpen={setisOpen}
                isOpen={isOpen}
                avatar={data.avatarUrl}
                name={data.name}
                isLoading={isLoading}
                SearchTerm={SearchTerm}
                setSearchTerm={setSearchTerm}
                submit={() => handleSendMessage(SearchTerm)}
                lastText={lastText}
              />
            ) : (
              ''
            )}
            <ConversationBox
              answer={messages}
              isLoading={isLoading}
              name={data.name}
              avatar={data.avatarUrl}
            />
            <Box
              className="bg-secondary"
              zIndex={999}
              justifyContent="center"
              position="absolute"
              bottom="0px"
              width={'100%'}
              mx="auto"
              py={5}
            >
              <Button
                className="bg-secondary"
                position="absolute"
                roundedTop={'full'}
                pr={10}
                pl={10}
                left={'50%'}
                top={-10}
                textColor={'#768486'}
                bg={'bg-secondary'}
                _hover={{ background: 'bg-secondary' }}
                transform={'translateX(-50%)'}
                onClick={() => setisOpen(!isOpen)}
              >
                <ChevronUpIcon boxSize={6} />
                <Text pl={2} pr={3}>
                  Voice Chat
                </Text>{' '}
                <MyIcon />
              </Button>
              <SearchInputWithButton
                isLoading={isLoading}
                SearchTerm={SearchTerm}
                setSearchTerm={setSearchTerm}
                submit={() => handleSendMessage(SearchTerm)}
              />
            </Box>
          </React.Fragment>
        ) : (
          <Flex
            height="100vh"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Text fontSize="2xl">Chat history not found</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default MainScreen;
