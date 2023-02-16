import { useState, useEffect } from "react";

function App() {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [winnerLine, setWinnerLine] = useState(Array(4).fill(null));
  const [isRoomCreated, setisRoomCreated] = useState(false);
  const [isPlayerChoosen, setisPlayerChoosen] = useState(false);
  const [roomLink, setRoomLink] = useState("Link here");
  const [playerChoosen, setPlayerChoosen] = useState(null);
  const [isShared, setIsShared] = useState(false);
  const [serverUrl, setServerUrl] = useState(null);
  const [isInRoom, setIsInRoom] = useState(false);
  const [count, setCount] = useState(1);
  const [mySymbol, setMysymbol] = useState(null);
  const [id, setId] = useState(null);
  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return a[i];
    }
    return true;
  };

  useEffect(() => {
    const queryString = window.location.search;
    if (queryString != "") {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      setServerUrl(`https://textdb.dev/api/data/${params.id}`);
      console.log(serverUrl);
      setIsShared(true);
      setisPlayerChoosen(true);
      setisRoomCreated(true);
      setisPlayerChoosen(true);
      setIsInRoom(true);
      setMysymbol(params.pl);
    }
  }, []);

  useEffect(() => {
    console.log("updated url with use effect : " + serverUrl);
  }, [serverUrl]);

  useEffect(() => {
    setRoomLink((link) => `${link}&pl=${playerChoosen == "X" ? "O" : "X"}`);
  }, [playerChoosen]);

  const getId = function (_id = null) {
    const getRandomId = () => {
      const randomChar = () =>
        String.fromCharCode(97 + Math.floor(26 * Math.random()));
      return [1, 1, 1]
        .map((_) => {
          return [1, 1, 1].map(randomChar).join("");
        })
        .join("-");
    };

    if (!_id) {
      _id = getRandomId();
    }

    return _id;
  };

  function createRoom() {
    setId(getId());
    setServerUrl(`https://textdb.dev/api/data/${id}`);
    console.log("server created : " + serverUrl);
    setRoomLink(`${window.location.href}?id=${id}`);
    setisRoomCreated(true);
  }

  useEffect(() => {
    const boardArray = JSON.stringify(board);
    fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: boardArray,
    });
  }, [playerChoosen]);

  function setGame() {
    window.location = `${window.location.href}?id=${id}&pl=${playerChoosen}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    fetch(serverUrl)
      .then((r) => r.json())
      .then((newBoard) => {
        const difference = arraysEqual(newBoard, board);
        if (difference !== true) {
          if (newBoard.every((element) => element === null)) {
            clearBoard();
          }
          setBoard(newBoard);
          setCurrentPlayer(difference == "X" ? "O" : "X");
          console.log("Different value: ", difference);
        } else {
          console.log("Arrays are equal");
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
    if (currentPlayer !== mySymbol) {
      return;
    }
    const newBoard = [...board];
    if (newBoard[index] == null) {
      newBoard[index] = currentPlayer;
      const boardArray = JSON.stringify(newBoard);
      fetch(serverUrl, {
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
    const clearArray = Array(16).fill(null);
    const boardArray = JSON.stringify(clearArray);
    fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: boardArray,
    });
    setBoard(clearArray);
    setCurrentPlayer("X");
    setWinner(null);
    setGameEnded(false);
    setWinnerLine(Array(4).fill(null));
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        class={`mx-4 mt-44 flex max-w-sm flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 ${
          isRoomCreated ? "hidden" : "flex"
        }`}
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          React tik-tak-toe
        </h5>
        <p class="mb-6 text-center font-normal text-gray-700 dark:text-gray-400">
          Now play tik-tac-toe with your friend online. Enjoy your old classroom
          vibes.
        </p>
        <div
          onClick={createRoom}
          class="inline-flex items-center self-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create New Game
        </div>
      </div>
      <div
        class={`mx-4 mt-44 max-w-sm flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 ${
          !isPlayerChoosen && isRoomCreated ? "flex" : "hidden"
        }`}
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Choose your player
        </h5>
        <div className="flex gap-4">
          <div
            onClick={() => {
              setPlayerChoosen("X");
              setisPlayerChoosen(true);
            }}
            class="inline-flex items-center self-center rounded-full bg-gray-300 px-5 py-2 text-center text-3xl font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            X
          </div>
          <div
            onClick={() => {
              setPlayerChoosen("O");
              setisPlayerChoosen(true);
            }}
            class="inline-flex items-center self-center rounded-full bg-gray-300 px-5 py-2 text-center text-3xl font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            O
          </div>
        </div>
      </div>
      <div
        class={`mx-4 mt-44 max-w-sm flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 ${
          isShared || !isPlayerChoosen ? "hidden" : "flex"
        } `}
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Share the link
        </h5>
        <div className="flex flex-col gap-4">
          <div class="inline-flex items-center self-center text-center text-sm font-medium text-blue-700 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 ">
            {roomLink}
          </div>
          <div
            onClick={() => {
              setIsShared(true);
              setGame();
            }}
            class="inline-flex items-center self-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Done
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col justify-center items-center ${
          isRoomCreated && isShared ? "flex" : "hidden"
        }`}
      >
        <div className="inline-flex items-center justify-center rounded-full bg-gray-200 px-2.5 py-0.5 text-gray-700 mt-4 mb-4">
          {winner
            ? winner + " won"
            : gameEnded
            ? "Oops!! replay ?"
            : currentPlayer == mySymbol
            ? "Your move"
            : "Wait for friends move"}
        </div>
        <Board
          handleClick={handleClick}
          board={board}
          winnerLine={winnerLine}
        />
        <button
          className={`bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg mt-4 ${
            gameEnded || winner ? "block" : "hidden"
          }`}
          onClick={clearBoard}
        >
          Replay
        </button>
      </div>
    </div>
  );
}

