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
        <button onClick={disconnect}>End Session</button>
      ) : (
        <button
          onClick={() =>
            connect().catch(error => console.error("Failed to connect:", error))
          }
        >
          Start Session
        </button>
      )}
    </div>
  )
}
