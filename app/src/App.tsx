import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import presenters
import LoginPage from './views/login-page';
import HomePage from './views/homepage';
import ProfilePage from './views/profile';
import SettingsPage from './views/host-game'; 
import HostWaiting from './presenters/host-waiting-presenter';
import HostGame from './presenters/host-game-presenter';
import HostVote from './presenters/host-voting-presenter';
import HostEnd from './presenters/host-end-presenter';
import PlayerWaiting from './presenters/player-waiting-presenter';
import PlayerGame from './presenters/player-game-presenter';
import PlayerVote from './presenters/player-voting-presenter';
import PlayerEnd from './presenters/player-end-presenter';

import { UserModel } from './userModel';
import { socket, closeConnection } from './components/socket-client';

interface AppProps {
  model: UserModel;
}

const App: React.FC<AppProps> = ({model}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      closeConnection();
    }
  }, []);

  const handleLogin = (username: string, password: string): boolean => {
    // Mock login
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      return true; 
    } else {
      alert('Invalid credentials!');
      return false; 
    }
  };
  
  // TODO: Pass model to components and link to presenters
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/homepage" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/homepage" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} 
        />
        <Route path="/host-game" element={isAuthenticated ? <HostWaiting model={model}/> : <Navigate to="/login" />}
        />
        <Route path="/host-ingame" element={isAuthenticated ? <HostGame model={model}/> : <Navigate to="/login" />}
        />
        <Route path="/host-voting" element={isAuthenticated ? <HostVote model={model}/> : <Navigate to="/login" />}
        />
        <Route path="/host-results" element={isAuthenticated ? <HostEnd model={model}/> : <Navigate to="/login" />}
        />
        
        <Route path="/player-game" element={isAuthenticated ? <PlayerWaiting model={model}/> : <Navigate to="/login" />}
        />
        <Route path="/player-ingame" element={isAuthenticated ? <PlayerGame model={model}/> : <Navigate to="/login" />}
        />
        <Route path="/player-voting" element={isAuthenticated ? <PlayerVote model={model}/> : <Navigate to="/login" />}
        />
        <Route path="/player-results" element={isAuthenticated ? <PlayerEnd model={model}/> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} /> {/* Fallback route */}

      </Routes>
    </Router>
  );
};

export default App;
