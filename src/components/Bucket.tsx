import React from "react";

interface BucketProps {
  filled: number;
}

const Bucket: React.FC<BucketProps> = ({ filled }) => {
  const waterHeight = `${filled}%`;

  return (
    <div className="flex justify-center items-end h-80">
      <div className="relative w-48 h-64 border-l-8 border-r-8 border-b-8 border-t-8 border-blue-300 rounded-b-2xl overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-blue-300"
          style={{ height: waterHeight }}
        ></div>
      </div>
    </div>
  );
};

export default Bucket;
