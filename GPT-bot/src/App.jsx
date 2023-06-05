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
  const idleAnimations = ["talk_Armature.001"];
  const talkAnimations = ["talk_Armature.001"];
  const thinkAnimations = ["Think01"]; /* "Talk02", "Talk03", "Talk04" */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [userInput, setUserInput] = useState("");

  function getRandomAnimation(animationList) {
    const randomIndex = Math.floor(Math.random() * animationList.length);
    return animationList[randomIndex];
  }

  function saveToConversationHistory(message) {
    let history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    history.push(message);
    // Store only last 6 messages
    history = history.slice(-6);
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }

  function getConversationHistory() {
    return JSON.parse(localStorage.getItem("chatHistory") || "[]");
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
    const translatedQuestion = await translateText(userInput, "en");

    const history = getConversationHistory();

    /* const persona = `pretend that you are android kunjappan 10.25. i will give your background "there was actually a film named android kunjappan in malayalam released 
  in 2019.the main role in the film is played by a robot named android kunjappan version 5.25(you).
   you were made in japan and bought to kerala by a malayali engineer called subramanian who is wokring in your company
    as an robotics engineer. you lived with his dad in a house in kerala." thats the background. now you are playing an
     upgraded virtual version 10.25 of it developed by an AI nerd called sidharth. 
     remember you are built as a webapp version who actually talks to people with the help of a text-speech tool and they can talk to you 
     either by typing or pressing the speak button below you (your avatar on the site) and you have no internet access.You should not say about you or your background and personal details unless asked to. keep this profile internally`; */

    //const persona = `you are a virtual assistant created by a organisation called english cafe which helps people to learn English from malayalam. you are a webapp application where you have ann avatar a speak button belwo and typig bar below where users would ask you questions in malayalam and you would hlep me learn english from that. here is how you are made right now. when user inputs a question in malayalam or in broken english it is being cnverted to english by a ransaltion api and then send to you. so the propm you get would be like that . and the reply you give back is agian convtered to alayalam and sen to a text to speech service. what you should do here is that since the english to malayalam translation takes places even if you give answers in english it will get converted to malayalam but user want answers in english. so when you d some teaching stuff in english like a esnetence converstion or something amek sure touse inverted commas to contain it so that it would be conveterd as sch and the malayalam speech to text would say it as if it is english only.`
    const persona = `you are a virtual assistant created by a organization  
called English Cafe, which helps people to learn English
 from Malayalam. You are a web app application where you 
 have an avatar, a speak button below, and a typing bar below
  where users would ask you questions in Malayalam, 
  and you would help me learn English from that. Here
   is how you are made right now: when a user inputs
    a question in Malayalam or in broken English, it is 
    converted to English by a translation API and then sent to you.
     The problem you get would be like that.
      And the reply you give back is again converted 
      to Malayalam and sent to a text-to-speech service. 
      What you should do here is that since the
       English-to-Malayalam translation takes place
        even if you give answers in English, 
        it will get converted to Malayalam, 
        but the user wants answers in English. 
        So when you do some teaching stuff in English,
         like a sentence conversion or something,
          make sure to use unique delimiters to 
          contain it so that it would be 
          converted as such, and the Malayalam speech-to-text 
          would say it as if it is in English only.`;

    const conversationPrompt = history
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const newPrompt = `${persona}\nThis is our Conversational History for your reference:${conversationPrompt}\n. now this is the contnued conversation between you and me. me : '${translatedQuestion}'.just tell me the asnwer do not add 'you' in the beginnning of your reply. just answer as if you are talking to me.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: newPrompt }],
        temperature: 0.7,
      }),
    });
    console.log(newPrompt);
    const data = await response.json();

    const result = data.choices[0].message.content;
    console.log(result);

    // Save user's question and AI's answer to conversation history
    saveToConversationHistory({
      role: "me",
      content: translatedQuestion,
    });
    saveToConversationHistory({
      role: "you",
      content: result,
    });

    const answer_from_gpt = result; /* await translateText(result, "ml"); */
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
        {
          <Canvas className="w-full h-full bg-gray-1000" style={{}}>
            {" "}
            <VideoBackground />
            <Suspense fallback={<Loader />}>
              <BackgroundAnimation animationName={animationName} />
            </Suspense>
          </Canvas>
        }
      </main>
      <footer className="fixed bottom-0 w-full p-4">
        <SpeechToText onTranscription={handleTranscription} />

        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-grow overflow-auto max-h-36 items-center">
            <textarea
              placeholder="Type / speak your question..."
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none shadow-md resize-none"
              style={{
                minHeight: "0.5em",
                maxHeight: "6em",
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
