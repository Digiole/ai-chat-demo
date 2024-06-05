import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Box,
  Text,
  InputLeftElement,
} from '@chakra-ui/react';

import SpeechToText from './SpeechToText';

import send from './imgs/send.json';
import Lottie from 'react-lottie';
const SearchInputWithButton = ({
  isLoading,
  SearchTerm,
  setSearchTerm,
  submit,
}) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box width={'80%'} mx="auto">
      <InputGroup
        size="lg"
        borderRadius={20}
        bgColor={'white'}
        boxShadow="md"
        mx="auto"
        className="custom-input"
        width={{ base: '100%' }}
      >
        <Input
          borderRadius={20}
          pr="4.5rem"
          pl="1.5rem"
          placeholder="Type here.."
          onChange={(e) => handleChange(e)}
          value={SearchTerm}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && SearchTerm) {
              submit(SearchTerm);
            }
          }}
        />
        <InputRightElement width="4.5rem">
          <Button
            size="md"
            borderRadius={20}
            textTransform="capitalize"
            onClick={() => submit(SearchTerm)}
            isDisabled={isLoading || !SearchTerm}
            background={'transparent'}
            _hover={{ background: 'transparent' }}
          >
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: send,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              isStopped={!isLoading}
              height={150}
              width={150}
              speed={5}
            />
          </Button>
        </InputRightElement>
        {
          //  <InputLeftElement
          //       width="3.5rem"
          //       mr={2}
          //       display="flex"
          //       alignItems="center"
          //       justifyContent="center"
          //       height="full"
          //     >
          //       {
          //         <Box
          //         cursor={'pointer'}
          //         alignItems="center"
          //         display="flex"
          //         height="full"
          //       >
          //         <SpeechToText setSearchTerm={setSearchTerm} isLoading={isLoading} />
          //         </Box>
          //       }
          //         </InputLeftElement>
        }
      </InputGroup>
      <Text pt={2} textAlign={'center'}>
        Powered by Digiole
      </Text>
    </Box>
  );
};

export default SearchInputWithButton;
