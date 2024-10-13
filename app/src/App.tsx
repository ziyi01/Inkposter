import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserModel } from './userModel';
import { socket, closeConnection } from './components/socket-client';
import runTests from './server-requests-tests';
import Cookies from 'js-cookie';

// import presenters
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
const PlayerGame = React.lazy(() => import('./presenters/player-game-presenter-real'));
const PlayerVote = React.lazy(() => import('./presenters/player-voting-presenter'));
const PlayerEnd = React.lazy(() => import('./presenters/player-end-presenter'));
//const SettingsPage = React.lazy(() => import('./views/profile'));

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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/homepage" /> : <LoginPage />} 
          />
          <Route 
            path="/homepage" 
            element={isAuthenticated ? <HomePagePresenter model={model} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage handleLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route 
            path="/host-game" 
            element={isAuthenticated ? <HostWaiting model={model}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/host-ingame" 
            element={isAuthenticated ? <HostGame model={model}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/host-voting" 
            element={isAuthenticated ? <HostVote model={model}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/host-results" 
            element={isAuthenticated ? <HostEnd model={model}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/player-game" 
            element={isAuthenticated ? <PlayerWaiting model={model}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/player-ingame" 
            element={isAuthenticated ? <PlayerGame model={model}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/player-voting" 
            element={isAuthenticated ? <PlayerVote model={model}/> : <Navigate to="/login" />} 
          />
          <Route 
            path="/player-results" 
            element={isAuthenticated ? <PlayerEnd model={model}/> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Fallback route */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
