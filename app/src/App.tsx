import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserModel } from './userModel';
import { socket, closeConnection } from './components/socket-client';
import Loading from './views/loading';
import HomePagePresenter from './presenters/homepage-presenter';
const LoginPage = React.lazy(() => import('./views/login-page'));
const HomePage = React.lazy(() => import('./views/homepage'));
const ProfilePage = React.lazy(() => import('./views/profile'));
const HostWaiting = React.lazy(() => import('./presenters/host-waiting-presenter'));
const HostGame = React.lazy(() => import('./presenters/host-game-presenter'));
const HostVote = React.lazy(() => import('./presenters/host-voting-presenter'));
const HostEnd = React.lazy(() => import('./presenters/host-end-presenter'));
const PlayerWaiting = React.lazy(() => import('./presenters/player-waiting-presenter'));
const PlayerGame = React.lazy(() => import('./presenters/player-game-presenter'));
const PlayerVote = React.lazy(() => import('./presenters/player-voting-presenter'));
const PlayerEnd = React.lazy(() => import('./presenters/player-end-presenter'));

// GitHub OAuth Callback Component
const GitHubCallback: React.FC = () => {
  
  return <div>Loading...</div>;
};

interface AppProps {
  model: UserModel;
}

const App: React.FC<AppProps> = ({ model }) => {
  const isAuthenticated = true; // Set to true to bypass the login system

  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, []);

  const handleLogout = () => {
    console.log('User has logged out');
  };

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/homepage" /> : <LoginPage />} 
          />
          <Route 
            path="/homepage" 
            element={<HomePagePresenter model={model} />} 
          />
          <Route
            path="/profile"
            element={<ProfilePage handleLogout={handleLogout} />} 
          />
          <Route path="/host">
            <Route 
              path="game" 
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
              path="game" 
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
