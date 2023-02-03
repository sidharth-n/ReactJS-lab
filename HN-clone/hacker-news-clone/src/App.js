import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Comments from "./comments";
import Stories from "./stories";
import "./style.css";

const App = () => {
  return (
    <div className="main">
      <div className="top">
        <div className="top-head">
          Hacker News
          <div className="top-sub">
            new | past | comments | ask | show | jobs | submit
          </div>
        </div>
        <div className="login">login</div>
      </div>
      <Routes>
        <Route path="/" element={<Stories />} />
        <Route path="/comments/:idc" element={<Comments />} />
      </Routes>
    </div>
  );
};

export default App;
