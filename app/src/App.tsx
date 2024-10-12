import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './views/login-page';
import HomePage from './views/homepage';
import ProfilePage from './views/profile';
import SettingsPage from './views/host-game'; 
import HostGamePage from './views/host-game';
import Layout from './components/layout';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for authentication status on mount
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, password: string): boolean => {
    // Mock login
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // Store authentication status
      return true; 
    } else {
      alert('Invalid credentials!');
      return false; 
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear authentication status
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/HomePage" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/homepage" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
        path="/profile" 
        element={isAuthenticated ? <ProfilePage/> : <Navigate to="/login" />} 
/>
        <Route 
          path="/settings" 
          element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to="/login" />} />  {/* Fallback route */}

        <Route 
          path="/host-game" 
          element={isAuthenticated ? <HostGamePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
