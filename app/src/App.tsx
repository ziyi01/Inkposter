import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './views/homepage';
import LoginPage from './views/login-page';
import HostGame from './views/host-game';
import HostVoting from './views/host-voting';
import HostWaiting from './views/host-waiting';
import Loading from './views/loading';
import PlayerGame from './views/player-game';
import PlayerSessionEnd from './views/player-session-end';
import PlayerVoting from './views/player-voting';
import PlayerWaiting from './views/player-waiting';



const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (username: string, password: string) => {
    // For simplicity, we mock the login process
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <HomePage />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
