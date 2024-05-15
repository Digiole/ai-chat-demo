import React, { useEffect, useRef, useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import SearchInputWithButton from './SearchInput';
import ConversationBox from './ConversationBox';

import { SendMessage, GetMessage } from './openAi';

import { useParams } from 'react-router-dom';

const MainScreen = () => {
  const { convId } = useParams();

  const [SearchTerm, setSearchTerm] = useState('');

  const [messages, setMessages] = useState([]);
  const [data, setData] = useState({ name: '', avatarUrl: '' });
  const [isLoading, setisLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    GetMessage({ setData, setMessages, setisLoading, convId });
  }, [convId]);

  const handleSendMessage = () => {
    SendMessage({
      setMessages,
      messages,
      SearchTerm,
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
          <>
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
              <SearchInputWithButton
                isLoading={isLoading}
                SearchTerm={SearchTerm}
                setSearchTerm={setSearchTerm}
                submit={handleSendMessage}
              />
            </Box>
          </>
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
