// Controls.tsx
import React, { useEffect, useState } from "react"
import { useVoice, VoiceReadyState } from "@humeai/voice-react"
import { createConfig } from "@humeai/voice"

export default function Controls({ setIsSpeaking,accessToken }) {
  const { connect, disconnect, readyState, isPlaying } = useVoice()
  const [timeoutId, setTimeoutId] = useState(null)
const config = createConfig({
  auth: { type: "accessToken", value: accessToken },
  configId: "<YOUR CONFIG ID>", // specify config ID here
})
  // Effect to handle isPlaying changes and set up the disconnect timeout
  useEffect(() => {
    setIsSpeaking(isPlaying)

    // If isPlaying is false, set up a timer to disconnect after 3 seconds
    if (!isPlaying) {
      const id = setTimeout(() => {
        console.log("No activity for 10 seconds, disconnecting...")
        disconnect()
      }, 10000) // 3 seconds timeout
      setTimeoutId(id) // Store the timeout id to clear it later if needed
    } else {
      // If isPlaying becomes true, clear any existing timeout to prevent unwanted disconnection
      if (timeoutId) clearTimeout(timeoutId)
    }

    // Clean up the timeout when the component unmounts or on re-render
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isPlaying])

  return (
    <div>
      {readyState === VoiceReadyState.OPEN ? (
        <button
          onClick={() => {
            if (timeoutId) clearTimeout(timeoutId) // Clear the timer on manual disconnect
            disconnect()
          }}
          className="text-base text-white bg-blue-600 p-2 rounded-lg px-4 focus:outline-none active:bg-blue-800"
        >
          Stop
        </button>
      ) : (
        <button
          className="text-base text-white bg-blue-600 p-2 rounded-lg px-4 focus:outline-none active:bg-blue-800"
          onClick={() => {
            connect(config).catch(error => console.error("Failed to connect:", error))
          }}
        >
          Talk
        </button>
      )}
    </div>
  )
}
