import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../userModel';

interface LoginPageProps {
    model: UserModel;
    user: string;
}

const MockLoginPage: React.FC<LoginPageProps> = ({ model, user }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    if (user !== "0") {
        model.login(user, "User" + user);
        navigate('/homepage'); 
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        model.login(password, username);
        navigate('/homepage'); 
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
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
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 rounded w-full text-black bg-gray-100"
              value={password}
              placeholder="Enter a userID"
              onChange={(e) => setPassword(e.target.value)}
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