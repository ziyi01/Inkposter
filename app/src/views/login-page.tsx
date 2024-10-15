import React from 'react';

interface LoginPageViewProps {
  onGithubLogin: () => void;
  message: string | null;
}

const LoginPageView: React.FC<LoginPageViewProps> = ({ onGithubLogin, message }) => {
  return (
    <div className="flex items-center justify-center bg-blue-300 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Login with GitHub</h2>
        <button 
          onClick={onGithubLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login with GitHub
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPageView;
