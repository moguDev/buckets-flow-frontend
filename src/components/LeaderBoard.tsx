import { useState } from "react";
import { MenuAccordion } from "./MyComponents";

export default function LeaderBoard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MenuAccordion
      isOpen={isOpen}
      handleOpen={() => {
        setIsOpen((prev) => !prev);
      }}
      iconName="leaderboard"
      label="リーダーボード"
      isAuthenticated={true}
    >
      <div className="flex items-center bg-blue-900 bg-opacity-10 rounded-lg p-1">
        <button className="chart-tab w-1/3">今週</button>
        <button className="chart-tab w-1/3">今月</button>
        <button className="chart-tab chart-tab-selected w-1/3">
          すべての期間
        </button>
      </div>
      <div className="flex w-full p-1 pb-3"></div>
    </MenuAccordion>
  );
}
