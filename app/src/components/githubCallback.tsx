import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const GitHubCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('/api/github/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(async response => {
          console.log("Response status:", response.status);
          console.log("Response headers:", response.headers);
          
          const text = await response.text();
          console.log("Response text:", text);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          try {
            return JSON.parse(text);
          } catch (e) {
            console.error("Failed to parse JSON:", e);
            throw new Error("Invalid JSON response from server");
          }
        })
        .then(data => {
          if (data.uniqueId && data.access_token) {
            Cookies.set('uniqueId', data.uniqueId, { expires: 7 });
            Cookies.set('accessToken', data.access_token, { expires: 7 });
            Cookies.set('isAuthenticated', 'true', { expires: 7 });
            navigate('/homepage');
          } else {
            throw new Error('Invalid response data');
          }
        })
        .catch(err => {
          console.error('Authentication error:', err);
          setError('Failed to authenticate with GitHub. Please try again.');
        });
    } else {
      setError('No code found in URL');
    }
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Authenticating...</div>;
};

export default GitHubCallback;