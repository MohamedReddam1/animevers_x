// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0f1120]">
      <div className="w-12 h-12 border-t-4 border-b-4 border-[#c72ec7] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
