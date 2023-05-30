import React from "react";

const Quote = ({ answer }) => {
  return (
    <div className="transition-all duration-500 ease-in-out">
      <div className="flex-cols justify-around items-center mx-4 ">
        <div className="card mb-6 bg-gray-800 shadow-2xl p-4 rounded ">
          {/* <h2 className="text-sm font-bold mb-3">Bot: </h2> */}
          <p className="text-gray-300 text-base">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
