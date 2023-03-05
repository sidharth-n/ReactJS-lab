import { useState, useEffect } from "react";
import eyesClosed from "./eyesClosed.png";
import eyesOpen from "./eyesOpen.png";
import soundFile from "./chant.mp3";
import "./style.css";
function App() {
  const totalChant = 2;
  const [chantCount, setChantCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [image, setImage] = useState(eyesClosed);
  const [isPoojaDone, setisPoojaDone] = useState(false);
  const [glow, setGlow] = useState(false);
  const [audioEnded, setAudioEnded] = useState(true);

  const handleChantClick = () => {
    if (chantCount < totalChant - 1) {
      setAudioEnded(false);
      setChantCount(chantCount + 1);
      const audio = new Audio(soundFile);
      audio.play();
      audio.onended = () => {
        setAudioEnded(true);
      };
    } else if (!isPoojaDone) {
      setAudioEnded(false);
      const audio = new Audio(soundFile);
      audio.play();
      audio.onended = () => {
        setAudioEnded(true);
        setisPoojaDone(true);
        setShowMessage(true);
        setGlow(true);
      };
    }
  };

  useEffect(() => {
    if (isPoojaDone) {
      setTimeout(() => {
        setImage(eyesOpen);
      }, 2000);
    }
  }, [isPoojaDone]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-black">
      <div className={`relative mb-4 mt-8 ${glow ? "glow" : ""}`}>
        <img
          src={image}
          alt="Aghori"
          className={`aghori w-[300px] h-[300px] rounded object-cover ${
            isPoojaDone ? "opacity-100" : "animate-pulse opacity-120"
          }`}
        />
        {isPoojaDone && <div className="divine-light"></div>}
      </div>

      {showMessage ? (
        <p className="mt-32 text-white text-center text-2xl mx-8">
          Lord shiva is always there for you. be happy and kind always
        </p>
      ) : (
        <button
          disabled={!audioEnded}
          onClick={handleChantClick}
          className="mt-32 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Chant
        </button>
      )}
    </div>
  );
}

export default App;
