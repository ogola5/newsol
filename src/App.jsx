//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/common/Navbar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing page as the root */}
        {/* <Route path="/home" element={<Home />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;