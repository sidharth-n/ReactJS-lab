import React, { useEffect, useState } from "react";

function TextToSpeech({ text, onAudioEnd, onAudioStart }) {
  // Don't forget to destructure the 'text' prop here.
  const [audioSrc, setAudioSrc] = useState(null);
  useEffect(() => {
    // call fetchSpeech function with 'text' prop instead of hardcoded string
    if (text) {
      // Only fetch speech if 'text' is not empty.
      fetchSpeech(text);
    }
  }, [text]); // Add 'text' as dependency to trigger useEffect whenever 'text' changes

  const fetchSpeech = async (text) => {
    const accessToken = await fetchAccessToken();

    const ssml = `
  <speak version='1.0' xml:lang='en-US'>
    <voice xml:lang='en-US' xml:gender='Male' name='ml-IN-MidhunNeural'>
      <prosody pitch='+3st'>
        ${text}
      </prosody>
    </voice>
  </speak>
`;

    //ml-IN-SobhanaNeural
    //en-US-AnaNeural
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
