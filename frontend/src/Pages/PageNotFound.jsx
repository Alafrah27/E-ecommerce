import React from "react";
import { useNavigate } from "react-router-dom"; // Or your preferred routing library

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">Oops! Page not found.</p>
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
