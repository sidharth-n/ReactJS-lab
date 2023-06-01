// SpeechToText.jsx
import React, { useState, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

function SpeechToText({ onTranscription }) {
  const [transcription, setTranscription] = useState("");
  const [listening, setListening] = useState(false);
  const [recognizer, setRecognizer] = useState(null);

  useEffect(() => {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      `${import.meta.env.VITE_SPEECH_API_KEY}`,
      "centralindia"
    );
    const newRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    newRecognizer.recognizing = (s, e) => {
      setTranscription(e.result.text);
      onTranscription(e.result.text); // Notify parent component of the transcription
    };

    setRecognizer(newRecognizer);

    /*   return () => {
      newRecognizer.stopContinuousRecognitionAsync();
    }; */
  }, [onTranscription]);

  const startListening = () => {
    recognizer.startContinuousRecognitionAsync();
    setListening(true);
  };

  const stopListening = () => {
    recognizer.stopContinuousRecognitionAsync();
    setListening(false);
  };

  return (
    <div>
      <h2>Real-Time Transcription:</h2>
      <p>{transcription}</p>
      <button onClick={startListening} disabled={listening}>
        Start
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop
      </button>
    </div>
  );
}

export default SpeechToText;
