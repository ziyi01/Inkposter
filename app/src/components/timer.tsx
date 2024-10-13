import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number;          // The initial countdown time
  onTimerEnd: () => void;       // Function to call when the timer reaches 0
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  // Helper function to format time as MM:SS
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerInterval);
          onTimerEnd();
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [onTimerEnd]);

  return (
    <div>
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
