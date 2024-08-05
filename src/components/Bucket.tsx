import React from "react";

interface BucketProps {
  filled: number;
  active?: false;
}

const Bucket: React.FC<BucketProps> = ({ filled, active = false }) => {
  const waterHeight = `${filled}%`;

  return (
    <div className={`flex justify-center items-center opacity-60 px-3`}>
      <div
        className={`relative ${
          active ? "w-7 h-8" : "w-6 h-7"
        } border-r-2 border-l-2 border-b-2 ${
          filled === 100 ? "border-blue-300" : "border-gray-100"
        } rounded-b`}
      >
        <div
          className={`absolute top-0 right-0 h-0.5 ${
            active ? "w-8" : "w-7"
          } z-10 ${filled === 100 ? "bg-blue-300" : "bg-gray-100"}`}
        />
        <div
          className="absolute bottom-0 w-full bg-blue-300 z-[-1]"
          style={{ height: waterHeight }}
        ></div>
      </div>
    </div>
  );
};

export default Bucket;
