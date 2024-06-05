import MainScreen from './components/MainScreen';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Admin from './container/Admin';
import Sidebar from './components/Sidebar';

import { Box, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import Root from './components/Root';
import { useState } from 'react';

function App() {
  const [isOpen, setisOpen] = useState(false);
  const toggleSidebar = () => setisOpen(!isOpen);

  const templateColumns = useBreakpointValue({
    base: '1fr', // For small screens
    md: isOpen ? '210px 3fr' : '0px 1fr', // For medium screens and up
  });

  return (
    <SimpleGrid
      columns={2}
      templateColumns={templateColumns}
      height="100vh"
      className="bg-primary"
      overflowX={{ base: 'scroll', md: 'hidden' }}
    >
      <Box>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </Box>
      <Box span>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route path="/:convId" element={<MainScreen />} />
        </Routes>
      </Box>
    </SimpleGrid>
  );
}

export default App;
