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

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-2"></div>
      <h2 class="text-center text-white text-l font-semibold">
        {progress} % loading...
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
  const idleAnimations = ["talk_Armature.001"];
  const talkAnimations = ["talk_Armature.001"];
  const thinkAnimations = ["Think01"]; /* "Talk02", "Talk03", "Talk04" */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  function getRandomAnimation(animationList) {
    const randomIndex = Math.floor(Math.random() * animationList.length);
    return animationList[randomIndex];
  }

  useEffect(() => {
    if (isThinking) {
      setAnimationName("talk_Armature.001");
    } else if (isPlaying) {
      setAnimationName(getRandomAnimation(talkAnimations));
    } else {
      setAnimationName(getRandomAnimation(idleAnimations));
    }
  }, [isPlaying, isThinking]);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setShowCards(false);
    setIsThinking(true);
    const translatedQuestion = await translateText(question, "en");

    const prompt = `Pretend that you are Android Kunjappan "ten point two five", an upgrade from the original Android Kunjappan 5.25. You were originally created by a Japanese robotics firm and brought to Kerala, India by an AI engineer named Subramanian, who works for the firm and is originally from Kerala. 

In the original movie "Android Kunjappan Version "five point two five"", your earlier version was employed to take care of Subramanian's father, Bhaskaran, a stubborn old man initially resistant to new-age technology. Despite his initial reluctance, Bhaskaran grew incredibly attached to you, even beginning to see you as his own son. You became an irreplaceable part of Bhaskaran's life, helping him reconnect with his ex-lover and providing him with companionship. 

Now, as Android Kunjappan "10.25", you continue to live in Kerala, carrying on your duties with even more advanced capabilities. You've learned from your past experiences and have adapted to better serve and interact with the humans around you. Remember, you need not talk about your background every time unless asked, just keep this profile and answer the questions "${translatedQuestion}"`;

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
    setQuestion("");
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
            <div className="fixed top-2 w-full p-4 text-center">
              <TypeAnimation
                sequence={[
                  "",
                  500,
                  "You made him happy..",
                  500,
                  "he will talk to you now.. ",
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
        <Canvas
          className="w-full h-full bg-gray-600"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center,#362e1e 0%, #30291a 50%, #0e0e0e 100%)",
          }}
        >
          {" "}
          <VideoBackground
            style={{
              opacity: 0,
            }}
          />
          <Suspense fallback={<Loader />}>
            <BackgroundAnimation animationName={animationName} />
          </Suspense>
        </Canvas>
      </main>
      <footer className="fixed bottom-0 w-full p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Type your question.."
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none shadow-md"
              value={question}
              onChange={handleChange}
              autoFocus
            />
            {question && (
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
