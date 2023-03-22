import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const quizData = {
    questions: [
      {
        question: "What is the unit circle?",
        answers: [
          { text: "A circle with a radius of 1", correct: true },
          { text: "A circle with a radius of 2", correct: false },
          { text: "A circle with a radius of 0.5", correct: false },
          { text: "A circle with a radius of 10", correct: false },
        ],
      },
      {
        question:
          "What is the value of the hypotenuse of a triangle in the unit circle?",
        answers: [
          { text: "1", correct: true },
          { text: "2", correct: false },
          { text: "0.5", correct: false },
          { text: "10", correct: false },
        ],
      },
      {
        question: "What is the sine of an angle in the unit circle?",
        answers: [
          {
            text: "The y-coordinate of the corresponding point",
            correct: true,
          },
          {
            text: "The x-coordinate of the corresponding point",
            correct: false,
          },
          { text: "The tangent of the corresponding angle", correct: false },
          {
            text: "The inverse cosine of the corresponding angle",
            correct: false,
          },
        ],
      },
      {
        question: "What is the tangent of an angle in the unit circle?",
        answers: [
          {
            text: "The y-coordinate divided by the x-coordinate",
            correct: true,
          },
          {
            text: "The x-coordinate divided by the y-coordinate",
            correct: false,
          },
          { text: "The cosine of the corresponding angle", correct: false },
          {
            text: "The inverse sine of the corresponding angle",
            correct: false,
          },
        ],
      },
      {
        question: "What is the secant of an angle in the unit circle?",
        answers: [
          { text: "The reciprocal of the x-coordinate", correct: true },
          { text: "The reciprocal of the y-coordinate", correct: false },
          {
            text: "The reciprocal of the tangent of the corresponding angle",
            correct: false,
          },
          {
            text: "The reciprocal of the sine of the corresponding angle",
            correct: false,
          },
        ],
      },
    ],
  };

  const totalQuestions = 5;
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [optionColor, setOptionColor] = useState("#eeeded");
  const [selectedIndex, setSelectedIndex] = useState(-2);
  const [isgameDone, setIsGameDone] = useState(false);
  // Load the current question and answer options based on the current question number
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const trParam = searchParams.get("tr");
    console.log("params is: " + trParam);
  }, [location.search]);

  useEffect(() => {
    if (questionNumber <= totalQuestions) {
      const currentQuestion = quizData.questions[questionNumber - 1];
      setQuestion(currentQuestion.question);
      setOptions(currentQuestion.answers);
    }
  }, [questionNumber]);

  const handleAnswerClick = (selectedOption, index) => {
    setSelectedIndex(index);
    if (questionNumber >= totalQuestions) {
      const isCorrect = selectedOption.correct;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      console.log(score);
      setIsGameDone(true);
      return;
    }
    // Check if the selected option is correct
    const isCorrect = selectedOption.correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);

      setOptionColor("bg-green-500");
    } else setOptionColor("bg-red-500");
    // Update the question number and load the next question
    setTimeout(() => {
      setQuestionNumber((prev) => prev + 1);

      setOptionColor("#eeeded");
    }, 500);

    // TODO: Handle the selected answer being correct or incorrect
  };
  function reset() {
    setQuestion("");
    setOptionColor("#eeeded");
    setIsGameDone(false);
    setSelectedIndex(-2);
    setScore(0);
    setQuestionNumber(1);
    setOptions([]);
  }

  return (
    <div className="main-container mx-auto  p-8  relative ">
      <div className={` ${!isgameDone ? "flex" : "hidden"} flex flex-col`}>
        <div className="font-medium text-xl absolute top-5 right-10 text-gray-800">
          {questionNumber}/{quizData.questions.length}
        </div>
        <div className="question text-xl mx-auto mt-10 ">{question}</div>
        <div className="answers flex flex-col gap-4 mt-10 mb-8">
          {options.map((option, index) => (
            <div
              key={index}
              className={`options ${index == selectedIndex ? optionColor : ""}`}
              onClick={() => handleAnswerClick(option, index)}
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>
      <section
        class={`rounded-3xl shadow-2xl ${
          isgameDone ? "flex" : "hidden"
        }  bg-white rounded-2xl`}
      >
        <div class="p-8 mx-auto">
          <p class="text-sm font-semibold uppercase tracking-widest text-pink-500">
            Thanks for Trying
          </p>

          <h2 class="mt-6 text-3xl font-bold text-black">
            {`You Scored ${score}/${totalQuestions}`}
          </h2>

          <div
            class="mt-8 cursor-pointer inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
            onClick={reset}
          >
            Try Again
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
