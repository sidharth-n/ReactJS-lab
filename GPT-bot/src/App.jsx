import { useState, useEffect, useRef } from "react"
import { BackgroundAnimation } from "././components/3dCanvas"
import { Canvas } from "react-three-fiber"
import { Suspense } from "react"
import { Html, useProgress } from "@react-three/drei"
import ClientComponent from "./components/ClientComponent"
import { fetchAccessToken } from "@humeai/voice"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-2"></div>
      <h2 class="text-center text-white text-l font-semibold">
        {progress.toFixed(0)} % loading...
      </h2>
    </Html>
  )
}

function App() {
  const [accessToken, setAccessToken] = useState("")
  const [animationName, setAnimationName] = useState([])
  const idleAnimations = [["Armature|mixamo.com|Layer0"]]
  const talkAnimations = [["KeyAction", "Armature|mixamo.com|Layer0"]]
  const [isPlaying, setIsPlaying] = useState(false)
  const idleAnimation = getRandomAnimation(idleAnimations)
  const talkAnimation = getRandomAnimation(talkAnimations)

  useEffect(() => {
    const loadAccessToken = async () => {
      const token = await fetchAccessToken({
        apiKey: String(process.env.VITE_HUME_API_KEY),
        clientSecret: String(process.env.VITE_HUME_CLIENT_SECRET),
      })
      if (!token) {
        throw new Error("Failed to fetch access token")
      }
      setAccessToken(token)
    }

    loadAccessToken()
  }, [])

  /*   if (!accessToken) {
    return <div>Loading...</div>
  } */

  function getRandomAnimation(animationList) {
    const randomIndex = Math.floor(Math.random() * animationList.length)
    return animationList[randomIndex]
  }

  useEffect(() => {
    if (isPlaying) {
      setAnimationName(talkAnimation)
    } else {
      setAnimationName(["Armature|mixamo.com|Layer0"])
    }
  }, [isPlaying])
  const startDance = () => {
    setAnimationName(["Armature.001|mixamo.com|Layer0.002"])
  }

  const startFlip = () => {
    setAnimationName(["Armature.001|mixamo.com|Layer0.003"])
  }

  const startTalk = () => {
    setAnimationName(["Armature|mixamo.com|Layer0"])
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans ">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      {
        <div
          className="fixed top-5 flex flex-row space-x-2 self-center"
          style={{ zIndex: 999 }}
        >
          <button
            onClick={startTalk}
            className="text-base text-white bg-blue-600 p-2 rounded-lg px-4 focus:outline-none active:bg-blue-800"
          >
            Talk
          </button>
          <ClientComponent
            className="fixed top-20 left-0 flex flex-row "
            accessToken={accessToken}
            setIsSpeaking={setIsPlaying}
          />
          <button
            onClick={startDance}
            className="text-base text-white bg-blue-600 p-2 rounded-lg px-4 focus:outline-none active:bg-blue-800"
          >
            Dance
          </button>

          <button
            onClick={startFlip}
            className="text-base text-white bg-blue-600 p-2 rounded-lg px-4 focus:outline-none active:bg-blue-800"
          >
            Flip
          </button>
        </div>
      }

      <main className="flex-1 overflow-auto p-0">
        {
          <Canvas className="w-full h-full bg-gray-1000" style={{}}>
            <Suspense fallback={<Loader />}>
              <BackgroundAnimation
                animationNames={animationName}
                overlay={true}
              />
            </Suspense>
          </Canvas>
        }
      </main>
      <footer className="fixed bottom-1 w-full p-3">
        <div className="flex items-center gap-4 "></div>
      </footer>
    </div>
  )
}

export default App
