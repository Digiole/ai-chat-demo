import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Select,
  Checkbox,
  Textarea,
  Box,
  IconButton,
  Flex,
  Grid,
} from '@chakra-ui/react';
import Update from './AdminComponents/Update';
import { AddIcon } from '@chakra-ui/icons';

const Admin = () => {
  const [demoId, setDemoId] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: '', content: '', appear: false },
  ]); // Array to store message objects
  const toast = useToast();

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const addMessage = () => {
    setMessages([...messages, { role: '', content: '', appear: false }]);
  };

  const handleRoleChange = (index, value) => {
    const updatedMessages = [...messages];
    updatedMessages[index].role = value;
    setMessages(updatedMessages);
  };

  const handleContentChange = (index, value) => {
    const updatedMessages = [...messages];
    updatedMessages[index].content = value;
    setMessages(updatedMessages);
  };

  const handleAppearChange = (index, isChecked) => {
    const updatedMessages = [...messages];
    updatedMessages[index].appear = isChecked;
    setMessages(updatedMessages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!demoId || !name) {
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
    formData.append('demoId', demoId);
    formData.append('name', name);
    formData.append('messages', JSON.stringify(messages)); // Convert messages to JSON string

    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await fetch('http://localhost:5000/demos', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      toast({
        title: 'Demo Created Successfully',
        description: data.message,
        status: 'success',
        isClosable: true,
      });

      // Clear form fields after successful submission
      setDemoId('');
      setName('');
      setAvatar(null);
      setMessages([{ role: '', content: '', appear: false }]);
    } catch (error) {
      console.error('Error creating demo:', error);
      toast({
        title: 'Error Creating Demo',
        description: 'An error occurred. Please try again.',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [action, setAction] = useState('add');
  const handleActionChange = (e) => {
    setAction(e.target.value);
  };
  return (
    <Box p={10}>
      <Box>
        <label htmlFor="action">
          Select Action:
          <Select id="action" value={action} onChange={handleActionChange}>
            <option value="add">Add</option>

            <option value="update">Update & Delete</option>
          </Select>
        </label>
      </Box>

      {action === 'add' ? (
        <form
          onSubmit={handleSubmit}
          style={{ padding: '30px', border: '1px solid gray' }}
        >
          <FormControl isRequired>
            <FormLabel htmlFor="demoId">Demo ID</FormLabel>
            <Input
              id="demoId"
              value={demoId}
              onChange={(e) => setDemoId(e.target.value)}
              placeholder="Enter Demo ID"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Demo Name"
            />
          </FormControl>

          {/* Message Cells */}
          {messages.map((message, index) => (
            <Box
              key={index}
              mt={4}
              mb={2}
              borderWidth={1}
              borderRadius={4}
              p={2}
            >
              <Grid>
                <Flex w={'fit-content'} pb={5}>
                  <FormLabel htmlFor={`role-${index}`}>Role</FormLabel>
                  <Select
                    w={'100%'}
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
                    isChecked={message.appear}
                    onChange={(e) =>
                      handleAppearChange(index, e.target.checked)
                    }
                  >
                    Appear
                  </Checkbox>
                </Flex>
                <Textarea
                  value={message.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder="Enter message content"
                />

                {index === messages.length - 1 && ( // Render plus button only for the last message cell
                  <IconButton icon={<AddIcon />} onClick={addMessage} />
                )}
              </Grid>
            </Box>
          ))}

          <FormControl mt={4}>
            <FormLabel htmlFor="avatar">Avatar (Optional)</FormLabel>
            <Input
              type="file"
              id="avatar"
              onChange={handleFileChange}
              accept="image/*"
            />
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit" isLoading={isLoading}>
            {isLoading ? 'Submitting...' : 'Create Demo'}
          </Button>
        </form>
      ) : action === 'update' ? (
        <Update />
      ) : (
        ''
      )}
    </Box>
  );
};

export default Admin;
