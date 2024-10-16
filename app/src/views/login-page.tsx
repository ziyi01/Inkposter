import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGithubLogin = () => {
    const clientId = 'Ov23liBylLWgQxX2zv8L'; // Connected to Oliver's Github account
    const redirectUri = 'http://localhost:3000/auth/github/callback'; // Connected to Oliver's Github account
    const scope = 'user:email';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <div className="flex items-center justify-center bg-blue-300 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-500">INKPOSTER</h1>
        <p className="text-xl font-bold mb-4 text-center text-blue-500">Log in below to play!</p>
        <h2 className="text-xl font-semibold mb-4 text-center">Login with GitHub</h2>
        <button 
          onClick={handleGithubLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login with GitHub
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
