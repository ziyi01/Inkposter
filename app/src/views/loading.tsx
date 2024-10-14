import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate the progress bar filling up
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const nextProgress = oldProgress + 10;
        if (nextProgress >= 100) {
          clearInterval(interval);
        }
        return nextProgress;
      });
    }, 500); // Update every 500ms

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-lg font-semibold mb-4">Loading...</h1>
        
        {/* Progress Bar */}
        <div className="relative h-1 w-64 bg-gray-300 overflow-hidden rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;