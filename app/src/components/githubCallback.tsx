import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const GitHubCallback: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const handleLogin = async () => {
        try {
          const response = await fetch('/api/github/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
            
          });

          if (!response.ok) {
            throw new Error('Login failed');
          }


          const data = await response.json();
          //const uniqueId = await loginUserDB(userId);
          //const cookies = new Cookies(req, res); 
          //cookies.set('userId', uniqueId); 
          //cookies.set('isAuthenticated', 'true');
          console.log('User ID:', data.userId);

          // Store userId in a cookie if needed
          Cookies.set('userId', data.userId, { expires: 7 });

          // Redirect to homepage or dashboard

        } catch (error) {
          console.error('Login error:', error+code);
          setErrorMessage('Login failed. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      handleLogin();

    } else {
      setErrorMessage('No authorization code found in the URL.');
      navigate('/login');
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="error-message-container flex items-center justify-center min-h-screen">
      {errorMessage ? (
        <div className="bg-white text-red-700 p-4 rounded shadow-md">
          <p>{errorMessage}</p>
          <button onClick={() => navigate('/login')} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Go to Login
          </button>
        </div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
};

export default GitHubCallback;
