import { useState, useEffect } from "react";
import "./App.css";

const apiKey = "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";
const maxTokens = 1000;
const temperature = 0;

function App() {
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");

  async function callApi(question) {
    setQuestion(question);
    const response = await fetch(
      `https://api.openai.com/v1/engines/text-davinci-003/completions`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `${question}`,
          max_tokens: maxTokens,
          temperature: temperature,
        }),
      }
    );

    const json = await response.json();
    return json.choices[0].text;
  }

  function handleClick() {
    setResponse("");
    callApi(input).then((res) => setResponse(res));
    setInput("");
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <div className="top">GuPiTer Demo</div>
      <div className="question">👨‍🔬 : {question}</div>
      <div className="answer">🤖 : {response}</div>
      <div className="bottom">
        <input
          className="ask-box"
          placeholder="ask me"
          onChange={handleChange}
          value={input}
        ></input>
        <button className="submit" onClick={handleClick}>
          Ask
        </button>
      </div>
    </div>
  );
}

export default App;
