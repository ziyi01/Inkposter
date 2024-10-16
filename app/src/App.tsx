import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import { UserModel } from './userModel';
import { closeConnection } from './components/socket-client';
import Loading from './views/loading';
import Cookies from 'js-cookie'; 
import GitHubCallback from './components/githubCallback';

var debug = require('debug')('app:app');

const LoginPage = React.lazy(() => import('./presenters/login-presenter'));
const HomePage = React.lazy(() => import('./presenters/homepage-presenter'));
const ProfilePage = React.lazy(() => import('./presenters/profile-presenter'));
const HostWaiting = React.lazy(() => import('./presenters/host-waiting-presenter'));
const HostGame = React.lazy(() => import('./presenters/host-game-presenter'));
const HostVote = React.lazy(() => import('./presenters/host-voting-presenter'));
const HostEnd = React.lazy(() => import('./presenters/host-end-presenter'));
const PlayerWaiting = React.lazy(() => import('./presenters/player-waiting-presenter'));
const PlayerGame = React.lazy(() => import('./presenters/player-game-presenter'));
const PlayerVote = React.lazy(() => import('./presenters/player-voting-presenter'));
const PlayerEnd = React.lazy(() => import('./presenters/player-end-presenter'));

// Protected route: Redirects to login if user is not authenticated
const ProtectedRoute = () => {
  const isAuthenticated = Cookies.get('isAuthenticated') === 'true'; // check auth status

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

};

interface AppProps {
  model: UserModel;
}

const App: React.FC<AppProps> = ({ model }) => {

  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, []);

  const handleLogout = () => {
    console.log('User has logged out');
    Cookies.remove('isAuthenticated'); // clear the auth cookie
    Cookies.remove('userId'); // Clear the user ID cookie
    window.location.reload();
  };

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Login route first*/}
          <Route 
            path="/login" 
            element={
              Cookies.get('isAuthenticated') === 'true' 
                ? <Navigate to="/homepage" /> 
                : <LoginPage />
            } 
          />
          {/*Githug authorization url, defined in file, CHECK BEFORE DEPLOYMENT*/ }
          <Route path="/auth/github/callback" element={<GitHubCallback model={model} />} 
          />

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/homepage" element={<HomePage model={model} />} 
            />
            <Route path="/profile" element={<ProfilePage handleLogout={handleLogout} model={model} />} 
            />
            <Route path="/host/game" element={<HostWaiting model={model} />} 
            />
            <Route path="/host/ingame" element={<HostGame model={model} />} 
            />
            <Route path="/host/voting" element={<HostVote model={model} />} 
            />
            <Route path="/host/results" element={<HostEnd model={model} />} 
            />
            <Route path="/player/game" element={<PlayerWaiting model={model} />} 
            />
            <Route path="/player/ingame" element={<PlayerGame model={model} />} 
            />
            <Route path="/player/voting" element={<PlayerVote model={model} />} 
            />
            <Route path="/player/results" element={<PlayerEnd model={model} />} 
            />
          </Route>

          {/* redirect unknown routes to homepage */}
          <Route path="*" element={<Navigate to="/homepage" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
