import React, { useState, useEffect } from "react";

const App = () => {
  const timestamps = [10, 20, 30, 40, 50]; // Your array of timestamps
  const [currentTimestampIndex, setCurrentTimestampIndex] = useState(0);

  useEffect(() => {
    const video = document.querySelector("video");
    if (video) {
      video.currentTime = timestamps[currentTimestampIndex];
      video.play();

      // After 5 seconds, pause the video and set the next timestamp
      const timer = setTimeout(() => {
        video.pause();
        setCurrentTimestampIndex(
          (currentTimestampIndex + 1) % timestamps.length
        );
      }, 5000);

      // Clean up the timeout when the component unmounts or the timestamp index changes
      return () => clearTimeout(timer);
    }
  }, [currentTimestampIndex]);

  const handleClick = () => {
    setCurrentTimestampIndex(0); // Start from the first timestamp when the button is clicked
  };

  return (
    <button
      onClick={handleClick}
      style={{ position: "absolute", top: "100px", left: "200px" }}
    >
      Quicker
    </button>
  );
};

export default App;
