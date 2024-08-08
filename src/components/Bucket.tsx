import React from "react";

type BucketProps = {
  filled: number;
  active?: boolean;
};

const Bucket: React.FC<BucketProps> = ({ filled, active = false }) => {
  const waterHeight = `${filled}%`;

  return (
    <button
      className={`relative transition-transform duration-700 ${
        active ? "opacity-90 scale-110 px-4" : "opacity-60 scale-75 px-3"
      } hover:opacity-100 tooltip`}
      data-tip={`${Math.round(filled)}%`}
    >
      <div
        className={`absolute top-0 w-12 h-0.5 ${
          filled === 100 ? "bg-blue-300" : "bg-gray-700"
        }`}
      />
      <div
        className={`relative w-10 h-12 rounded-b-lg overflow-hidden  ${
          filled === 100 ? "bg-blue-300" : "bg-gray-700"
        }`}
      >
        <div
          className="absolute bottom-0 w-full bg-blue-300 z-10 rounded-b"
          style={{ height: waterHeight }}
        />
      </div>
    </button>
  );
};

export default Bucket;
