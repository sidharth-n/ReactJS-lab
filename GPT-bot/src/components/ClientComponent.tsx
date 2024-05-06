import React, { useEffect, useState } from "react"
import { VoiceProvider } from "@humeai/voice-react"
import Controls from "./Controls"

export default function ClientComponent({ accessToken, setIsSpeaking }) {
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <Controls setIsSpeaking={setIsSpeaking} />
    </VoiceProvider>
  )
}
