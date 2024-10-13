import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import LoginPage from './views/login-page';
import HomePage from './views/homepage';
import ProfilePage from './views/profile';
import HostGamePage from './views/host-game';

// GitHub OAuth Callback Component
const GitHubCallback: React.FC = () => {
  useEffect(() => {
    const handleGitHubResponse = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        const response = await fetch('YOUR_BACKEND_URL/oauth/github', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (response.ok) {
          const data = await response.json();
          Cookies.set('uniqueId', data.uniqueId, { expires: 7 }); // Store unique ID in a cookie for 7 days
          window.location.href = '/homepage'; // Redirect to homepage
        } else {
          console.error('GitHub login failed');
          // Handle login failure HERE
        }
      }
    };

    handleGitHubResponse();
  }, []);

  return <div>Loading...</div>;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the unique ID cookie exists on page load
  useEffect(() => {
    const uniqueId = Cookies.get('uniqueId');
    if (uniqueId) {
      setIsAuthenticated(true); // User is authenticated if unique ID exists
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('uniqueId'); // Clear cookie on logout
    setIsAuthenticated(false);
    console.log('User has logged out');
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/homepage" /> : <LoginPage />}
        />
        <Route
          path="/homepage"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/HomePage" />}
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
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
