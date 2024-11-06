import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Trophy, RotateCcw } from 'lucide-react';

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

function App() {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setMessage('');
    
    // Play rolling sound
    new Audio('https://www.soundjay.com/misc/sounds/dice-roll-01.mp3').play().catch(() => {});
    
    // Animate dice roll
    let rolls = 0;
    const maxRolls = 10;
    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls >= maxRolls) {
        clearInterval(interval);
        const finalDice1 = Math.floor(Math.random() * 6) + 1;
        const finalDice2 = Math.floor(Math.random() * 6) + 1;
        setDice1(finalDice1);
        setDice2(finalDice2);
        setIsRolling(false);
        
        // Calculate score
        const total = finalDice1 + finalDice2;
        if (finalDice1 === finalDice2) {
          setScore(prev => prev + total * 2);
          setMessage('Double! Score multiplied by 2! 🎉');
        } else {
          setScore(prev => prev + total);
        }
      }
    }, 100);
  };

  const resetGame = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
    setDice1(1);
    setDice2(1);
    setMessage('');
  };

  useEffect(() => {
    const savedHighScore = localStorage.getItem('diceHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diceHighScore', highScore.toString());
  }, [highScore]);

  const DiceIcon1 = diceIcons[dice1 - 1];
  const DiceIcon2 = diceIcons[dice2 - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dice Master</h1>
          <p className="text-gray-600">Roll the dice to score points!</p>
        </div>

        <div className="flex justify-center gap-8 mb-8">
          <div className={`transform transition-all duration-150 ${isRolling ? 'rotate-12' : ''}`}>
            <DiceIcon1 size={80} className="text-purple-600" />
          </div>
          <div className={`transform transition-all duration-150 ${isRolling ? '-rotate-12' : ''}`}>
            <DiceIcon2 size={80} className="text-blue-600" />
          </div>
        </div>

        {message && (
          <div className="text-center mb-6 text-lg font-semibold text-green-600 animate-bounce">
            {message}
          </div>
        )}

        <div className="flex justify-between mb-8">
          <div className="text-center">
            <p className="text-gray-600">Score</p>
            <p className="text-2xl font-bold text-gray-800">{score}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Trophy size={20} className="text-yellow-500" />
              <p className="text-gray-600">High Score</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{highScore}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={rollDice}
            disabled={isRolling}
            className={`flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transform transition-all duration-150 ${
              isRolling ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'
            }`}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
          <button
            onClick={resetGame}
            className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <RotateCcw size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Get doubles to multiply your score!</p>
        </div>
      </div>
    </div>
  );
}

export default App;