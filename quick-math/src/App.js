import { useState, useEffect } from "react";
function App() {
  const [answer, setAnswer] = useState(196);
  const [input, setInput] = useState(0);
  const [question, setQuestion] = useState([]);
  function handleClick(num) {
    if (input == null) {
      setInput(num);
      return;
    }
    if (input.toString().length < answer.toString().length) {
      setInput((prevInput) => +`${prevInput.toString()}${num.toString()}`);
    }
  }

  useEffect(() => {
    if (input == answer) {
      alert("right");
    }
  }, [input]);

  return (
    <div className=" flex flex-col items-center justify-center mt-16 ">
      <div className="border">
        <div className="text-white font-bold  border border-black border-solid py-2 px-2 bg-gray-200 mb-2">
          {question}
        </div>
        <div className="text-white font-bold  border border-black border-solid py-2 px-2 bg-gray-200 mb-2">
          {input}
        </div>
        <NumberKeypad onNumberClick={handleClick} />
      </div>
    </div>
  );
}

export default App;

const NumberKeypad = ({ onNumberClick, submit }) => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  return (
    <div className="grid grid-cols-3 gap-0 items-center">
      {grid.map((number, index) => (
        <button
          onClick={() => onNumberClick(index + 1)}
          className=" w-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-solid border-white border"
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onNumberClick(0)}
        className="w-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-solid border-white border"
      >
        0
      </button>
      <button
        onClick={() => submit}
        className=" bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2 border-solid border-white border"
      >
        submit
      </button>
    </div>
  );
};

function generateMathQuestion() {
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let num1, num2, answer;

  switch (operator) {
    case "+":
      num1 = Math.floor(Math.random() * 100);
      num2 = Math.floor(Math.random() * 100);
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 100);
      num2 = Math.floor(Math.random() * num1);
      answer = num1 - num2;
      break;
    case "*":
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
      answer = num1 * num2;
      break;
    case "/":
      answer = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      num1 = answer * num2;
      break;
    default:
      break;
  }

  return {
    question: `${num1} ${operator} ${num2}`,
    answer: answer,
  };
}
