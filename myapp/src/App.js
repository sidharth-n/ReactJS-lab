import { useState } from "react";
import "./App.css";

const Person = () => {
  return (
    <>
      <h1>Name:sid</h1>
      <h2>Last name : crizz</h2>
      <h2>Age : 30</h2>
    </>
  );
};

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <>
        <h1>Counter</h1>
        <button
          onClick={() => {
            setCounter((prevCount) => prevCount - 1);
          }}
        >
          -
        </button>
        <h2>{counter} </h2>
        <button
          onClick={() => {
            setCounter((prevCount) => prevCount + 1);
          }}
        >
          +
        </button>
      </>
    </div>
  );
}

export default App;
