import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';

const DeleteButton = ({ currentDemo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/demos/${currentDemo.demoId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete demo');
      }

      const data = await response.json();
      toast({
        title: 'Demo Deleted',
        description: data.message,
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting demo:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete demo',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      colorScheme="red"
      isLoading={isLoading}
      loadingText="Deleting..."
      onClick={handleDelete}
    >
      Delete Demo
    </Button>
  );
};

export default DeleteButton;
