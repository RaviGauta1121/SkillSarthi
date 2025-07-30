"use client";

import React, { useState } from 'react';

const MemoryMatrixGame = () => {
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [message, setMessage] = useState('');

  const generatePattern = (size) => {
    const newPattern = [];
    for (let i = 0; i < size; i++) {
      newPattern.push(Math.floor(Math.random() * (size * size)) + 1);
    }
    return newPattern;
  };

  const displayPattern = () => {
    setMessage('Memorize the pattern!');
    pattern.forEach((number, index) => {
      setTimeout(() => {
        const cell = document.querySelector(`#cell-${number}`);
        cell.classList.add('active');
        setTimeout(() => {
          cell.classList.remove('active');
          if (index === pattern.length - 1) {
            setMessage('Your turn!');
            setIsPlayerTurn(true);
          }
        }, 500);
      }, index * 1000);
    });
  };

  const initializeGameBoard = (size) => {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 1; i <= size * size; i++) {
      const cell = document.createElement('div');
      cell.id = `cell-${i}`;
      cell.className = 'grid-cell';
      cell.textContent = i;
      cell.addEventListener('click', () => handleCellClick(i));
      gameBoard.appendChild(cell);
    }
  };

  const handleCellClick = (number) => {
    if (!isPlayerTurn) return;

    setPlayerInput((prev) => [...prev, number]);
    const cell = document.querySelector(`#cell-${number}`);
    cell.classList.add('active');

    setTimeout(() => {
      cell.classList.remove('active');
    }, 300);

    if (playerInput.length + 1 === pattern.length) {
      checkPlayerInput([...playerInput, number]);
    }
  };

  const checkPlayerInput = (input) => {
    setIsPlayerTurn(false);
    if (input.toString() === pattern.toString()) {
      setMessage('Correct! Get ready for the next level.');
      setLevel((prev) => prev + 1);
      setTimeout(startGame, 2000);
    } else {
      setMessage('Incorrect! Try again from level 1.');
      setLevel(1);
    }
  };

  const startGame = () => {
    setMessage('');
    setPlayerInput([]);
    setPattern(generatePattern(level + 2));
    initializeGameBoard(level + 2);
    setTimeout(displayPattern, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <h1 className="text-4xl font-bold text-gray-800">Memory Matrix Game</h1>
      <div className="mt-8 flex flex-col items-center">
        <div id="game-board" className="grid gap-4 mb-8"></div>
        <button
          id="start-button"
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={startGame}
        >
          Start Game
        </button>
        <p id="level" className="mt-4 text-lg font-medium text-gray-700">
          Level: {level}
        </p>
        <p id="message" className="mt-4 text-lg text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MemoryMatrixGame;
