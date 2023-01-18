import { useState } from "react";
import "./App.css";

function Square() {
  const [value, setvalue] = useState(null);

  function handleClick() {
    setvalue("x");
  }
  return (
    <button className="Button" onClick={handleClick}>
      {value}
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <>
        <h1>Tic-Tac-Toe</h1>
        <div className="rows">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="rows">
          <Square />
          <Square />
          <Square />
        </div>{" "}
        <div className="rows">
          <Square />
          <Square />
          <Square />
        </div>
      </>
    </div>
  );
}

export default App;
