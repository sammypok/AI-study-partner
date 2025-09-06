import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
            setIsActive(false);
            if (!isBreak) {
              setMinutes(5);
              setIsBreak(true);
              alert("🎉 Focus session complete! Take a 5-minute break.");
            } else {
              setMinutes(25);
              setIsBreak(false);
              alert("☕ Break over! Time to focus again.");
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isBreak ? 'Break Timer' : 'Focus Timer'}
      </h2>
      
      <div className="flex justify-center items-center mb-6">
        <span className="text-6xl font-mono text-gray-800">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            isActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        {isBreak ? '5-minute break' : '25-minute focus session'}
      </div>
    </div>
  );
};

export default PomodoroTimer;