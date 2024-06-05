import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Button, Flex, Grid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <Flex
      className={`sidebar ${!isOpen ? 'translateX-hidden' : ''}`}
      transition="transform 0.3s ease-in-out"
      transform={isOpen ? 'translateX(0)' : 'translateX(-160px)'}
      position="fixed"
      top="0"
      left="0"
      bottom="0"
      width="210px"
      zIndex={9999999}
      bg={'transparent'}
    >
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
          <Link className="btn-hover" to="/demo111">
            demo
          </Link>
        </VStack>

        <Text textAlign={'center'}>
          Made by
          <a href="https://www.digiole.com" target="_blank" rel="noreferrer">
            Digiole
          </a>
        </Text>
      </Grid>
      <Button
        position={isOpen ? 'fixed' : ' '}
        top={0}
        right={-14}
        ml={6}
        mt={8}
        zIndex={9999}
        variant="link"
        colorScheme="blackAlpha"
        onClick={() => toggleSidebar(!isOpen)}
      >
        {isOpen ? <CloseIcon boxSize={8} /> : <HamburgerIcon boxSize={7} />}
      </Button>
    </Flex>
  );
}

export default Sidebar;
