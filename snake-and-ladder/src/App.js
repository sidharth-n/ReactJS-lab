import React, { useState, useEffect } from "react";
import mario from "./mario.svg";
const Board = () => {
  const snakes = [
    [17, 7],
    [54, 34],
    [62, 19],
    [64, 60],
    [93, 73],
    [95, 75],
    [99, 22],
    [28, 3],
    [47, 29],
    [68, 38],
    [79, 42],
    [89, 71],
    [97, 65],
  ];

  const ladders = [
    [4, 14],
    [9, 31],
    [21, 42],
    [28, 84],
    [36, 44],
    [51, 67],
    [71, 91],
    [80, 94],
    [12, 22],
    [38, 50],
    [46, 72],
    [55, 80],
    [70, 91],
    [2, 18],
    [16, 29],
    [43, 58],
    [65, 79],
    [82, 96],
  ];

  const [position, setPosition] = useState(1);
  const [finalPosition, setFinalPosition] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [random, setRandom] = useState(null);
  const board = Array(100).fill(null);
  const evenClass = "bg-gray-200";
  const oddClass = "bg-gray-300";
  const snakeClass = "bg-red-300";
  const ladderClass = "bg-green-300";
  const ladderClassHighlight = "bg-green-700";
  const snakeClassHighlight = "bg-red-700";
  const [highlights, setHighlights] = useState([]);
  const rollDice = () => {
    setRolling(true);
    setHighlights([]);
    const roll = Math.floor(Math.random() * 6) + 1;
    setTimeout(() => {
      setRandom(roll);
      setRolling(false);
      let i = position;
      const intervalId = setInterval(() => {
        i++;
        setPosition(i);
        if (i == position + roll) {
          setFinalPosition(i);
        }
        if (i >= position + roll) {
          clearInterval(intervalId);
        }
      }, 500);
    }, 1000);
  };

  function ladderMove(pos) {
    let i = pos[0];
    const intervalId = setInterval(() => {
      i++;
      setPosition(i);
      if (i == pos[1]) {
        setFinalPosition(i);
        clearInterval(intervalId);
      }
    }, 100);
  }

  function snakeMove(pos) {
    let i = pos[0];
    const intervalId = setInterval(() => {
      i--;
      setPosition(i);
      if (i == pos[1]) {
        setFinalPosition(i);
        clearInterval(intervalId);
      }
    }, 100);
  }

  useEffect(() => {
    if (finalPosition == 100) {
      console.log("you won");
      setPosition(1);
      setRolling(false);
      setRandom(null);
      return;
    }
    if (finalPosition > 100) {
      console.log("oops! replay ?");
      setPosition(1);
      setRolling(false);
      setRandom(null);
      return;
    }
    if (ladders.some((ladder) => ladder[0] === finalPosition)) {
      const ladderEnd = ladders.find(
        (ladder) => ladder[0] === finalPosition
      )[1];
      ladderMove([finalPosition, ladderEnd]);
      setHighlights([finalPosition, ladderEnd, "l"]);
    }
    if (snakes.some((snake) => snake[0] === finalPosition)) {
      const snakeEnd = snakes.find((snake) => snake[0] === finalPosition)[1];
      snakeMove([finalPosition, snakeEnd]);
      setHighlights([finalPosition, snakeEnd, "s"]);
    }
  }, [finalPosition]);

  useEffect(() => {
    console.log("highlights:", highlights);
  }, [highlights]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col my-auto border-black border border-solid mx-2 mt-4">
        <div className="grid grid-cols-10 grid-rows-10 ">
          {board
            .map((square, index) => (
              <div
                className={`h-8 flex items-center justify-center text-xs border-solid border-white border text-slate-700 ${
                  (Math.floor(index / 10) % 2 === 0 ? index : index + 10) %
                    2 ===
                  0
                    ? evenClass
                    : oddClass
                } ${
                  snakes.find((snake) => snake[0] === 100 - index)
                    ? snakeClass
                    : ""
                } ${
                  ladders.find((ladder) => ladder[0] === 100 - index)
                    ? ladderClass
                    : ""
                }
               ${
                 highlights.includes(100 - index) &&
                 highlights.includes("l") &&
                 ladderClassHighlight
               } ${
                  highlights.includes(100 - index) &&
                  highlights.includes("s") &&
                  snakeClassHighlight
                }
`}
                key={index}
              >
                {position === 100 - index ? (
                  <div
                    className="w-5 h-5 rounded-full bg-red-500 animate-bounce"
                    style={{
                      position: "relative",
                      transition: "all 1s ease-in-out",
                      transform:
                        position === 100 - index
                          ? "translateX(40px)"
                          : "translateX(0)",
                    }}
                  >
                    <img
                      src={mario}
                      alt="Mario"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  100 - index
                )}
              </div>
            ))
            .reduce((rows, square, index) => {
              return (
                (index % 10 === 0
                  ? rows.push([square])
                  : rows[rows.length - 1].push(square)) && rows
              );
            }, [])
            .map((row, rowIndex) => {
              return rowIndex % 2 === 0 ? row : row.reverse();
            })
            .flat()}
        </div>
      </div>
      <div
        onClick={rollDice}
        class="mt-8 self-center rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span class="block rounded-full bg-white px-8 py-3 text-sm font-medium text-black ">
          {rolling ? "Rolling..." : "Roll"}
        </span>
      </div>

      <span class=" mt-8 block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
        {random}
      </span>
    </div>
  );
};
export default Board;
