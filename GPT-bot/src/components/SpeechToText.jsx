import { ReactMic } from "react-mic";
import { useState, useRef } from "react";
import ffmpeg from "ffmpeg.js/ffmpeg-mp4";

export default function Example() {
  const [record, setRecord] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef(null);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log("Chunk of real-time data is: ", recordedBlob);
  };

  const convertAudioFormat = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = new Uint8Array(reader.result);
        const worker = new Worker(ffmpeg);
        worker.onmessage = (event) => {
          const { data } = event;
          if (data.type === "ffmpeg-work-done") {
            const outputBlob = new Blob([data.data.MEMFS[0].data], {
              type: "audio/mpeg",
            });
            resolve(outputBlob);
          }
        };
        worker.postMessage({
          type: "run",
          arguments: [
            "-i",
            "input.webm",
            "-c:a",
            "libmp3lame",
            "-q:a",
            "2",
            "output.mp3",
          ],
          MEMFS: [{ name: "input.webm", data: result }],
        });
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

  const onStop = async (recordedBlob) => {
    console.log("Recorded blob is: ", recordedBlob);
    setAudioUrl(URL.createObjectURL(recordedBlob.blob));

    const convertedBlob = await convertAudioFormat(recordedBlob.blob);
    const audioChunks = [convertedBlob];
    const transcription = await convertSpeechToText(audioChunks);
    console.log("Transcription: ", transcription);
  };

  const handlePlayback = () => {
    audioRef.current.play();
  };

  const convertSpeechToText = async (audioChunks) => {
    if (!audioChunks || audioChunks.length === 0) {
      console.error("No audio chunks to convert");
      return;
    }

    const blob = new Blob(audioChunks, { type: "audio/webm" }); // Change to a supported type
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("model", "whisper-1");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Response:", data);
    if (data && data.error) {
      console.error("API Error:", data.error.message);
      return "";
    } else if (data && data.transcriptions && data.transcriptions.length > 0) {
      return data.transcriptions[0].text;
    } else {
      console.error("Failed to retrieve transcription");
      return "";
    }
  };

  return (
    <div>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={startRecording} type="button">
        Start
      </button>
      <button onClick={stopRecording} type="button">
        Stop
      </button>
      {audioUrl && (
        <div>
          <audio ref={audioRef} src={audioUrl} controls />
          <button onClick={handlePlayback} type="button">
            Play
          </button>
        </div>
      )}
    </div>
  );
}
