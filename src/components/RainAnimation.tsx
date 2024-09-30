export const RainAnimation = ({ isDrop }: { isDrop: boolean }) => {
  return (
    <div className="wrapper scale-50">
      <div className="cloud">
        <div className="cloud_left"></div>
        <div className="cloud_right"></div>
      </div>
      <div
        className={`rain transition-opacity duration-700 ${
          isDrop ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="drop" />
        <div className="drop" />
        <div className="drop" />
        <div className="drop" />
        <div className="drop" />
      </div>
    </div>
  );
};
