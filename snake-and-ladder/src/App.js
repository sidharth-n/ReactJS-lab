import React, { useState, useEffect } from "react";

const Board = () => {
  const [position, setPosition] = useState(1);
  const [finalPosition, setFinalPosition] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [random, setRandom] = useState(null);
  const board = Array(100).fill(null);
  const evenClass = "bg-gray-200";
  const oddClass = "bg-gray-300";
  const rollDice = () => {
    setRolling(true);
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

  useEffect(() => {
    if (finalPosition == 20) {
      console.log("you won");
      setPosition(1);
      setRolling(false);
      setRandom(null);
      return;
    }
    if (finalPosition > 20) {
      console.log("oops! replay ?");
      setPosition(1);
      setRolling(false);
      setRandom(null);
    }
  }, [finalPosition]);

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
                }`}
                key={index}
              >
                {position === 100 - index ? (
                  <div
                    className="w-3 h-3 rounded-full bg-red-500 animate-bounce"
                    style={{
                      position: "relative",
                      transition: "all 1s ease-in-out",
                      transform:
                        position === 100 - index
                          ? "translateX(40px)"
                          : "translateX(0)",
                    }}
                  ></div>
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
