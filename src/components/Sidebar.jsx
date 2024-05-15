import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Button, Flex, Grid, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setisOpen] = useState(false);

  return (
    <Flex className={`sidebar ${!isOpen ? 'translateX-hidden' : ''}`}>
      <Button
        mr={6}
        mt={8}
        variant="link"
        colorScheme="blackAlpha"
        onClick={() => setisOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon boxSize={8} /> : <HamburgerIcon boxSize={7} />}
      </Button>
      <Grid
        templateRows="1fr  auto"
        className="bg-secondary"
        width={'100%'}
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        height={'100vh'}
        p={4}
      >
        <VStack m={0}>
          <Link className="btn-hover" to="/about">
            About Us
          </Link>
          <Link className="btn-hover" to="/contact">
            Contact Us
          </Link>
          <Link className="btn-hover" to="/contact">
            Disclaimer{' '}
          </Link>
          <Link className="btn-hover" to="/contact">
            Terms of Use
          </Link>
          <Link className="btn-hover" to="/contact">
            Privacy Policy
          </Link>
        </VStack>

        <Text textAlign={'center'}>
          Made by
          <a href="https://www.digiole.com" target="_blank" rel="noreferrer">
            Digiole
          </a>
        </Text>
      </Grid>
    </Flex>
  );
}

export default Sidebar;
