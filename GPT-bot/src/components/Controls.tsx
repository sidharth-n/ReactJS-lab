// Controls.tsx
import React, { useEffect } from "react"
import { useVoice, VoiceReadyState } from "@humeai/voice-react"

export default function Controls({ setIsSpeaking }) {
  const { connect, disconnect, readyState, isPlaying } = useVoice()
  useEffect(() => {
    console.log("isplaying status : " + isPlaying)
    setIsSpeaking(isPlaying)
  }, [isPlaying])

  return (
    <div>
      {readyState === VoiceReadyState.OPEN ? (
        <button
          onClick={disconnect}
          className="text-base text-white bg-blue-600 p-2 rounded-lg px-4 focus:outline-none active:bg-blue-800"
        >
          Stop
        </button>
      ) : (
        <button
          className="text-base text-white bg-blue-600 p-2 rounded-lg px-4 focus:outline-none active:bg-blue-800"
          onClick={() =>
            connect().catch(error => console.error("Failed to connect:", error))
          }
        >
          Talk
        </button>
      )}
    </div>
  )
}
