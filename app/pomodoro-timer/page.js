"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [time, setTime] = useState(1500); 
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('Work');
  const [intervalId, setIntervalId] = useState(null);

  const settings = {
    workTime: 1500,
    shortBreak: 300,
    longBreak: 900
  };

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(id);
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isActive]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'Work') setTime(settings.workTime);
    if (newMode === 'Short Break') setTime(settings.shortBreak);
    if (newMode === 'Long Break') setTime(settings.longBreak);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    handleModeChange(mode);
  };

  const updateDisplay = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="flex mb-4">
        <button 
          onClick={() => handleModeChange('Work')} 
          className={`px-4 py-2 mx-1 text-lg ${mode === 'Work' ? 'text-red-600' : 'text-white'}`}
        >
          Work
        </button>
        <button 
          onClick={() => handleModeChange('Short Break')} 
          className={`px-4 py-2 mx-1 text-lg ${mode === 'Short Break' ? 'text-red-600' : 'text-white'}`}
        >
          Short Break
        </button>
        <button 
          onClick={() => handleModeChange('Long Break')} 
          className={`px-4 py-2 mx-1 text-lg ${mode === 'Long Break' ? 'text-red-600' : 'text-white'}`}
        >
          Long Break
        </button>
      </div>
      <div className="mb-4 text-lg">{mode === 'Work' ? 'Focus on your work!' : mode === 'Short Break' ? 'Time for a short break!' : 'Enjoy your long break!'}</div>
      <div className="relative flex items-center justify-center w-64 h-64 border-8 border-gray-500 rounded-full mb-4">
        <div className="text-3xl">{updateDisplay()}</div>
      </div>
      <button 
        onClick={toggleTimer} 
        className="px-4 py-2 bg-red-600 text-white rounded mb-4"
      >
        {isActive ? 'STOP' : 'START'}
      </button>
      <button 
        onClick={resetTimer} 
        className="px-4 py-2 bg-gray-600 text-white rounded"
      >
        RESET
      </button>
    </div>
  );
}
