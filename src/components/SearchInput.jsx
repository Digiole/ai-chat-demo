import { TriangleUpIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Box,
  Text,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';

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
          placeholder="Type here.."
          onChange={(e) => handleChange(e)}
          value={SearchTerm}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && SearchTerm) {
              submit();
            }
          }}
        />
        <InputRightElement width="4.5rem">
          <Button
            size="md"
            borderRadius={20}
            textTransform="capitalize"
            onClick={() => submit()}
            isDisabled={isLoading || !SearchTerm}
            bgColor={'gray.200'}
            _hover={{ bg: 'gray.300' }}
          >
            {isLoading ? <Spinner /> : <TriangleUpIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text pt={2} textAlign={'center'}>
        Powered by Digiole
      </Text>
    </Box>
  );
};

export default SearchInputWithButton;
