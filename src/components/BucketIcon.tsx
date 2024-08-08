import React from "react";

type BucketIconProps = {
  colorUtil?: string;
  innerIcon?: string;
};

export const BucketIcon: React.FC<BucketIconProps> = ({
  colorUtil = "bg-blue-300",
  innerIcon = "",
}) => {
  return (
    <div className="flex items-center opacity-90">
      <div className={`relative transition-transform duration-700`}>
        <div className={`absolute top-0 w-6 h-0.5 ${colorUtil}`} />
        <div
          className={`relative w-5 h-6 rounded-b overflow-hidden ${colorUtil}`}
        />
        <span className="absolute top-0 -left-0.5 material-icons text-xs scale-75 text-black">
          innerIcon
        </span>
      </div>
    </div>
  );
};
