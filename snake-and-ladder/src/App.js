/* import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDice,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [position, setPosition] = useState(0);

  const handleRoll = () => {
    setPosition(position + Math.floor(Math.random() * 6) + 1);
  };

  const handleMove = (move) => {
    setPosition(position + move);
  };

  return (
    <div className="w-64 mx-auto my-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">Snake and Ladder</h1>
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto my-3 flex items-center justify-center">
          <span className="text-3xl font-bold">{position}</span>
        </div>
        <div className="flex justify-center my-3">
          <button
            onClick={handleRoll}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            <FontAwesomeIcon icon={faDice} className="mr-2" />
            Roll Dice
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          <button
            onClick={() => handleMove(10)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-3"
          >
            <FontAwesomeIcon icon={faArrowUp} className="mr-2" />
            Ladder
          </button>
          <button
            onClick={() => handleMove(-10)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mx-3"
          >
            <FontAwesomeIcon icon={faArrowDown} className="mr-2" />
            Snake
          </button>
        </div>
      </div>
    </div>
  );
};

export default App; */

/* import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [position, setPosition] = useState(0);

  const handleMove = () => {
    const roll = Math.floor(Math.random() * 6) + 1;

    const newPosition = position + roll;

    setPosition(newPosition);
  };

  return (
    <div className="flex flex-col items-center">
      <Board />
      {   <div className="w-64 h-64 bg-gray-400 rounded-lg p-4">
        {Array.from({ length: 100 }, (_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full ${
              index === position
                ? "bg-yellow-500"
                : index % 2 === 0
                ? "bg-gray-300"
                : "bg-white"
            }`}
          ></div>
        ))}
      </div>}
      <button
        className="bg-gray-800 text-white p-2 rounded-full mt-2"
        onClick={handleMove}
      >
        <FontAwesomeIcon icon={faDice} /> Roll Dice
      </button>
    </div>
  );
};

export default App;
 */
/* const Board = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-100 h-100 bg-gray-400 rounded-lg p-4">
    
        <div className="grid grid-cols-10 grid-rows-10  gap-2">
          {Array.from({ length: 100 }, (_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-4 rounded-lg ${
                index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; */

import React, { useState } from "react";
import { motion, useCycle } from "framer-motion";

const Board = () => {
  const [position, setPosition] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setPosition(position + roll);
      setRolling(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-100 h-100 bg-gray-400 rounded-lg p-4">
        {/* Render the board with 100 squares */}
        <div className="grid grid-cols-10 grid-rows-10  gap-2">
          {Array.from({ length: 100 }, (_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-4 rounded-lg ${
                index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
              }`}
            >
              {position === index + 1 ? (
                <motion.div
                  animate={{ y: [-20, 20] }}
                  transition={{
                    yoyo: Infinity,
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <i className="fas fa-chess-pawn fa-2x text-red-500"></i>
                </motion.div>
              ) : (
                index + 1
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
        onClick={rollDice}
        disabled={rolling}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
};

export default Board;
