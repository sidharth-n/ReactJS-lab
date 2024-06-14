import React, { useState, useEffect } from "react"
import axios from "axios"

const TokenEntry = () => {
  const [tokens, setTokens] = useState("")
  const [tokenHistory, setTokenHistory] = useState(
    JSON.parse(localStorage.getItem("tokenHistory")) || []
  )

  useEffect(() => {
    localStorage.setItem("tokenHistory", JSON.stringify(tokenHistory))
  }, [tokenHistory])

  const handleSubmit = async event => {
    event.preventDefault()
    const tokenArray = tokens.split(" ").map(Number)
    const tokenString = JSON.stringify(tokenArray)
    console.log("Token String:", tokenString)
    try {
      const response = await axios.post(
        "https://textdb.dev/api/data/hyc-token-app-0001",
        tokenString,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      )
      console.log("Response:", response)
      setTokenHistory([...tokenHistory, tokens])
      alert("Tokens sent successfully!")
    } catch (error) {
      console.error("Error saving tokens:", error)
    }
  }

  const handleClear = () => {
    localStorage.removeItem("tokenHistory")
    setTokenHistory([])
  }

  return (
    <div className="flex flex-col items-center justify-end min-h-screen bg-gray-100 p-4 border border-red-500">
      <div className="w-full max-w-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Token History
          </h2>
          <div className="h-64 overflow-y-auto bg-white p-2 rounded shadow-md">
            {tokenHistory.map((token, index) => (
              <div key={index} className="text-gray-700 text-sm">
                {token}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-2 mb-28">
            <button
              onClick={handleClear}
              className="px-4 py-2 mt-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Clear History
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded shadow-md flex flex-col"
        >
          <label className="block text-sm font-medium text-gray-700">
            Enter Tokens:
          </label>
          <input
            type="text"
            value={tokens}
            onChange={e => setTokens(e.target.value)}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
          <div className="flex items-center justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={() => setTokens("")}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Clear
            </button>{" "}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TokenEntry
