import React from "react";

const Loader = () => {
  return (
    <div className="bg-blue-600 mx-auto flex items-center h-full w-full">
      <span className="loading loading-infinity loading-lg mx-auto"></span>
    </div>
  );
};

export default Loader;
