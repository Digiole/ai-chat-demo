import MainScreen from './components/MainScreen';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Admin from './container/Admin';
import Sidebar from './components/Sidebar';

import { Box } from '@chakra-ui/react';
import Root from './components/Root';

function App() {
  return (
    <Box position={'relative'} className={'bg-primary'}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route path="/:convId" element={<MainScreen />} />
      </Routes>
    </Box>
  );
}

export default App;
