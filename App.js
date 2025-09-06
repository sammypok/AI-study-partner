import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route 
          path="/dashboard" 
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;