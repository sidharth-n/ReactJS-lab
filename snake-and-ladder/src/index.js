import React from "react";
import ReactDOM from "react-dom";
//import "tailwindcss/dist/tailwind.min.css";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDice,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import App from "./App";

library.add(faDice, faArrowUp, faArrowDown);

ReactDOM.render(<App />, document.getElementById("root"));
