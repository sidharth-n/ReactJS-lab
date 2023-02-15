import React, { useState, useEffect } from "react";
import mario from "./mario.svg";
const Board = () => {
  const snakes = [
    [32, 10],
    [34, 6],
    [48, 26],
    [62, 18],
    [88, 24],
    [95, 56],
    [97, 78],
  ];

  const ladders = [
    [4, 14],
    [8, 30],
    [17, 38],
    [21, 42],
    [28, 76],
    [50, 67],
    [80, 99],
    [71, 92],
  ];

  const [position, setPosition] = useState(1);
  const [finalPosition, setFinalPosition] = useState(null);
  const [rolling, setRolling] = useState(false);
  const board = Array(100).fill(null);
  const evenClass = "bg-gray-200";
  const oddClass = "bg-gray-300";
  const snakeClass = "bg-red-300";
  const ladderClass = "bg-green-300";
  const ladderClassHighlight = "bg-green-700";
  const snakeClassHighlight = "bg-red-700";
  const [highlights, setHighlights] = useState([]);
  const [gameBanner, setGameBanner] = useState("Ready to play ?");
  const [isGameOn, setIsGameOn] = useState(false);
  const [isPLayerStill, setIsPlayerStill] = useState(true);

  useEffect(() => {
    if (rolling) {
      setGameBanner("Rolling");
    }
  }, [rolling]);
  const rollDice = () => {
    if (isGameOn == false) {
      setGameBanner("Roll the dice");
      setIsGameOn(true);
      return;
    }
    setIsPlayerStill(false);
    setRolling(true);
    setHighlights([]);
    const roll = Math.floor(Math.random() * 6) + 1;
    setTimeout(() => {
      setRolling(false);
      setGameBanner(`You got a ${roll}`);
      let start = position;
      let i = position;
      const intervalId = setInterval(() => {
        i++;
        if (i > 100) {
          setGameBanner("oop! movement not possible");
          setPosition(start);
          setFinalPosition(start);
          setIsPlayerStill(true);
          clearInterval(intervalId);
          return;
        }
        setPosition(i);
        if (i == position + roll) {
          setFinalPosition(i);
        }
        if (i >= position + roll) {
          clearInterval(intervalId);
          setIsPlayerStill(true);
        }
      }, 200);
    }, 1000);
  };

  function ladderMove(pos) {
    setIsPlayerStill(false);
    setGameBanner(`Hurray! you stepped on ladder at ${pos[0]}`);
    let i = pos[0];
    const intervalId = setInterval(() => {
      i++;
      setPosition(i);
      if (i == pos[1]) {
        setFinalPosition(i);
        clearInterval(intervalId);
        setIsPlayerStill(true);
      }
    }, 50);
  }

  function snakeMove(pos) {
    setIsPlayerStill(false);
    setGameBanner(`Oops! there was a snake at ${pos[0]}`);
    let i = pos[0];
    const intervalId = setInterval(() => {
      i--;
      setPosition(i);
      if (i == pos[1]) {
        setFinalPosition(i);
        clearInterval(intervalId);
        setIsPlayerStill(true);
      }
    }, 50);
  }

  useEffect(() => {
    if (finalPosition == 100) {
      setGameBanner(`Cool !! you won! replay ?`);
      setPosition(1);
      setRolling(false);
      setIsGameOn(false);

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
    <div className="flex flex-col max-w-md m-auto">
      <div className="flex flex-col my-auto border-gray-600 border border-solid mx-2 mt-4">
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
                {position === 100 - index && isGameOn == true ? (
                  <div
                    className={`w-5 h-5 rounded-full bg-transparent animate-bounce ${
                      isGameOn ? "flex" : "hidden"
                    }`}
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
      <div class="self-center text-sm flex items-center justify-center rounded-xl border-4 border-black bg-pink-100 px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] mt-8">
        {gameBanner}
        <span
          aria-hidden="true"
          role="img"
          class={`ml-1.5 ${isGameOn && rolling ? "flex" : "hidden"}`}
        >
          🎲
        </span>
      </div>

      <div
        onClick={rollDice}
        className={`mt-8 self-center rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 ${
          !isPLayerStill ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium text-black ">
          {!isGameOn ? "Play" : "Roll"}
        </span>
      </div>

      {/*  <span class=" mt-8 block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
        {random}
      </span> */}
    </div>
  );
};
export default Board;
