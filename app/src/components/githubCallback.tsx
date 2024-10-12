import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const GitHubCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // Send the code to your existing backend to get the unique identifier
          const response = await axios.post('http://your-backend-url/auth/github', { code });
          const { uniqueId } = response.data; // Get the unique identifier from the response

          // Store or use the uniqueId as needed (e.g., save in localStorage)
          localStorage.setItem('userId', uniqueId);
          localStorage.setItem('isAuthenticated', 'true')

          // Redirect to the homepage or another page
          navigate('/homepage');
        } catch (error) {
          console.error('Error during GitHub OAuth process:', error);
        }
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GitHubCallback;
