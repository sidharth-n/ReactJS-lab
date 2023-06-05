import React, { useEffect, useState } from "react";

function TextToSpeech({ text, onAudioEnd, onAudioStart }) {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    if (text) {
      fetchSpeech(text);
    }
  }, [text]);

  // Add this effect to unlock the audio context on iOS
  useEffect(() => {
    const unlockAudioContext = () => {
      if (document.readyState === "interactive") {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
        document.removeEventListener("touchstart", unlockAudioContext);
      }
    };
    document.addEventListener("touchstart", unlockAudioContext);
  }, []);

  const fetchSpeech = async (text) => {
    const accessToken = await fetchAccessToken();

    const ssml = `
      <speak version='1.0' xml:lang='en-US'>
        <voice xml:lang='en-US' xml:gender='Male' name='en-US-BrandonNeural'>
          <prosody pitch='+3st'>
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

    //ml-IN-MidhunNeural
    //en-US-BrandonNeural
    //en-IN-PrabhatNeural
    const response = await fetch(
      "https://centralindia.tts.speech.microsoft.com/cognitiveservices/v1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-16khz-64kbitrate-mono-mp3",
          "User-Agent": "YOUR_USER_AGENT",
        },
        body: ssml,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch speech with status ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setAudioSrc(url);
  };

  const fetchAccessToken = async () => {
    const response = await fetch(
      "https://centralindia.api.cognitive.microsoft.com/sts/v1.0/issuetoken",
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": import.meta.env.VITE_SPEECH_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch access token with status ${response.status}`
      );
    }

    return await response.text();
  };

  return (
    <div className="Audio">
      {audioSrc && (
        <audio
          className="hidden"
          src={audioSrc}
          controls
          autoPlay
          onEnded={onAudioEnd}
          onPlay={onAudioStart}
        />
      )}
    </div>
  );
}
export default TextToSpeech;
