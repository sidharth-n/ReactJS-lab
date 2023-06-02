import React, { useState, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

function SpeechToText({ onTranscription }) {
  const [transcription, setTranscription] = useState("");
  const [listening, setListening] = useState(false);
  const [recognizer, setRecognizer] = useState(null);
  const [partialTranscriptions, setPartialTranscriptions] = useState([]);

  useEffect(() => {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      `${import.meta.env.VITE_SPEECH_API_KEY}`,
      "centralindia"
    );
    const newRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    newRecognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        setPartialTranscriptions([...partialTranscriptions, e.result.text]);
      }
    };

    setRecognizer(newRecognizer);

    return () => {
      if (newRecognizer) {
        newRecognizer.stopContinuousRecognitionAsync();
        newRecognizer.close();
      }
    };
  }, []);

  useEffect(() => {
    setTranscription(partialTranscriptions.join(" "));
    onTranscription(partialTranscriptions.join(" "));
  }, [partialTranscriptions, onTranscription]);

  const startListening = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // Microphone access is granted, start recognition
        recognizer.startContinuousRecognitionAsync();
        setPartialTranscriptions([]);
        setListening(true);
      })
      .catch((err) => {
        // Handle error - user denied microphone access, or other error occurred
        console.error(err);
      });
  };

  const stopListening = () => {
    recognizer.stopContinuousRecognitionAsync();
    setListening(false);
  };

  const handleStart = () => {
    startListening();
  };

  const handleEnd = () => {
    stopListening();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="space-x-4">
        {listening ? (
          <div
            className="p-4 bg-red-500 flex align-center rounded-full mb-6"
            onMouseUp={handleEnd}
            onTouchEnd={handleEnd}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-octagon"
            >
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            </svg>
          </div>
        ) : (
          <div
            className="p-4 bg-green-500 flex align-center rounded-full mb-6"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mic"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeechToText;
