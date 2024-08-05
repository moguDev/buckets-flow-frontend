import React from "react";

interface BucketProps {
  filled: number;
  active?: boolean;
}

const Bucket: React.FC<BucketProps> = ({ filled, active = false }) => {
  const waterHeight = `${filled}%`;

  return (
    <div
      className={`flex justify-center items-center transition-transform duration-300 ${
        active ? "opacity-90 scale-150" : "opacity-60"
      } px-3`}
    >
      <div
        className={`relative w-6 h-7 rounded-b  ${
          filled === 100 ? "bg-blue-300" : "bg-gray-700"
        }`}
      >
        <div
          className={`absolute top-0 right-0 h-0.5 w-7 z-10 ${
            filled === 100 ? "bg-blue-300" : "bg-gray-700"
          }`}
        />
        <div
          className="absolute bottom-0 w-full bg-blue-300 z-10 rounded-b"
          style={{ height: waterHeight }}
        ></div>
      </div>
    </div>
  );
};

export default Bucket;
