import { Box, Flex, Grid, Image, Img, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import img from './imgs/chatting.gif';
import CopyButton from './CopyButton';
import userIcon from './imgs/userIcon.png';
const ConversationBox = ({ answer, isLoading, name, avatar }) => {
  const boxRef = useRef(null);
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo({
        top: boxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [answer]);

  return (
    <Flex
      className="custom-scrollbar"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      overflowWrap="break-word"
      textAlign="left"
      overflowY={'auto'}
      height={'calc(100vh - 80px)'}
      ref={boxRef}
      zIndex={998}
      pb={10}
    >
      <Box width="100%" mt={'80px'}>
        <Grid placeItems="center" textAlign="center">
          <Image
            src={avatar}
            fallbackSrc="https://icon-park.com/imagefiles/loading7_brown.gif"
            width={'150px'}
            height={'150px'}
          />

          <Text pt={3}>
            I'm <span className={'capitalize'}>{name}</span>, an AI Assistant by
            Digiole.
          </Text>
        </Grid>
      </Box>
      {answer && answer.length > 1
        ? answer.map((msg, index) => {
            if (msg.role === 'system' || msg.appear === false) {
              return null;
            }
            return (
              <Grid flexDirection="row" key={index} width={'100%'}>
                {msg.role === 'user' ? (
                  <Box className="bg-secondary">
                    <Box width={{ base: '100%', md: '80%' }} mx={'auto'} p={3}>
                      <Flex>
                        <Img src={userIcon} width={'25px'} marginRight="2" />
                        <Text
                          display={'flex'}
                          alignItems={'center'}
                          fontWeight={'bold'}
                          className="text-primary"
                          fontSize={'1.1rem'}
                        >
                          You
                        </Text>
                      </Flex>
                      <Text marginLeft={9}>{msg.content}</Text>
                    </Box>
                  </Box>
                ) : (
                  <React.Fragment>
                    <Box width={{ base: '100%', md: '80%' }} mx={'auto'} p={3}>
                      <Flex>
                        <Img src={avatar} width={'30px'} marginRight="2" />
                        <Text
                          display={'flex'}
                          gap={1}
                          alignItems={'center'}
                          fontWeight={'bold'}
                          className="text-primary"
                          fontSize={'1.1rem'}
                          textTransform={'capitalize'}
                        >
                          {name}
                        </Text>
                      </Flex>
                      <Text marginLeft={9}>{msg.content}</Text>
                      <Box display="flex" justifyContent="flex-end">
                        <CopyButton text={msg.content} />
                      </Box>
                    </Box>
                  </React.Fragment>
                )}
              </Grid>
            );
          })
        : ''}
      {isLoading ? (
        <React.Fragment>
          <Box width={{ base: '100%', md: '80%' }} mx={'auto'} p={3}>
            <Flex>
              <Img src={avatar} width={'30px'} marginRight="2" />
              <Text
                display={'flex'}
                gap={1}
                alignItems={'center'}
                fontWeight={'bold'}
                className="text-primary"
                fontSize={'1.1rem'}
                textTransform={'capitalize'}
              >
                {name}
              </Text>
            </Flex>
            <Flex pl={8}>
              <img src={img} width={50} alt="loading" />
            </Flex>
          </Box>
        </React.Fragment>
      ) : (
        ''
      )}
    </Flex>
  );
};

export default ConversationBox;
