import React, { useEffect, useState } from "react"

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", e => {
      console.log("beforeinstallprompt event fired")
      e.preventDefault()
      setDeferredPrompt(e)
    })
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      console.log("Handling install click")
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then(choiceResult => {
        console.log("User choice:", choiceResult.outcome)
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt")
        } else {
          console.log("User dismissed the A2HS prompt")
        }
        setDeferredPrompt(null)
      })
    }
  }

  return (
    <div>
      <h1>My PWA Project</h1>
      <button onClick={handleInstallClick}>Install App</button>
    </div>
  )
}

export default App
