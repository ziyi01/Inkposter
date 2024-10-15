import React, { useState } from 'react';
import Cookies from 'js-cookie';
import LoginPageView from '../views/login-page';

const LoginPagePresenter: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleGithubLogin = () => {
    Cookies.set("Testing", "TESTING")
    const clientId = 'Ov23liBylLWgQxX2zv8L'; 
    const redirectUri = 'http://localhost:3000/auth/github/callback';
    const scope = 'user:email';

    try {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    } catch (error) {
      setMessage('Failed to initiate GitHub login.');
    }
  };

  return (
    <LoginPageView onGithubLogin={handleGithubLogin} message={message} />
  );
};

export default LoginPagePresenter;
