import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"
import TokenEntry from "./TokenEntry"
import TokenDisplay from "./TokenDisplay"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<TokenEntry />} />
      <Route path="/display" element={<TokenDisplay />} />
    </Routes>
  </Router>
)
