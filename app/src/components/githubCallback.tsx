import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GitHubCallback: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // Track loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Store error messages

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const fetchAccessToken = async () => {
        try {
          const response = await axios.post('http://your-backend-url/auth/github', { code });

          if (response.status === 200 && response.data?.uniqueId) {
            const { uniqueId } = response.data; 
            localStorage.setItem('userId', uniqueId); //BYT UT TILL MODELLEN
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/homepage'); // Redirect on success

          } else {
            setErrorMessage('Authentication failed: Invalid response from the server.'); // Handle unexpected response structure or missing uniqueId
            console.error('Invalid response data:', response.data);
          }
        } catch (error: any) {
          
          if (error.response) {// Detect network or server errors
            console.error('Backend error:', error.response.data);
            setErrorMessage(`Error: ${error.response.data.message || 'Server error occurred.'}`);

          } else if (error.request) {
            console.error('No response received:', error.request);
            setErrorMessage('Error: No response from the server. Please try again.');

          } else {
            console.error('Request error:', error.message);
            setErrorMessage('Error: Something went wrong. Please try again.');
          }

          navigate('/login'); // Redirect to login on failure

        } finally {
          setLoading(false); // End loading state
        }
      };

      fetchAccessToken();
    } else {
      setErrorMessage('No authorization code found in the URL.'); // If no code is found, show error and redirect to login
      console.error('No code found in URL');
      navigate('/login');
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state. Change to fully white or something else? 
  }

  return (
    <div className="error-message-container flex items-center justify-center min-h-screen">
      {errorMessage ? (
        <div className="bg-white text-red-700 p-4 rounded shadow-md">
          <p>{errorMessage}</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
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
