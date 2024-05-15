import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const DeleteMessageButton = ({ onDelete }) => {
  return (
    <IconButton
      icon={<DeleteIcon />}
      colorScheme="red"
      onClick={onDelete}
      aria-label="Delete message"
    />
  );
};

export default DeleteMessageButton;
