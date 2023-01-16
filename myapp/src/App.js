import logo from "./logo.svg";
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
  const name = "sid";
  return (
    <div className="App">
      <>
        <h1>Hello, {Math.pow(4, 8)}</h1>
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
      </>
    </div>
  );
}

export default App;