function Board({ handleClick, board, winnerLine }) {
  return (
    <div className="grid grid-cols-4">
      {board.map((square, index) => (
        <div
          className={`w-16 h-16 border border-gray-400 flex items-center justify-center cursor-pointer text-4xl text-neutral-700 font-bold ${
            winnerLine.includes(index)
              ? "bg-green-300"
              : (index + Math.floor(index / 4)) % 2 === 0
              ? "bg-gray-400 border-gray-700"
              : "bg-gray-200 border-gray-700"
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

function calculateWinner(board) {
  // Check rows
  for (let i = 0; i < 4; i++) {
    if (
      board[i * 4] === board[i * 4 + 1] &&
      board[i * 4 + 1] === board[i * 4 + 2] &&
      board[i * 4 + 2] === board[i * 4 + 3] &&
      board[i * 4] !== null
    ) {
      return [board[i * 4], [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3]];
    }
  }

  // Check columns
  for (let i = 0; i < 4; i++) {
    if (
      board[i] === board[i + 4] &&
      board[i + 4] === board[i + 8] &&
      board[i + 8] === board[i + 12] &&
      board[i] !== null
    ) {
      return [board[i], [i, i + 4, i + 8, i + 12]];
    }
  }

  // Check top-left to bottom-right diagonal
  if (
    board[0] === board[5] &&
    board[5] === board[10] &&
    board[10] === board[15] &&
    board[0] !== null
  ) {
    return [board[0], [0, 5, 10, 15]];
  }

  // Check top-right to bottom-left diagonal
  if (
    board[3] === board[6] &&
    board[6] === board[9] &&
    board[9] === board[12] &&
    board[3] !== null
  ) {
    return [board[3], [3, 6, 9, 12]];
  }

  return [null, []];
}

/* const calculateWinner = (squares) => {
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
 */
/* 
<span class="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="-ml-1 mr-1.5 h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>

  <p class="text-sm whitespace-nowrap">Euro</p>

  <button class="-mr-1 ml-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-600 transition hover:text-purple-700">
    <span class="sr-only">Remove badge</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-3 h-3"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</span>;
 */
