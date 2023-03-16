import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  return (
    <div className="mx-auto h-[600px] shadow p-4 mt-16 border border-gray-200 rounded bg-gray-100">
      <div className="text-2xl border mx-auto mt-16 ">
        who is the Ceo of twitter ?
      </div>
      <div className="answers flex flex-col gap-4 mt-8 items-center">
        <li className="text-xl border shadow bg-blue-200 rounded">Elon musk</li>
        <li className="text-xl border shadow bg-blue-200 rounded">
          Jeff bezos
        </li>
        <li className="text-xl border shadow bg-blue-200 rounded">Joe rogan</li>
        <li className="text-xl border shadow bg-blue-200 rounded">
          Mark zuckeberg
        </li>
      </div>
    </div>
  );
}

export default App;
