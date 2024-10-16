import React, { useState } from 'react';
import { UserModel } from '../userModel';

interface LoginPageProps {
    model: UserModel;
    handleLogin: () => void;
}

const MockLoginPage: React.FC<LoginPageProps> = ({ model, handleLogin }) => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      model.mockLogin(userId, username);
      handleLogin();
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Mock Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 border border-gray-300 rounded w-full text-black bg-gray-100"
              value={username}
              placeholder="Enter a username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">UserID:</label>
            <input
              type="text"
              id="userID"
              className="mt-1 p-2 border border-gray-300 rounded w-full text-black bg-gray-100"
              value={userId}
              placeholder="Enter a unique userID"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default MockLoginPage;