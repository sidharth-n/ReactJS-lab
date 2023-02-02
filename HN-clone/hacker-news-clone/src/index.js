import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Comments from "./comments";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Comments />
  </React.StrictMode>
);
