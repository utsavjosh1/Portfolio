// components/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="loader">loading</div>
    </div>
  );
};

export default Loader;
