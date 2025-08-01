"use client";
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, Coffee, Brain, Clock, Check, Target, Trophy } from 'lucide-react';

export default function PomodoroTimer() {
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('Work');
  const [intervalId, setIntervalId] = useState(null);
  const [sessions, setSessions] = useState(0);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoStart, setAutoStart] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  
  const [settings, setSettings] = useState({
    workTime: 1500, // 25 minutes
    shortBreak: 300, // 5 minutes
    longBreak: 900, // 15 minutes
    longBreakInterval: 4
  });

  const modes = {
    'Work': { 
      time: settings.workTime, 
      color: 'from-red-500 to-pink-500',
      bg: 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20',
      icon: Brain,
      message: 'Focus on your work!'
    },
    'Short Break': { 
      time: settings.shortBreak, 
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
      icon: Coffee,
      message: 'Take a short break!'
    },
    'Long Break': { 
      time: settings.longBreak, 
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      icon: Clock,
      message: 'Enjoy your long break!'
    }
  };

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIaAEOo6vOyYBgBPprb88N3IwYNfMj35o0+CRNauevenU0NDFGm4/O2YBoAQ6nq87NhFgE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhUHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0w');
  }, []);

  // Timer logic
  useEffect(() => {
    if (isActive && time > 0) {
      const id = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          const totalTime = modes[mode].time;
          setProgress(((totalTime - newTime) / totalTime) * 100);
          
          if (newTime <= 0) {
            clearInterval(id);
            handleSessionComplete();
            return 0;
          }
          return newTime;
        });
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    
    return () => clearInterval(intervalId);
  }, [isActive, time, mode]);

  // Handle session completion
  const handleSessionComplete = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    
    const completedSession = {
      mode,
      timestamp: new Date(),
      duration: modes[mode].time
    };
    
    setCompletedSessions(prev => [...prev, completedSession]);
    
    if (mode === 'Work') {
      setSessions(prev => prev + 1);
      const nextMode = (sessions + 1) % settings.longBreakInterval === 0 ? 'Long Break' : 'Short Break';
      handleModeChange(nextMode);
    } else {
      handleModeChange('Work');
    }
    
    if (autoStart) {
      setTimeout(() => setIsActive(true), 1000);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTime(modes[newMode].time);
    setProgress(0);
    if (intervalId) clearInterval(intervalId);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTime(modes[mode].time);
    setProgress(0);
    if (intervalId) clearInterval(intervalId);
  };

  const resetAll = () => {
    setIsActive(false);
    setSessions(0);
    setCompletedSessions([]);
    handleModeChange('Work');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    // Update current time if not active
    if (!isActive) {
      const currentModeTime = newSettings[mode.toLowerCase().replace(' ', '') + 'Time'] || 
                              newSettings[mode.toLowerCase().replace(' break', 'Break')] ||
                              modes[mode].time;
      setTime(currentModeTime);
    }
  };

  const currentMode = modes[mode];
  const IconComponent = currentMode.icon;

  return (
    <div className={`min-h-screen transition-all duration-1000 ${currentMode.bg} dark:bg-gray-900`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Pomodoro Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay focused and productive with the Pomodoro Technique
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{sessions}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Sessions</p>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <Check className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{completedSessions.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <Clock className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {Math.floor(completedSessions.reduce((acc, session) => acc + session.duration, 0) / 60)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Minutes</p>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {Math.floor(sessions / settings.longBreakInterval)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Cycles</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Mode Selection */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
              {Object.keys(modes).map((modeKey) => (
                <button
                  key={modeKey}
                  onClick={() => handleModeChange(modeKey)}
                  className={`px-6 py-3 mx-1 rounded-xl font-medium transition-all duration-300 ${
                    mode === modeKey
                      ? `bg-gradient-to-r ${modes[modeKey].color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {modeKey}
                </button>
              ))}
            </div>
          </div>

          {/* Main Timer */}
          <div className="text-center mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              {/* Mode Info */}
              <div className="flex items-center justify-center mb-6">
                <IconComponent className={`w-8 h-8 mr-3 bg-gradient-to-r ${currentMode.color} bg-clip-text text-transparent`} />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {currentMode.message}
                </h2>
              </div>

              {/* Circular Progress */}
              <div className="relative w-80 h-80 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className={`stop-color-red-500 ${currentMode.color.includes('red') ? 'stop-opacity-100' : 'stop-opacity-0'}`} />
                      <stop offset="0%" className={`stop-color-green-500 ${currentMode.color.includes('green') ? 'stop-opacity-100' : 'stop-opacity-0'}`} />
                      <stop offset="0%" className={`stop-color-blue-500 ${currentMode.color.includes('blue') ? 'stop-opacity-100' : 'stop-opacity-0'}`} />
                      <stop offset="100%" className={`stop-color-pink-500 ${currentMode.color.includes('pink') ? 'stop-opacity-100' : 'stop-opacity-0'}`} />
                      <stop offset="100%" className={`stop-color-emerald-500 ${currentMode.color.includes('emerald') ? 'stop-opacity-100' : 'stop-opacity-0'}`} />
                      <stop offset="100%" className={`stop-color-cyan-500 ${currentMode.color.includes('cyan') ? 'stop-opacity-100' : 'stop-opacity-0'}`} />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Timer Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-gray-800 dark:text-white mb-2 font-mono">
                      {formatTime(time)}
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-300">
                      {isActive ? (time <= 60 ? '⚡ Final minute!' : '🎯 Stay focused') : '⏱️ Ready to start'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={toggleTimer}
                  className={`px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 bg-gradient-to-r ${currentMode.color}`}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-5 h-5 inline mr-2" />
                      PAUSE
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 inline mr-2" />
                      START
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetTimer}
                  className="px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  RESET
                </button>
              </div>

              {/* Additional Controls */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl transition-colors duration-200"
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Settings
                </button>
                
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl transition-colors duration-200"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={resetAll}
                  className="px-4 py-2 bg-red-200 dark:bg-red-900 hover:bg-red-300 dark:hover:bg-red-800 text-red-800 dark:text-red-200 rounded-xl transition-colors duration-200"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Work Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.workTime / 60}
                    onChange={(e) => updateSettings({...settings, workTime: parseInt(e.target.value) * 60})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Short Break (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.shortBreak / 60}
                    onChange={(e) => updateSettings({...settings, shortBreak: parseInt(e.target.value) * 60})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Long Break (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.longBreak / 60}
                    onChange={(e) => updateSettings({...settings, longBreak: parseInt(e.target.value) * 60})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Long Break Interval
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={settings.longBreakInterval}
                    onChange={(e) => updateSettings({...settings, longBreakInterval: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoStart"
                  checked={autoStart}
                  onChange={(e) => setAutoStart(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="autoStart" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto-start next session
                </label>
              </div>
            </div>
          )}

          {/* Recent Sessions */}
          {completedSessions.length > 0 && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Sessions</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {completedSessions.slice(-5).reverse().map((session, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 bg-gradient-to-r ${modes[session.mode].color}`}></div>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{session.mode}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {formatTime(session.duration)} • {session.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}