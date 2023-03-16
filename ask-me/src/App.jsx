import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  return (
    <div className="mx-auto h-[600px] shadow p-4 mt-16 border border-gray-200 rounded bg-gray-100">
      <div className="text-3xl border mx-auto mt-16 ">
        who is the Ceo of twitter ?
      </div>
      <div className="answers flex flex-col gap-4 mt-8">
        <div className="text-2xl border shadow bg-blue-200 rounded p-2 ">
          Elon musk
        </div>
        <div className="text-2xl border shadow bg-blue-200 rounded p-2">
          Jeff bezos
        </div>
        <div className="text-2xl border shadow bg-blue-200 rounded p-2">
          Joe rogan
        </div>
        <div className="text-2xl border shadow bg-blue-200 rounded p-2">
          Mark zuckeberg
        </div>
      </div>
    </div>
  );
}

export default App;
