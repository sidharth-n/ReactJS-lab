import React, { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";

const App = () => {
  const sequences = [
    { start: 10, end: 15 },
    { start: 20, end: 25 },
    { start: 30, end: 35 },
    { start: 40, end: 45 },
    { start: 50, end: 55 },
  ]; // Your array of sequences
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [pausedTime, setPausedTime] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const video = document.querySelector("video");
    if (video) {
      video.currentTime = pausedTime || sequences[currentSequenceIndex].start;
      video.play();

      video.ontimeupdate = () => {
        if (video.currentTime >= sequences[currentSequenceIndex].end) {
          video.pause();
          video.ontimeupdate = null;
          if (currentSequenceIndex + 1 < sequences.length) {
            setCurrentSequenceIndex(currentSequenceIndex + 1);
            setPausedTime(null);
          } else {
            setIsFinished(true);
            setIsActive(false);
          }
        }
      };
    }
  }, [currentSequenceIndex, isActive, isPaused, pausedTime]);

  useEffect(() => {
    const player = playerRef.current;
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      player.style.top = player.offsetTop - pos2 + "px";
      player.style.left = player.offsetLeft - pos1 + "px";
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    player.onmousedown = dragMouseDown;
    return () => {
      player.onmousedown = null;
    };
  }, []);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setIsFinished(false);
    setPausedTime(null);
  };

  const handlePauseResume = () => {
    const video = document.querySelector("video");
    if (isPaused) {
      video.play();
      setIsPaused(false);
    } else {
      setPausedTime(video.currentTime);
      video.pause();
      setIsPaused(true);
    }
  };

  const handleReplay = () => {
    setCurrentSequenceIndex(0);
    setIsActive(true);
    setIsPaused(false);
    setIsFinished(false);
    setPausedTime(null);
  };

  return (
    <div className={styles.container} ref={playerRef}>
      <h2>Summary</h2>
      {!isActive && !isFinished && <button onClick={handleStart}>Start</button>}
      {isActive && !isPaused && (
        <button onClick={handlePauseResume}>Pause</button>
      )}
      {isPaused && <button onClick={handlePauseResume}>Resume</button>}
      {isFinished && <button onClick={handleReplay}>Replay</button>}
    </div>
  );
};

export default App;
