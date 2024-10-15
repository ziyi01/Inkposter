import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GitHubCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const fetchAccessToken = async () => {
        try {
          const response = await axios.post('http://your-backend-url/auth/github', { code });
          console.log('Response from backend:', response.data); // Log the response for debugging

          if (response.data && response.data.uniqueId) {
            const { uniqueId } = response.data; // Get the unique identifier from the response
            localStorage.setItem('userId', uniqueId);
            localStorage.setItem('isAuthenticated', 'true'); // Mark the user as authenticated

            // Redirect to the homepage after successful authentication
            navigate('/homepage');
          } else {
            console.error('Invalid response data:', response.data);
          }
        } catch (error) {
          console.error('Error during GitHub OAuth process:', error);
          navigate('/login');
        }
      };

      fetchAccessToken();
      
    } else {
      console.error('No code found in URL');
      // Optionally redirect to the login page or show an error message
      navigate('/login');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GitHubCallback;
