import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './views/login-page';
import HomePage from './views/homepage';
import ProfilePage from './views/profile';
import HostGamePage from './views/host-game';

// Create a new callback component to handle GitHub redirect
const GitHubCallback: React.FC = () => {
  useEffect(() => {
    const handleGitHubResponse = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        // Replace this URL with your backend endpoint for handling GitHub OAuth
        const response = await fetch('YOUR_BACKEND_URL/oauth/github', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming the backend returns a unique identifier
          localStorage.setItem('isAuthenticated', 'true'); // Update your authentication status
          localStorage.setItem('uniqueId', data.uniqueId); // Store unique ID if returned
          window.location.href = '/homepage'; // Redirect to homepage
        } else {
          console.error('Error during GitHub login');
          // Handle error appropriately, e.g., show a message
        }
      }
    };

    handleGitHubResponse();
  }, []);

  return <div>Loading...</div>; // Display a loading state
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear authentication status
    localStorage.removeItem('uniqueId'); // Clear unique ID if needed
    console.log("user has logged out")

  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/homepage" /> : <LoginPage />} 
        />
        <Route 
          path="/homepage" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <ProfilePage handleLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/host-game" 
          element={isAuthenticated ? <HostGamePage /> : <Navigate to="/login" />} 
        />
        <Route path="/auth/github/callback" element={<GitHubCallback />} />
        <Route path="*" element={<Navigate to="/login" />} />  {/* Fallback route */}
      </Routes>
    </Router>
  );
};

export default App;
