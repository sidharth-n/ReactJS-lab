import { useState, useEffect } from "react";

function App() {
  const gameTime = 25;
  const [answer, setAnswer] = useState(null);
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("pending");
  const [seconds, setSeconds] = useState(gameTime);
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
    if (seconds == 0) {
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
  }

  function reset() {
    setAnswer("");
    setInput("");
    setQuestion(null);
    setAnswerStatus("pending");
    setSeconds(gameTime);
    setIsGameOn(false);
    setTotalQuestions(0);
    setRightAnswers(0);
    setShowBoard(true);
  }

  return (
    <div className=" flex flex-col  items-center justify-center mt-12">
      <div className={`border ${showBoard ? "flex" : "hidden"} flex-col`}>
        <div className="flex items-center text-4xl">
          <div className="text-black font-bold  py-2 px-2 bg-gray-200 grow h-16">
            {question ? question + "  ?" : "press start"}
          </div>
          <div
            className={`${
              answerStatus === "right"
                ? "text-lime-600"
                : answerStatus === "pending"
                ? "text-black"
                : "text-red-500"
            } font-bold   py-2 px-2 bg-gray-200 w-20 h-16 `}
          >
            {input}
          </div>
        </div>
        <SecondsTimer
          isGameOn={isGameOn}
          setSeconds={setSeconds}
          setIsGameOn={setIsGameOn}
          seconds={seconds}
        />
        <NumberKeypad onNumberClick={handleClick} Onchange={question} />
        <button
          onClick={onStart}
          className={` bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full col-span-2 border-solid border-white border mt-4 self-center ${
            seconds == gameTime ? "flex" : "hidden"
          }`}
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
          <div class=" mt-6 flex items-center justify-center rounded-xl border-4 border-black bg-pink-100 px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50">
            Your Score:
            <span className="font-bold px-1">
              {(
                +(rightAnswers / totalQuestions).toFixed(2) +
                +(totalQuestions / gameTime).toFixed(2)
              ).toFixed(3)}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <li class="mt-6 text-1xl ">
              {`Decision making : ${(totalQuestions / gameTime).toFixed(2)}`}
            </li>
            <li class=" text-1xl ">
              {`Accuracy : ${(rightAnswers / totalQuestions).toFixed(2)}`}
            </li>
            <li class=" text-1xl ">{`No of questions : ${totalQuestions}`}</li>
            <li class=" text-1xl  ">{`Correct answers : ${rightAnswers}`}</li>
            <li class=" text-1xl">{`Total time : ${gameTime} Seconds`}</li>
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
    if (props.isGameOn && props.seconds > 0) {
      interval = setInterval(() => {
        props.setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (props.seconds === 0) {
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

const NumberKeypad = ({ onNumberClick, Onchange }) => {
  function getKeypad() {
    const arr = [];

    // fill array with numbers from 0 to 9
    for (let i = 0; i < 10; i++) {
      arr.push(i);
    }

    // shuffle the array using Fisher-Yates algorithm
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    setGrid(getKeypad());
  }, []);

  useEffect(() => {
    setGrid(getKeypad());
  }, [Onchange]);

  return (
    <div className="grid grid-cols-3 gap-0 items-center mt-48">
      {grid.map((number, index) => (
        <button
          key={index}
          onClick={() => onNumberClick(number)}
          className=" w-28 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded border-solid border-white border"
        >
          {number}
        </button>
      ))}
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
