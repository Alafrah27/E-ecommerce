// src/ComingSoon.js

import React from "react";

const ComingSoon = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center  w-full mx-auto"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?nature,landscape')",
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          We are working hard to bring something amazing. Stay tuned!
        </p>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold text-gray-800">00:00:00</span>
          <span className="text-gray-500">Until Launch</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
