"use client";
import React, { useState, useEffect } from 'react';

const MemoryMatrixGame = () => {
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState('ready'); // 'ready', 'showing', 'playing', 'correct', 'incorrect'
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeCell, setActiveCell] = useState(null);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

  const gridSize = Math.min(level + 2, 6); // 3x3 to 6x6 max
  const totalCells = gridSize * gridSize;

  const generatePattern = (size) => {
    const patternLength = Math.min(level + 2, size); // Pattern length grows with level
    const newPattern = [];
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(Math.floor(Math.random() * totalCells) + 1);
    }
    return newPattern;
  };

  const displayPattern = async () => {
    setGameState('showing');
    setMessage('Watch and memorize the pattern!');
    setCurrentPatternIndex(0);
    
    for (let i = 0; i < pattern.length; i++) {
      // Show cell
      setActiveCell(pattern[i]);
      setCurrentPatternIndex(i + 1);
      
      // Wait for display duration
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Hide cell
      setActiveCell(null);
      
      // Wait between cells (except after last one)
      if (i < pattern.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    // Start player turn
    setMessage('Now click the cells in the same order!');
    setIsPlayerTurn(true);
    setGameState('playing');
    setCurrentPatternIndex(0);
  };

  const handleCellClick = (cellNumber) => {
    if (!isPlayerTurn || gameState !== 'playing') return;
    
    const newPlayerInput = [...playerInput, cellNumber];
    setPlayerInput(newPlayerInput);
    
    // Flash the clicked cell
    setActiveCell(cellNumber);
    setTimeout(() => setActiveCell(null), 200);

    // Check if current input is correct
    if (pattern[newPlayerInput.length - 1] !== cellNumber) {
      // Wrong input
      setGameState('incorrect');
      setMessage('❌ Wrong sequence! Game over.');
      setIsPlayerTurn(false);
      setTimeout(() => resetGame(), 2000);
      return;
    }

    // Check if pattern is complete
    if (newPlayerInput.length === pattern.length) {
      // Complete sequence correct
      setGameState('correct');
      setMessage('✅ Perfect! Get ready for the next level...');
      setIsPlayerTurn(false);
      setScore(prev => prev + level * 10);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        startGame();
      }, 1500);
    }
  };

  const resetGame = () => {
    if (score > bestScore) {
      setBestScore(score);
    }
    setLevel(1);
    setScore(0);
    setGameState('ready');
    setMessage('');
    setPlayerInput([]);
    setPattern([]);
    setIsPlayerTurn(false);
    setGameStarted(false);
    setActiveCell(null);
    setCurrentPatternIndex(0);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    setMessage('Get ready...');
    setPlayerInput([]);
    setGameState('ready');
    setActiveCell(null);
    
    const newPattern = generatePattern(totalCells);
    setPattern(newPattern);
    
    // Small delay before showing pattern
    setTimeout(() => {
      displayPattern();
    }, 1000);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const renderGrid = () => {
    const cells = [];
    for (let i = 1; i <= totalCells; i++) {
      const isActive = activeCell === i;
      const isPatternCell = gameState === 'showing' && isActive;
      const isPlayerCell = gameState === 'playing' && isActive;
      
      cells.push(
        <button
          key={i}
          onClick={() => handleCellClick(i)}
          disabled={!isPlayerTurn || gameState !== 'playing'}
          className={`
            w-16 h-16 rounded-lg flex items-center justify-center font-bold text-lg
            transition-all duration-200 transform border-2
            ${isPatternCell 
              ? 'bg-yellow-400 border-yellow-300 scale-110 shadow-lg shadow-yellow-400/50' 
              : isPlayerCell
              ? 'bg-blue-400 border-blue-300 scale-110 shadow-lg shadow-blue-400/50'
              : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:scale-105'
            }
            ${isPlayerTurn && gameState === 'playing' 
              ? 'cursor-pointer text-white' 
              : 'cursor-not-allowed text-gray-400'
            }
          `}
        >
          {i}
        </button>
      );
    }
    return cells;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 mt-8">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-2">Memory Matrix</h1>
        <p className="text-center text-gray-300 mb-6">Test your memory and pattern recognition!</p>
        
        {/* Instructions */}
        <div className="mb-6">
          <button
            onClick={toggleInstructions}
            className="text-blue-400 hover:text-blue-300 underline text-sm"
          >
            {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
          </button>
          
          {showInstructions && (
            <div className="mt-3 p-4 bg-gray-700 rounded-lg text-sm text-gray-200">
              <h3 className="font-semibold text-white mb-2">How to Play:</h3>
              <ul className="space-y-1 text-gray-300">
                <li>• Watch as cells light up in a sequence (yellow glow)</li>
                <li>• Memorize the exact order of the pattern</li>
                <li>• Click the cells in the same sequence when it's your turn</li>
                <li>• Each level increases grid size and pattern length</li>
                <li>• One wrong click = game over, restart from level 1</li>
                <li>• Score: Level × 10 points per completed round</li>
              </ul>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-6 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{level}</div>
            <div className="text-sm text-gray-400">Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-sm text-gray-400">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{bestScore}</div>
            <div className="text-sm text-gray-400">Best</div>
          </div>
        </div>

        {/* Pattern Progress */}
        {gameState === 'showing' && (
          <div className="mb-4 text-center">
            <div className="text-sm text-gray-400 mb-2">Pattern Progress</div>
            <div className="flex justify-center space-x-2">
              {pattern.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < currentPatternIndex ? 'bg-yellow-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Player Progress */}
        {gameState === 'playing' && (
          <div className="mb-4 text-center">
            <div className="text-sm text-gray-400 mb-2">Your Progress</div>
            <div className="flex justify-center space-x-2">
              {pattern.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < playerInput.length ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Game Board */}
        <div className="flex justify-center mb-6">
          <div 
            className={`grid gap-3 p-6 bg-gray-900 rounded-lg shadow-inner`}
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {renderGrid()}
          </div>
        </div>

        {/* Controls */}
        <div className="text-center space-y-4">
          <button
            onClick={gameStarted ? resetGame : startGame}
            disabled={gameState === 'showing'}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              gameState === 'showing'
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg'
            }`}
          >
            {gameStarted ? 'Reset Game' : 'Start Game'}
          </button>
          
          {message && (
            <p className={`text-lg font-medium animate-pulse ${
              gameState === 'correct' ? 'text-green-400' :
              gameState === 'incorrect' ? 'text-red-400' :
              'text-blue-400'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryMatrixGame;