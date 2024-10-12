import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserModel } from './userModel';
import { socket, closeConnection } from './components/socket-client';
import runTests from './server-requests-tests';

// import presenters
import Loading from './views/loading';
const LoginPage = React.lazy(() => import('./views/login-page'));
const HomePage = React.lazy(() => import('./views/homepage'));
const ProfilePage = React.lazy(() => import('./views/profile'));
const SettingsPage = React.lazy(() => import('./views/profile'));
const HostWaiting = React.lazy(() => import('./presenters/host-waiting-presenter'));
const HostGame = React.lazy(() => import('./presenters/host-game-presenter'));
const HostVote = React.lazy(() => import('./presenters/host-voting-presenter'));
const HostEnd = React.lazy(() => import('./presenters/host-end-presenter'));
const PlayerWaiting = React.lazy(() => import('./presenters/player-waiting-presenter'));
const PlayerGame = React.lazy(() => import('./presenters/player-game-presenter-real'));
const PlayerVote = React.lazy(() => import('./presenters/player-voting-presenter'));
const PlayerEnd = React.lazy(() => import('./presenters/player-end-presenter'));

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
  
  return (
    <Router>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </Router>
  );
};

export default App;
