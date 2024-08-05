import React from "react";

interface BucketProps {
  filled: number;
  active?: boolean;
}

const Bucket: React.FC<BucketProps> = ({ filled, active = false }) => {
  const waterHeight = `${filled}%`;

  return (
    <div
      className={`relative transition-transform duration-300 ${
        active ? "opacity-90 scale-150 px-5" : "opacity-60 px-3"
      }`}
    >
      <div
        className={`absolute top-0 w-8 h-0.5 ${
          filled === 100 ? "bg-blue-300" : "bg-gray-700"
        }`}
      />
      <div
        className={`relative w-6 h-7 rounded-b overflow-hidden  ${
          filled === 100 ? "bg-blue-300" : "bg-gray-700"
        }`}
      >
        <div
          className="absolute bottom-0 w-full bg-blue-300 z-10 rounded-b"
          style={{ height: waterHeight }}
        ></div>
      </div>
    </div>
  );
};

export default Bucket;
