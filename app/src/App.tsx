import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserModel } from './userModel';
import { closeConnection } from './components/socket-client';
import Loading from './views/loading';

import ProfileNavBar from './components/navbar';
const ProfilePage = React.lazy(() => import('./presenters/profile-presenter'));

var debug = require('debug')('app:app');

// const LoginPage = React.lazy(() => import('./views/login-page'));
const MockLoginPage = React.lazy(() => import('./views/mock-login'));
const HomePage = React.lazy(() => import('./presenters/homepage-presenter'));
const HostWaiting = React.lazy(() => import('./presenters/host-waiting-presenter'));
const HostGame = React.lazy(() => import('./presenters/host-game-presenter'));
const HostVote = React.lazy(() => import('./presenters/host-voting-presenter'));
const HostEnd = React.lazy(() => import('./presenters/host-end-presenter'));
const PlayerWaiting = React.lazy(() => import('./presenters/player-waiting-presenter'));
const PlayerGame = React.lazy(() => import('./presenters/player-game-presenter'));
const PlayerVote = React.lazy(() => import('./presenters/player-voting-presenter'));
const PlayerEnd = React.lazy(() => import('./presenters/player-end-presenter'));

// GitHub OAuth Callback Component
/* TODO: Add back
const GitHubCallback: React.FC = () => {
  
  return <div>Loading...</div>;
};
*/

interface AppProps {
  model: UserModel;
}

const App: React.FC<AppProps> = ({ model }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to true to bypass the login system

  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, []);

  const handleLogin = () => {
    debug("login");
    setIsAuthenticated(true);
  };


  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/homepage" /> : <MockLoginPage model={model} handleLogin={handleLogin}/>} 
          />
          <Route 
            path="/homepage" 
            element={isAuthenticated ? <HomePage model={model} /> : <Navigate to="/login" />} 
          />
          <Route
            path="/profile"
            element={<ProfilePage handleLogout={setIsAuthenticated} />} 
          />
          <Route path="/host">
            <Route 
              index 
              element={<HostWaiting model={model} />} 
            />
            <Route 
              path="ingame" 
              element={<HostGame model={model} />} 
            />
            <Route 
              path="voting" 
              element={<HostVote model={model} />} 
            />
            <Route 
              path="results" 
              element={<HostEnd model={model} />} 
            />
          </Route>
          <Route path="/player">
            <Route 
              index
              element={<PlayerWaiting model={model} />} 
            />
            <Route 
              path="ingame" 
              element={<PlayerGame model={model} />} 
            />
            <Route 
              path="voting" 
              element={<PlayerVote model={model} />} 
            />
            <Route 
              path="results" 
              element={<PlayerEnd model={model} />} 
            />
          </Route>
          <Route path="*" element={<Navigate to="/homepage" />} /> {/* Redirect all unknown routes to homepage */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
