import React, { useState, useEffect, useRef } from "react"
import {
  base64ToBlob,
  checkForAudioTracks,
  getAudioStream,
  getSupportedMimeType,
  VoiceClient,
} from "@humeai/voice"

const Speak = () => {
  const [accessToken, setAccessToken] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [client, setClient] = useState(null)
  const audioQueue = useRef([])
  const currentAudio = useRef(null)
  const audioStream = useRef(null)
  const recorder = useRef(null)
  const [mimeType, setMimeType] = useState("audio/webm") // Default mimeType

  const authenticate = async () => {
    const apiKey = process.env.VITE_HUME_API_KEY || ""
    const clientSecret = process.env.VITE_HUME_CLIENT_SECRET || ""
    console.log(apiKey, clientSecret)
    const authString = `${apiKey}:${clientSecret}`
    const encoded = window.btoa(authString)

    try {
      const res = await fetch("https://api.hume.ai/oauth2-cc/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encoded}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }).toString(),
        cache: "no-cache",
      })
      const data = await res.json()
      setAccessToken(data.access_token)
    } catch (e) {
      console.error("Failed to authenticate:", e)
    }
  }

  useEffect(() => {
    const supportedMimeType = getSupportedMimeType().mimeType || "audio/webm"
    setMimeType(supportedMimeType)

    const setupClient = () => {
      const newClient = VoiceClient.create({
        hostname: "api.hume.ai",
        reconnectAttempts: 30,
        debug: false,
        auth: {
          type: "accessToken",
          value: accessToken,
        },
      })

      newClient.on("open", async () => {
        console.log("Web socket connection opened")
        captureAudio()
      })

      newClient.on("message", async message => {
        switch (message.type) {
          case "audio_output":
            const blob = base64ToBlob(message.data, mimeType)
            audioQueue.current.push(blob)
            if (audioQueue.current.length <= 1) {
              playAudio()
            }
            break
          case "user_interruption":
            stopAudio()
            break
        }
      })

      newClient.on("error", error => {
        console.error(error.message)
      })

      newClient.on("close", () => {
        console.log("Web socket connection closed")
      })

      setClient(newClient)
    }

    if (accessToken) setupClient()

    return () => {
      client?.disconnect()
    }
  }, [accessToken])

  const captureAudio = async () => {
    audioStream.current = await getAudioStream()
    checkForAudioTracks(audioStream.current)

    recorder.current = new MediaRecorder(audioStream.current, { mimeType })
    recorder.current.ondataavailable = async ({ data }) => {
      if (data.size > 0 && client?.readyState === WebSocket.OPEN) {
        const buffer = await data.arrayBuffer()
        client.sendAudio(buffer)
      }
    }
    recorder.current.start(100)
  }

  const playAudio = () => {
    if (audioQueue.current.length > 0 && !isPlaying) {
      setIsPlaying(true)
      const audioBlob = audioQueue.current.shift()

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob)
        currentAudio.current = new Audio(audioUrl)
        currentAudio.current.play()
        currentAudio.current.onended = () => {
          setIsPlaying(false)
          if (audioQueue.current.length) playAudio()
        }
      }
    }
  }

  const stopAudio = () => {
    currentAudio.current?.pause()
    currentAudio.current = null
    setIsPlaying(false)
    audioQueue.current.length = 0
  }

  return (
    <div id="app">
      <button onClick={authenticate}>Authenticate</button>
      <button onClick={() => client?.connect()} disabled={!accessToken}>
        Start
      </button>
      <button onClick={() => client?.disconnect()}>End</button>
      <div id="chat">
        <h2>Chat</h2>
      </div>
    </div>
  )
}

export default Speak
