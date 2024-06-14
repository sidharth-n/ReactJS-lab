import React, { useEffect, useState } from "react"
import axios from "axios"
import audio1 from "./assets/announcement.wav"

const TokenDisplay = () => {
  const [tokens, setTokens] = useState([])
  const [isNewToken, setIsNewToken] = useState(false)

  const compareArrays = (arr1, arr2) => {
    const sortedArr1 = arr1.slice().sort()
    const sortedArr2 = arr2.slice().sort()
    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2)
  }

  const handlePlayAudio = () => {
    const audio = new Audio(audio1)
    audio.play().catch(error => {
      console.error("Error playing audio:", error)
    })
  }

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(
          "https://textdb.dev/api/data/hyc-token-app-0001"
        )

        const filteredTokens = response.data.filter(token => token !== 0)

        if (!compareArrays(tokens, filteredTokens)) {
          console.log("New array detected")
          setTokens(filteredTokens)
          setIsNewToken(true)
        } else {
          console.log("No change")
        }
      } catch (error) {
        console.error("Error fetching tokens:", error)
      }
    }

    fetchTokens()
    const intervalId = setInterval(fetchTokens, 5000)

    return () => clearInterval(intervalId)
  }, [tokens])

  useEffect(() => {
    if (isNewToken) {
      handlePlayAudio()
      setIsNewToken(false)
    }
  }, [isNewToken])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="p-8 bg-gray-900  shadow-md flex flex-col items-center justify-center w-[1900px] overflow-hidden rounded-3xl">
        <h1 className="text-[100px] font-semi-bold text-gray-300 bg-gray-800 px-8 rounded-3xl ">
          Token Numbers
        </h1>
        <ul className="flex flex-wrap gap-16 justify-center mt-28 ">
          {tokens.map((token, index) => (
            <li key={index} className="mt-2 text-white text-[150px] font-bold">
              {token}
              {index !== tokens.length - 1 ? (
                <span className="font-light">,</span>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TokenDisplay
