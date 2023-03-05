import { useState, useEffect } from "react";
import eyesClosed from "./eyesClosed.png";
import eyesOpen from "./eyesOpen.png";
import soundFile from "./chant.mp3";
import "./style.css";
function App() {
  const totalChant = 4;
  const [chantCount, setChantCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [image, setImage] = useState(eyesClosed);
  const [isPoojaDone, setisPoojaDone] = useState(false);
  const [glow, setGlow] = useState(false);

  const handleChantClick = () => {
    if (chantCount < totalChant) {
      setChantCount(chantCount + 1);
    } else if (!isPoojaDone) {
      setisPoojaDone(true);
      setShowMessage(true);
      setGlow(true);
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
            isPoojaDone ? "opacity-100" : "animate-pulse opacity-100"
          }`}
        />
        {isPoojaDone && <div className="divine-light"></div>}
      </div>

      {showMessage ? (
        <p className="mt-32 text-white text-center text-2xl">Hello there!</p>
      ) : (
        <button
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
