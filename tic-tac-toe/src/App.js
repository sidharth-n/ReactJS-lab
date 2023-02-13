import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const url = "https://textdb.dev/api/data/tic-tac-toe-test-00456";
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [winnerLine, setWinnerLine] = useState(Array(3).fill(null));
  const [count, setCount] = useState(0);
  const [serverUpdate, setServerUpdate] = useState(false);

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  useEffect(() => {
    const boardArray = JSON.stringify(board);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: boardArray,
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    fetch(url)
      .then((r) => r.json())
      .then((newBoard) => {
        if (!arraysEqual(newBoard, board)) {
          setBoard(newBoard);
        }
      });
    return () => clearInterval(intervalId);
  }, [count]);

  useEffect(() => {
    const result = calculateWinner(board);
    if (result !== null) {
      setWinner(result[0]);
      setWinnerLine([...result[1]]);
    }
    if (!board.includes(null)) {
      setGameEnded(!gameEnded);
    }
  }, [board]);

  function handleClick(index) {
    if (winner) {
      return;
    }
    const newBoard = [...board];
    if (newBoard[index] == null) {
      newBoard[index] = currentPlayer;
      const boardArray = JSON.stringify(newBoard);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: boardArray,
      });
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }
  function clearBoard() {
    const clearArray = Array(9).fill(null);
    setBoard(clearArray);
    setCurrentPlayer("X");
    setWinner(null);
    setGameEnded(false);
    setWinnerLine(Array(3).fill(null));
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-3xl text-bold">
        {winner
          ? winner + " won"
          : gameEnded
          ? "Oops!! replay ?"
          : "Next Move : " + currentPlayer}
      </div>
      <Board handleClick={handleClick} board={board} winnerLine={winnerLine} />
      <button
        className={`bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg mt-4 ${
          gameEnded || winner ? "block" : "hidden"
        }`}
        onClick={clearBoard}
      >
        Replay
      </button>
    </div>
  );
}

function Board({ handleClick, board, winnerLine }) {
  return (
    <div className="grid grid-cols-3 ">
      {board.map((square, index) => (
        <div
          className={`w-32 h-32 border border-gray-400 flex items-center justify-center cursor-pointer text-4xl text-neutral-700 font-bold ${
            winnerLine.includes(index)
              ? "bg-green-300"
              : index % 2
              ? "bg-gray-200"
              : "bg-gray-400"
          }`}
          onClick={() => handleClick(index)}
        >
          {square}
        </div>
      ))}
    </div>
  );
}

export default App;

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
};
