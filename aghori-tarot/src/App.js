import { useState, useEffect } from "react";
import eyesClosed from "./eyesClosed.png";
import eyesOpen from "./eyesOpen.png";
import soundFile from "./chant.mp3";

import "./style.css";
function App() {
  const messages = [
    "Be fearless and pure; never waver in your determination or your dedication to the spiritual life.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "The mind is everything. What you think, you become.",
    "Let the beauty of what you love be what you do.",
    "Do not be attached to pleasure or pain; they are fleeting and impermanent.",
    "The secret of change is to focus all of your energy on building the new.",
    "Make the moment important, vital, and worth living.",
    "The greatest wealth is to live content with little.",
    "Don't see others doing better than you. Beat your own records every day. Because success is a fight between you and yourself.",
    "True happiness is achieved when the mind, body, and spirit are in harmony.",
    "Your true nature is pure consciousness. Don't get lost in temporary things.",
    "Live your life with purpose. Use your talents to serve the world.",
    "The heart is the hub of all sacred places. Go there and roam.",
    "Focus on the present moment. That's where your power is.",
    "The only way to do great work is to love what you do.",
    "Live every day like it's your last. Embrace each moment with joy.",
    "You are not just a drop in the ocean. You are the entire ocean in a drop.",
    "The purpose of life is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
    "Be kind, for everyone you meet is fighting a battle you know nothing about.",
    "The most important thing is to try and inspire people so that they can be great in whatever they want to do.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The only thing we have to fear is fear itself.",
    "Be the change that you wish to see in the world.",
    "It does not matter how slowly you go as long as you do not stop.",
    "You miss 100% of the shots you don't take.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "You can't cross the sea merely by standing and staring at the water.",
    "You may be disappointed if you fail, but you are doomed if you don't try.",
    "Don't let yesterday take up too much of today.",
    "In the middle of difficulty lies opportunity.",
    "A champion is someone who gets up when they can't.",
    "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got this.",
    "The best way out is always through.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "I have not failed. I've just found 10,000 ways that won't work.",
    "The only place where success comes before work is in the dictionary.",
    "Try not to become a person of success, but rather try to become a person of value.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "You are not a drop in the ocean. You are the entire ocean in a drop.",
    "The universe is not outside of you. Look inside yourself; everything that you want, you already are.",
    "Don't limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "We become what we think about.",
    "The only true wisdom is in knowing you know nothing.",
    "Our life is what our thoughts make it.",
    "The journey of a thousand miles begins with one step.",
    "You can't stop the waves, but you can learn to surf.",
    "Your work is to discover your world and then with all your heart give yourself to it.",
    "You are the sky. Everything else is just the weather.",
    "It is better to live your own destiny imperfectly than to live an imitation of somebody else's life with perfection.",
    "The best and most beautiful things in the world cannot be seen or even touched, they must be felt with the heart.",
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    "The greatest wealth is to live content with little.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "What you think, you become. What you feel, you attract. What you imagine, you create.",
    "You are never too old to set another goal or to dream a new dream.",
    "The purpose of our lives is to be happy.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "You cannot step into the same river twice.",
    "Change your thoughts and you change your world.",
    "The only person you are destined to become is the person you decide to be.",
    "A ship is always safe at the shore, but that is not what it is built for.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "The most wasted of all days is one without laughter.",
    "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    "Be the change you want to see in the world.",
    "You are never too old to set another goal or to dream a new dream.",
    "Believe you can and you're halfway there.",
    "The power of imagination makes us infinite.",
    "When you arise in the morning, think of what a precious privilege it is to be alive.",
    "It does not matter how slowly you go as long as you do not stop.",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "Happiness is not something you postpone for the future; it is something you design for the present.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "The secret of getting ahead is getting started.",
    "To live is the rarest thing in the world. Most people exist, that is all.",
    "The best way to predict your future is to create it.",
    "Don't judge each day by the harvest you reap but by the seeds that you plant.",
  ];

  function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  const totalChant = 1;
  const [chantCount, setChantCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [image, setImage] = useState(eyesClosed);
  const [isPoojaDone, setisPoojaDone] = useState(false);
  const [glow, setGlow] = useState(false);
  const [audioEnded, setAudioEnded] = useState(true);
  const [notiClosed, setNotiClosed] = useState(false);

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
        setisPoojaDone(true);
        setGlow(true);
      };
    }
  };

  const handleCloseClick = () => {
    setNotiClosed(true);
  };

  useEffect(() => {
    if (isPoojaDone) {
      setTimeout(() => {
        setImage(eyesOpen);
        setTimeout(() => {
          setShowMessage(true);
        }, 3000);
      }, 2000);
    }
  }, [isPoojaDone]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-black relative overflow-hidden">
      <div
        class={`flex flex-col items-center absolute rounded-lg bottom-24 justify-between gap-4 bg-gray-900 px-4 py-3 text-white mx-8 z-20 ${
          notiClosed ? "hidden" : "flex"
        }`}
      >
        <h1 className="text-2xl font-bold">Instruction</h1>
        <ul class="text-lg font-medium">
          <li>
            Click the chant button and chant along 5 times to receive a message
            from babaji.
          </li>
          <li>
            {" "}
            Note that the time you choose this, the mindset you have right now
            all influence what message you recieve.{" "}
          </li>
          <li className="font-bold mt-2 text-center text-2xl">
            Shambho mahadev
          </li>
        </ul>

        <button
          onClick={handleCloseClick}
          aria-label="Close"
          class="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20 absolute top-1 right-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      ;
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
        <p className="mt-24 text-white text-center text-2xl mx-8">
          {getRandomMessage()}
        </p>
      ) : (
        <button
          disabled={!audioEnded}
          onClick={handleChantClick}
          className={`mt-32 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
            audioEnded ? "flex" : "hidden"
          }`}
        >
          Chant
        </button>
      )}
    </div>
  );
}

export default App;

{
  /* <div class="flex items-center justify-between gap-4 bg-indigo-600 px-4 py-3 text-white">
  <p class="text-sm font-medium">
    Click the chant button and chant along 21 times.
  </p>

  <button
    aria-label="Close"
    class="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</div>;
 */
}
