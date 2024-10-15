import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUserDB } from '../server-requests';
import Cookies from 'js-cookie';
import { UserModel } from '../userModel';
import { FaCode } from 'react-icons/fa';

const GitHubCallback: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // Track loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Store error messages

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code)

    if (code) {
      const handleLogin = async () => {
        try {
          // Send the code to backend, receive userID
          const uniqueId = await loginUserDB(code);
          console.log(uniqueId); // TA BORT INNAN DEPLOY

          // Store the userId in a cookie for persistence
          Cookies.set('userId', uniqueId, { expires: 7 }); // Expires in 7 days
          Cookies.set('isAuthenticated', 'true', { expires: 7 });

          // Redirect to homepage
          navigate('/homepage'); 

        } catch (error: any) {
          console.error('Login failed:', error);

          // Handle errors with coresponding messages
          if (error.cause === 500) {
            setErrorMessage('Server error occurred. Please try again later.');
          } else if (error.cause === 400) {
            setErrorMessage('Invalid request. Please try again.');
          } else {
            setErrorMessage('Something went wrong. Please try again.');
          }

          navigate('/login'); // Redirect to login on failure
        } finally {
          setLoading(false); // End loading state
        }
      };

      handleLogin();
    } else {
      // If no code is found -> show error and redirect to login
      setErrorMessage('No authorization code found in the URL.');
      console.error('No code found in URL');
      navigate('/login');
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
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
