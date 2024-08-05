import React from "react";

interface BucketProps {
  filled: number;
}

const Bucket: React.FC<BucketProps> = ({ filled }) => {
  const waterHeight = `${filled}%`;

  return (
    <div className={`flex justify-center items-end h-80 opacity-90`}>
      <div
        className={`relative w-12 h-14 border-r-4 border-l-4 border-b-4 ${
          filled === 100 ? "border-blue-400" : "border-gray-300"
        } rounded-b-lg`}
      >
        <div
          className={`absolute top-0 right-0 h-1 w-14 z-10 ${
            filled === 100 ? "bg-blue-400" : "bg-gray-300"
          }`}
        />
        <div
          className="absolute bottom-0 w-full bg-blue-400"
          style={{ height: waterHeight }}
        ></div>
      </div>
    </div>
  );
};

export default Bucket;
