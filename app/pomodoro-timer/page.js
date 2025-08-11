"use client";
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, Coffee, Brain, Clock, Check, Target, Trophy, X } from 'lucide-react';

export default function CompactPomodoroTimer() {
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
    workTime: 1500,
    shortBreak: 300,
    longBreak: 900,
    longBreakInterval: 4
  });

  const modes = {
    'Work': { 
      time: settings.workTime, 
      color: 'from-red-500 to-pink-500',
      bg: 'bg-red-50 dark:bg-red-950/20',
      icon: Brain
    },
    'Short Break': { 
      time: settings.shortBreak, 
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50 dark:bg-green-950/20',
      icon: Coffee
    },
    'Long Break': { 
      time: settings.longBreak, 
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      icon: Clock
    }
  };

  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIaAEOo6vOyYBgBPprb88N3IwYNfMj35o0+CRNauevenU0NDFGm4/O2YBoAQ6nq87NhFgE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhUHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0w');
  }, []);

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
    <div className={`min-h-screen p-4 transition-all duration-500 ${currentMode.bg} dark:bg-gray-900 `}>
      <div className="max-w-4xl mx-auto mt-24">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">Pomodoro Timer</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Stay focused with the Pomodoro Technique</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Timer Column */}
          <div className="lg:col-span-2">
            {/* Mode Selection */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-3 shadow-lg mb-4">
              <div className="flex gap-2">
                {Object.keys(modes).map((modeKey) => (
                  <button
                    key={modeKey}
                    onClick={() => handleModeChange(modeKey)}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                      mode === modeKey
                        ? `bg-gradient-to-r ${modes[modeKey].color} text-white shadow-md`
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {modeKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Display */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-6 shadow-lg mb-4">
              <div className="flex items-center justify-center mb-4">
                <IconComponent className={`w-6 h-6 mr-2 bg-gradient-to-r ${currentMode.color} bg-clip-text text-transparent`} />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{mode}</h2>
              </div>

              {/* Circular Progress */}
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={currentMode.color.includes('red') ? '#ef4444' : currentMode.color.includes('green') ? '#10b981' : '#3b82f6'} />
                      <stop offset="100%" stopColor={currentMode.color.includes('pink') ? '#ec4899' : currentMode.color.includes('emerald') ? '#059669' : '#06b6d4'} />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white mb-1 font-mono">
                      {formatTime(time)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {isActive ? (time <= 60 ? 'Final minute!' : 'Stay focused') : 'Ready'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={toggleTimer}
                  className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r ${currentMode.color}`}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={resetTimer}
                  className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl transition-colors duration-200"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl transition-colors duration-200"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats & Settings Sidebar */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Target className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                  <p className="text-xl font-bold text-gray-800 dark:text-white">{sessions}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Sessions</p>
                </div>
                
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Check className="w-4 h-4 mx-auto mb-1 text-green-500" />
                  <p className="text-xl font-bold text-gray-800 dark:text-white">{completedSessions.length}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Completed</p>
                </div>
                
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-purple-500" />
                  <p className="text-xl font-bold text-gray-800 dark:text-white">
                    {Math.floor(completedSessions.reduce((acc, session) => acc + session.duration, 0) / 60)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Minutes</p>
                </div>
                
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Trophy className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
                  <p className="text-xl font-bold text-gray-800 dark:text-white">
                    {Math.floor(sessions / settings.longBreakInterval)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Cycles</p>
                </div>
              </div>
              
              <button
                onClick={resetAll}
                className="w-full mt-3 px-3 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 rounded-lg text-sm transition-colors duration-200"
              >
                Reset All
              </button>
            </div>

            {/* Settings */}
            {showSettings && (
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-4 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Work Time (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.workTime / 60}
                      onChange={(e) => updateSettings({...settings, workTime: parseInt(e.target.value) * 60})}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Short Break (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.shortBreak / 60}
                      onChange={(e) => updateSettings({...settings, shortBreak: parseInt(e.target.value) * 60})}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Long Break (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.longBreak / 60}
                      onChange={(e) => updateSettings({...settings, longBreak: parseInt(e.target.value) * 60})}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Long Break Interval
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={settings.longBreakInterval}
                      onChange={(e) => updateSettings({...settings, longBreakInterval: parseInt(e.target.value)})}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoStart"
                      checked={autoStart}
                      onChange={(e) => setAutoStart(e.target.checked)}
                      className="mr-2 h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="autoStart" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Auto-start next session
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Sessions */}
            {completedSessions.length > 0 && (
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-4 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Recent</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {completedSessions.slice(-3).reverse().map((session, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${modes[session.mode].color}`}></div>
                        <span className="text-xs font-medium text-gray-800 dark:text-white">{session.mode}</span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        {session.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





// "use client";
// import { useState, useEffect, useRef } from 'react';
// import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, Coffee, Brain, Clock, Check, Target, Trophy, X } from 'lucide-react';

// export default function CompactPomodoroTimer() {
//   const [time, setTime] = useState(1500);
//   const [isActive, setIsActive] = useState(false);
//   const [mode, setMode] = useState('Work');
//   const [intervalId, setIntervalId] = useState(null);
//   const [sessions, setSessions] = useState(0);
//   const [completedSessions, setCompletedSessions] = useState([]);
//   const [showSettings, setShowSettings] = useState(false);
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [autoStart, setAutoStart] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const audioRef = useRef(null);
  
//   const [settings, setSettings] = useState({
//     workTime: 1500,
//     shortBreak: 300,
//     longBreak: 900,
//     longBreakInterval: 4
//   });

//   const modes = {
//     'Work': { 
//       time: settings.workTime, 
//       color: 'from-red-500 to-pink-500',
//       icon: Brain
//     },
//     'Short Break': { 
//       time: settings.shortBreak, 
//       color: 'from-green-500 to-emerald-500',
//       icon: Coffee
//     },
//     'Long Break': { 
//       time: settings.longBreak, 
//       color: 'from-blue-500 to-cyan-500',
//       icon: Clock
//     }
//   };

//   useEffect(() => {
//     audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIaAEOo6vOyYBgBPprb88N3IwYNfMj35o0+CRNauevenU0NDFGm4/O2YBoAQ6nq87NhFgE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhUHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0wGQaBz2Ew++RPhQHUKXh78NjGAI9m9v0wGQaBz2Ew++RPhwBAAAABvYBAAE+mtv0w');
//   }, []);

//   useEffect(() => {
//     if (isActive && time > 0) {
//       const id = setInterval(() => {
//         setTime(prevTime => {
//           const newTime = prevTime - 1;
//           const totalTime = modes[mode].time;
//           setProgress(((totalTime - newTime) / totalTime) * 100);
          
//           if (newTime <= 0) {
//             clearInterval(id);
//             handleSessionComplete();
//             return 0;
//           }
//           return newTime;
//         });
//       }, 1000);
//       setIntervalId(id);
//     } else if (intervalId) {
//       clearInterval(intervalId);
//     }
    
//     return () => clearInterval(intervalId);
//   }, [isActive, time, mode]);

//   const handleSessionComplete = () => {
//     if (soundEnabled && audioRef.current) {
//       audioRef.current.play().catch(() => {});
//     }
    
//     const completedSession = {
//       mode,
//       timestamp: new Date(),
//       duration: modes[mode].time
//     };
    
//     setCompletedSessions(prev => [...prev, completedSession]);
    
//     if (mode === 'Work') {
//       setSessions(prev => prev + 1);
//       const nextMode = (sessions + 1) % settings.longBreakInterval === 0 ? 'Long Break' : 'Short Break';
//       handleModeChange(nextMode);
//     } else {
//       handleModeChange('Work');
//     }
    
//     if (autoStart) {
//       setTimeout(() => setIsActive(true), 1000);
//     }
//   };

//   const handleModeChange = (newMode) => {
//     setMode(newMode);
//     setIsActive(false);
//     setTime(modes[newMode].time);
//     setProgress(0);
//     if (intervalId) clearInterval(intervalId);
//   };

//   const toggleTimer = () => setIsActive(!isActive);

//   const resetTimer = () => {
//     setIsActive(false);
//     setTime(modes[mode].time);
//     setProgress(0);
//     if (intervalId) clearInterval(intervalId);
//   };

//   const resetAll = () => {
//     setIsActive(false);
//     setSessions(0);
//     setCompletedSessions([]);
//     handleModeChange('Work');
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const updateSettings = (newSettings) => {
//     setSettings(newSettings);
//     if (!isActive) {
//       const currentModeTime = newSettings[mode.toLowerCase().replace(' ', '') + 'Time'] || 
//                               newSettings[mode.toLowerCase().replace(' break', 'Break')] ||
//                               modes[mode].time;
//       setTime(currentModeTime);
//     }
//   };

//   const currentMode = modes[mode];
//   const IconComponent = currentMode.icon;

//   return (
//     <div className="min-h-screen p-4 transition-all duration-500 bg-gray-900">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-white mb-1">Pomodoro Timer</h1>
//           <p className="text-sm text-gray-300">Stay focused with the Pomodoro Technique</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Timer Column */}
//           <div className="lg:col-span-2">
//             {/* Mode Selection */}
//             <div className="bg-gray-800/90 rounded-xl p-3 shadow-lg mb-4">
//               <div className="flex gap-2">
//                 {Object.keys(modes).map((modeKey) => (
//                   <button
//                     key={modeKey}
//                     onClick={() => handleModeChange(modeKey)}
//                     className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-200 text-sm ${
//                       mode === modeKey
//                         ? `bg-gradient-to-r ${modes[modeKey].color} text-white shadow-md`
//                         : 'text-gray-300 hover:bg-gray-700'
//                     }`}
//                   >
//                     {modeKey}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Timer Display */}
//             <div className="bg-gray-800/90 rounded-xl p-6 shadow-lg mb-4">
//               <div className="flex items-center justify-center mb-4">
//                 <IconComponent className={`w-6 h-6 mr-2 bg-gradient-to-r ${currentMode.color} bg-clip-text text-transparent`} />
//                 <h2 className="text-lg font-semibold text-white">{mode}</h2>
//               </div>

//               {/* Circular Progress */}
//               <div className="relative w-48 h-48 mx-auto mb-4">
//                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="45"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     fill="none"
//                     className="text-gray-700"
//                   />
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="45"
//                     stroke="url(#gradient)"
//                     strokeWidth="4"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeDasharray={`${2 * Math.PI * 45}`}
//                     strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
//                     className="transition-all duration-1000"
//                   />
//                   <defs>
//                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                       <stop offset="0%" stopColor={currentMode.color.includes('red') ? '#ef4444' : currentMode.color.includes('green') ? '#10b981' : '#3b82f6'} />
//                       <stop offset="100%" stopColor={currentMode.color.includes('pink') ? '#ec4899' : currentMode.color.includes('emerald') ? '#059669' : '#06b6d4'} />
//                     </linearGradient>
//                   </defs>
//                 </svg>
                
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-white mb-1 font-mono">
//                       {formatTime(time)}
//                     </div>
//                     <div className="text-sm text-gray-300">
//                       {isActive ? (time <= 60 ? 'Final minute!' : 'Stay focused') : 'Ready'}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Controls */}
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={toggleTimer}
//                   className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r ${currentMode.color}`}
//                 >
//                   {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                 </button>
                
//                 <button
//                   onClick={resetTimer}
//                   className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
//                 >
//                   <RotateCcw className="w-4 h-4" />
//                 </button>

//                 <button
//                   onClick={() => setSoundEnabled(!soundEnabled)}
//                   className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors duration-200"
//                 >
//                   {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
//                 </button>
                
//                 <button
//                   onClick={() => setShowSettings(!showSettings)}
//                   className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors duration-200"
//                 >
//                   <Settings className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats & Settings Sidebar */}
//           <div className="space-y-4">
//             {/* Stats */}
//             <div className="bg-gray-800/90 rounded-xl p-4 shadow-lg">
//               <h3 className="text-lg font-semibold text-white mb-3">Stats</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="text-center p-2 bg-gray-700 rounded-lg">
//                   <Target className="w-4 h-4 mx-auto mb-1 text-blue-500" />
//                   <p className="text-xl font-bold text-white">{sessions}</p>
//                   <p className="text-xs text-gray-300">Sessions</p>
//                 </div>
                
//                 <div className="text-center p-2 bg-gray-700 rounded-lg">
//                   <Check className="w-4 h-4 mx-auto mb-1 text-green-500" />
//                   <p className="text-xl font-bold text-white">{completedSessions.length}</p>
//                   <p className="text-xs text-gray-300">Completed</p>
//                 </div>
                
//                 <div className="text-center p-2 bg-gray-700 rounded-lg">
//                   <Clock className="w-4 h-4 mx-auto mb-1 text-purple-500" />
//                   <p className="text-xl font-bold text-white">
//                     {Math.floor(completedSessions.reduce((acc, session) => acc + session.duration, 0) / 60)}
//                   </p>
//                   <p className="text-xs text-gray-300">Minutes</p>
//                 </div>
                
//                 <div className="text-center p-2 bg-gray-700 rounded-lg">
//                   <Trophy className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
//                   <p className="text-xl font-bold text-white">
//                     {Math.floor(sessions / settings.longBreakInterval)}
//                   </p>
//                   <p className="text-xs text-gray-300">Cycles</p>
//                 </div>
//               </div>
              
//               <button
//                 onClick={resetAll}
//                 className="w-full mt-3 px-3 py-2 bg-red-900 hover:bg-red-800 text-red-200 rounded-lg text-sm transition-colors duration-200"
//               >
//                 Reset All
//               </button>
//             </div>

//             {/* Settings */}
//             {showSettings && (
//               <div className="bg-gray-800/90 rounded-xl p-4 shadow-lg">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="text-lg font-semibold text-white">Settings</h3>
//                   <button
//                     onClick={() => setShowSettings(false)}
//                     className="text-gray-400 hover:text-gray-200"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-300 mb-1">
//                       Work Time (min)
//                     </label>
//                     <input
//                       type="number"
//                       min="1"
//                       max="60"
//                       value={settings.workTime / 60}
//                       onChange={(e) => updateSettings({...settings, workTime: parseInt(e.target.value) * 60})}
//                       className="w-full px-2 py-1 text-sm border border-gray-600 rounded focus:ring-1 focus:ring-blue-500 bg-gray-700 text-white"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-xs font-medium text-gray-300 mb-1">
//                       Short Break (min)
//                     </label>
//                     <input
//                       type="number"
//                       min="1"
//                       max="30"
//                       value={settings.shortBreak / 60}
//                       onChange={(e) => updateSettings({...settings, shortBreak: parseInt(e.target.value) * 60})}
//                       className="w-full px-2 py-1 text-sm border border-gray-600 rounded focus:ring-1 focus:ring-blue-500 bg-gray-700 text-white"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-xs font-medium text-gray-300 mb-1">
//                       Long Break (min)
//                     </label>
//                     <input
//                       type="number"
//                       min="1"
//                       max="60"
//                       value={settings.longBreak / 60}
//                       onChange={(e) => updateSettings({...settings, longBreak: parseInt(e.target.value) * 60})}
//                       className="w-full px-2 py-1 text-sm border border-gray-600 rounded focus:ring-1 focus:ring-blue-500 bg-gray-700 text-white"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-xs font-medium text-gray-300 mb-1">
//                       Long Break Interval
//                     </label>
//                     <input
//                       type="number"
//                       min="2"
//                       max="10"
//                       value={settings.longBreakInterval}
//                       onChange={(e) => updateSettings({...settings, longBreakInterval: parseInt(e.target.value)})}
//                       className="w-full px-2 py-1 text-sm border border-gray-600 rounded focus:ring-1 focus:ring-blue-500 bg-gray-700 text-white"
//                     />
//                   </div>
                  
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id="autoStart"
//                       checked={autoStart}
//                       onChange={(e) => setAutoStart(e.target.checked)}
//                       className="mr-2 h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                     />
//                     <label htmlFor="autoStart" className="text-xs font-medium text-gray-300">
//                       Auto-start next session
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Recent Sessions */}
//             {completedSessions.length > 0 && (
//               <div className="bg-gray-800/90 rounded-xl p-4 shadow-lg">
//                 <h3 className="text-lg font-semibold text-white mb-3">Recent</h3>
//                 <div className="space-y-2 max-h-40 overflow-y-auto">
//                   {completedSessions.slice(-3).reverse().map((session, index) => (
//                     <div key={index} className="flex items-center justify-between py-2 px-2 bg-gray-700 rounded-lg">
//                       <div className="flex items-center">
//                         <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${modes[session.mode].color}`}></div>
//                         <span className="text-xs font-medium text-white">{session.mode}</span>
//                       </div>
//                       <div className="text-xs text-gray-300">
//                         {session.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }