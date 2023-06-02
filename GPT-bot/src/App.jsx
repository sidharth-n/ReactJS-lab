import { useState, useEffect, useRef } from "react";
import SendIcon from "./SendIcon";
import CloseIcon from "./CloseIcon";
import { TypeAnimation } from "react-type-animation";
import TextToSpeech from "././components/TextToSpeech";
import { BackgroundAnimation } from "././components/3dCanvas";
import { Canvas } from "react-three-fiber";
import { Suspense } from "react";
import { Html, useProgress } from "@react-three/drei";
import { translateText } from "././components/TranslationService";
import VideoBackground from "././components/VideoBackground";
import SpeechToText from "././components/SpeechToText";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-2"></div>
      <h2 class="text-center text-white text-l font-semibold">
        {progress.toFixed(0)} % loading...
      </h2>
      {/*    <p class="w-1/3 mx-auto text-white text-sm text-center">
        Please wait while we load the assets.
      </p> */}
    </Html>
  );
}

function App() {
  const [question, setQuestion] = useState("");
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const quoteContainerRef = useRef(null);
  const [audioResponse, setAudioResponse] = useState("");
  const [animationName, setAnimationName] = useState("Freeze");
  const idleAnimations = ["mixamo.com"];
  const talkAnimations = ["mixamo.com"];
  const thinkAnimations = ["Think01"]; /* "Talk02", "Talk03", "Talk04" */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [userInput, setUserInput] = useState("");

  function getRandomAnimation(animationList) {
    const randomIndex = Math.floor(Math.random() * animationList.length);
    return animationList[randomIndex];
  }

  useEffect(() => {
    if (isThinking) {
      setAnimationName("mixamo.com");
    } else if (isPlaying) {
      setAnimationName(getRandomAnimation(talkAnimations));
    } else {
      setAnimationName(getRandomAnimation(idleAnimations));
    }
  }, [isPlaying, isThinking]);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleTranscription = (text) => {
    setTranscription(text);
  };

  useEffect(() => {
    setUserInput(transcription);
  }, [transcription]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setShowCards(false);
    setIsThinking(true);
    const translatedQuestion = await translateText(userInput, "en"); // Use the edited transcription as the question

    const prompt = `prtend that you are android kunjappan 10.25. i will give your background "there was actually a film named android kunjappan in malayalam released in 2019.the main role in the film is played by a robot named android kunjappan version 5.25(you). you were made in japan and bought to kerala by a malayali engineer called subramanian who is wokring in yur company as an robotics engineer. you lived with his dad in a house in kerala." thats the backround. now you are playing an upgraded version of it which is version 10.25 YOu need not say about you every time unless asked. keep this profile and answer the questions "${translatedQuestion}"`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const result = data.choices[0].message.content;
    console.log(result);
    const answer_from_gpt = await translateText(result, "ml");
    setIsLoading(false);
    setAudioResponse(answer_from_gpt);
  };

  const handleClear = () => {
    setUserInput("");
  };

  useEffect(() => {
    // Disable body scrolling on mobile
    document.body.style.overflow = "hidden";

    // Re-enable body scrolling when component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <main className="flex-1 overflow-auto p-0 mt-2 mb-24">
        <div className="quote-container flex justify-center items-center">
          {isLoading ? (
            <div
              className="text-center fixed top-2 font-bold bg-black p-2 rounded"
              style={{ zIndex: 9999 }}
            >
              <TypeAnimation
                sequence={[
                  "kunjappan is thinking...",
                  500,
                  "please wait...",
                  500,
                  "this is a test version only...",
                  500,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: "1em", display: "inline-block" }}
              />
            </div>
          ) : (
            audioResponse && (
              <TextToSpeech
                text={audioResponse}
                onAudioStart={() => {
                  setIsPlaying(true);
                  setIsThinking(false);
                }}
                onAudioEnd={() => setIsPlaying(false)}
              />
            )
          )}
        </div>
        {/*    <Canvas className="w-full h-full bg-gray-1000" style={{}}>
          {" "}
          <VideoBackground />
          <Suspense fallback={<Loader />}>
            <BackgroundAnimation animationName={animationName} />
          </Suspense>
        </Canvas> */}
      </main>
      <footer className="fixed bottom-0 w-full p-4">
        <SpeechToText onTranscription={handleTranscription} />

        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-grow overflow-auto max-h-24 align-center">
            <textarea
              placeholder="Type your question.."
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none shadow-md resize-none h-auto"
              style={{
                minHeight: "1em",
                maxHeight: "5em",
                height: "auto",
                overflowY: "auto",
              }}
              value={userInput}
              onChange={handleChange}
              autoFocus
              readOnly={false}
            />
            {userInput && (
              <button
                type="button"
                className="absolute top-1 right-2 text-gray-500"
                onClick={handleClear}
              >
                <CloseIcon />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="ml-4 bg-gray-900 text-white p-3 rounded-full shadow-md"
          >
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;

// App.jsx
// App.jsx
/* import React, { useState } from "react";
import TextToSpeech from "./TextToSpeech";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [textToSpeak, setTextToSpeak] = useState("");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSend = () => {
    setTextToSpeak(inputText);
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter text here"
      />
      <button onClick={handleSend}>Send</button>
      <TextToSpeech text={textToSpeak} />
    </div>
  );
};

export default App; */

// App.jsx
// App.jsx
/* import React, { useState } from "react";
import TextToSpeech from "./TextToSpeech";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [textToSpeak, setTextToSpeak] = useState("");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSend = () => {
    setTextToSpeak(inputText);
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter text here"
      />
      <button onClick={handleSend}>Send</button>
      <TextToSpeech text={textToSpeak} />
    </div>
  );
};

export default App; */
