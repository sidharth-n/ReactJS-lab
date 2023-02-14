import { useState, useEffect } from "react";

function App() {
  const [answer, setAnswer] = useState(196);
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState([]);
  const [answerStatus, setAnswerStatus] = useState("pending");
  const [seconds, setSeconds] = useState(0);
  const [isGameOn, setIsGameOn] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [showBoard, setShowBoard] = useState(true);

  function handleClick(num) {
    if (input === "") {
      setInput(num);
      return;
    }
    if (input.toString().length < answer.toString().length) {
      setInput((prevInput) => +`${prevInput.toString()}${num.toString()}`);
      return;
    } else {
      setInput(num);
    }
  }

  useEffect(() => {
    if (input.toString().length === answer.toString().length) {
      if (input === answer) {
        console.log("right answer");
        setAnswerStatus("right");
        setRightAnswers((prev) => prev + 1);
        setTimeout(() => {
          newQuestion();
        }, 500);
      } else {
        console.log("wrong answer");
        setAnswerStatus("wrong");
        setTimeout(() => {
          newQuestion();
        }, 500);
      }
    }
  }, [input]);

  useEffect(() => {
    console.log("time is : " + seconds);
    if (seconds == 50) {
      setShowBoard(false);
      console.log("game over !");
      console.log("total questions : " + totalQuestions);
      console.log("right ans : " + rightAnswers);
    }
  }, [isGameOn]);

  function newQuestion() {
    const newQuestion = generateMathQuestion();
    setQuestion(newQuestion.question);
    setAnswer(newQuestion.answer);
    setInput("");
    setAnswerStatus("pending");
    setTotalQuestions((prev) => prev + 1);
  }

  function onStart() {
    newQuestion();
    setIsGameOn(true);
    setSeconds(0);
  }

  function reset() {
    setAnswer("");
    setInput("");
    setQuestion([]);
    setAnswerStatus("pending");
    setSeconds(0);
    setIsGameOn(false);
    setTotalQuestions(0);
    setRightAnswers(0);
    setShowBoard(true);
  }

  return (
    <div className=" flex flex-col items-center justify-center mt-16">
      <SecondsTimer
        isGameOn={isGameOn}
        setSeconds={setSeconds}
        setIsGameOn={setIsGameOn}
        seconds={seconds}
      />
      <div className={`border ${showBoard ? "flex" : "hidden"} flex-col`}>
        <div className="text-white font-bold  border border-black border-solid py-2 px-2 bg-gray-200 mb-2">
          {question}
        </div>
        <div
          className={`${
            answerStatus === "right"
              ? "text-lime-600"
              : answerStatus === "pending"
              ? "text-white"
              : "text-red-500"
          } font-bold  border border-black border-solid py-2 px-2 bg-gray-200 mb-2`}
        >
          {input}
        </div>
        <NumberKeypad onNumberClick={handleClick} />
        <button
          onClick={onStart}
          className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2 border-solid border-white border mt-4 self-center"
        >
          start
        </button>
      </div>
      <section
        class={`rounded-3xl shadow-2xl ${!showBoard ? "flex" : "hidden"} mx-4`}
      >
        <div class="p-8 text-center sm:p-12">
          <p class="text-sm font-semibold uppercase tracking-widest text-pink-500">
            Thank you for playing
          </p>

          <div class="mt-6 text-2xl font-bold">
            {`Your score : ${rightAnswers / totalQuestions}`}
          </div>

          <div
            onClick={() => reset()}
            className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
          >
            play again
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

function SecondsTimer(props) {
  useEffect(() => {
    let interval = null;
    if (props.isGameOn && props.seconds < 50) {
      interval = setInterval(() => {
        props.setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (props.seconds === 50) {
      props.setIsGameOn(false);
    }
    return () => clearInterval(interval);
  }, [props.isGameOn, props.seconds]);

  return (
    <div className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full col-span-2 border-solid border-white border mt-4 self-center">
      {props.seconds}
    </div>
  );
}

const NumberKeypad = ({ onNumberClick }) => {
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
