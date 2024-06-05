import React, { useState, useEffect, useCallback } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Checkbox,
  Textarea,
  Box,
  IconButton,
  Flex,
  useToast,
  Grid,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import DeleteButton from './DeleteButton';

import { BACKEND_URL } from '../../URLS';
const UpdateDemoForm = () => {
  const [currentDemo, setCurrentDemo] = useState({
    demoId: null,
    name: '',
    messages: [],
    avatarUrl: '',
  });
  const [demos, setDemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const fetchDemos = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/demos`);
      if (!response.ok) {
        throw new Error('Failed to fetch demos');
      }
      const data = await response.json();
      setDemos(data);
    } catch (error) {
      console.error('Error fetching demos:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch demos',
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchDemos();

    return;
  }, [fetchDemos]);

  const setDemoValue = (e) => {
    const selectedDemoId = e.target.value;
    const selectedDemo = demos.find((demo) => demo.demoId === selectedDemoId);
    setCurrentDemo(selectedDemo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDemo({ ...currentDemo, [name]: value });
  };

  const handleFileChange = (e) => {
    setCurrentDemo({ ...currentDemo, avatar: e.target.files[0] });
  };

  const addMessage = () => {
    setCurrentDemo({
      ...currentDemo,
      messages: [
        ...currentDemo.messages,
        { role: '', content: '', appear: false },
      ],
    });
  };

  const DeleteMessage = (index) => {
    const updatedMessages = [...currentDemo.messages];
    updatedMessages.splice(index, 1);
    setCurrentDemo({ ...currentDemo, messages: updatedMessages });
  };

  const handleRoleChange = (index, value) => {
    const updatedMessages = [...currentDemo.messages];
    updatedMessages[index].role = value;
    setCurrentDemo({ ...currentDemo, messages: updatedMessages });
  };

  const handleContentChange = (index, value) => {
    const updatedMessages = [...currentDemo.messages];
    updatedMessages[index].content = value;
    setCurrentDemo({ ...currentDemo, messages: updatedMessages });
  };

  const handleAppearChange = (index, isChecked) => {
    const updatedMessages = [...currentDemo.messages];
    updatedMessages[index].appear = isChecked;
    setCurrentDemo({ ...currentDemo, messages: updatedMessages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentDemo.demoId || !currentDemo.name) {
      toast({
        title: 'Missing Fields',
        description: 'Please enter both Demo ID and Name.',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append('demoId', currentDemo.demoId);
    formData.append('name', currentDemo.name);
    formData.append('messages', JSON.stringify(currentDemo.messages));

    if (currentDemo.avatar) {
      formData.append('avatar', currentDemo.avatar);
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/demos/${currentDemo.demoId}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      const data = await response.json();

      toast({
        title: 'Demo Updated Successfully',
        description: data.message,
        status: 'success',
        isClosable: true,
      });

      setCurrentDemo({
        demoId: null,
        name: '',
        messages: [],
        avatarUrl: '',
      });
    } catch (error) {
      console.error('Error updating demo:', error);
      toast({
        title: 'Error Updating Demo',
        description: 'An error occurred. Please try again.',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '30px', border: '1px solid black' }}
    >
      <FormControl isRequired>
        <FormLabel htmlFor="demoId">Select Demo ID to Update</FormLabel>
        <Select
          id="demoId"
          value={currentDemo.demoId || ''}
          onChange={setDemoValue}
          placeholder="Select Demo ID"
        >
          {demos.map((demo) => (
            <option key={demo.demoId} value={demo.demoId}>
              {demo.demoId}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          name="name"
          value={currentDemo.name}
          onChange={handleInputChange}
          placeholder="Enter Demo Name"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel htmlFor="avatar">Avatar (Optional)</FormLabel>
        <Input
          type="file"
          id="avatar"
          onChange={handleFileChange}
          accept="image/*"
        />
      </FormControl>

      {currentDemo.messages.map((message, index) => (
        <Box key={index} mt={4} mb={2} borderWidth={1} borderRadius={4} p={2}>
          <Flex justifyContent="space-between">
            <Grid direction="row" spacing={2} w={'100%'}>
              <Flex w={'fit-content'} pb={5}>
                <FormLabel htmlFor={`role-${index}`}>Role</FormLabel>
                <Select
                  id={`role-${index}`}
                  value={message.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                >
                  <option value="system">System</option>
                  <option value="user">User</option>
                  <option value="assistant">Assistant</option>
                </Select>
                <Checkbox
                  pl={10}
                  w={'10%'}
                  isChecked={message.appear}
                  onChange={(e) => handleAppearChange(index, e.target.checked)}
                >
                  Appear
                </Checkbox>
              </Flex>

              <Textarea
                rows={10}
                w={'100%'}
                value={message.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                placeholder="Enter message content"
              />
            </Grid>
            <IconButton
              icon={<DeleteIcon />}
              onClick={(e) => DeleteMessage(index)}
            />
            {index === currentDemo.messages.length - 1 && (
              <IconButton icon={<AddIcon />} onClick={addMessage} />
            )}
          </Flex>
        </Box>
      ))}

      <Box mt={4}>
        <Button colorScheme="blue" type="submit" isLoading={isLoading} mr={2}>
          {isLoading ? 'Updating...' : 'Update Demo'}
        </Button>
        <DeleteButton currentDemo={currentDemo} />
      </Box>
    </form>
  );
};

export default UpdateDemoForm;
