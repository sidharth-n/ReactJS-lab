import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const app = document.createElement("div");
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<App />, app);
