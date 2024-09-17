import { useEffect, useState } from "react";
import { Loading, MenuAccordion } from "./MyComponents";
import { useTopUsers } from "@/hooks/useTopUsers";

const ItemComponent = ({
  rank,
  name,
  image,
  duration,
}: {
  rank: number;
  name: string;
  image: string;
  duration: number;
}) => {
  return (
    <div className="flex items-center px-3 py-5 text-blue-300">
      <div
        className={`mr-2 text-center font-bold ${
          rank < 3 ? "text-blue-200" : "text-sm"
        }`}
      >
        {rank}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="font-semibold text-lg">{name}</div>
        <div className="flex items-center">
          <span className="text-blue-300 mr-1">☔️</span>
          <div>
            {Math.floor((duration / 1500) * 8 * 10) / 10}
            <span className="text-xs font-thin px-0.5">mm</span>
          </div>
          <span className="material-icons text-blue-300 scale-75">timer</span>
          <div>
            {Math.floor(duration / 60 / 60)}
            <span className="text-xs font-thin px-0.5">h</span>
          </div>
          <div>
            {Math.floor((duration / 60) % 60)}
            <span className="text-xs font-thin px-0.5">min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LeaderBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const { topUsers, fetchTopUsers, period, setPeriod, loading } = useTopUsers();

  useEffect(() => {
    fetchTopUsers();
  }, [period, fetchTopUsers]);

  return (
    <MenuAccordion
      isOpen={isOpen}
      handleOpen={() => {
        setIsOpen((prev) => !prev);
      }}
      iconName="leaderboard"
      label="リーダーボード"
      isAuthenticated={true}
      loading={loading}
    >
      <div className="flex items-center bg-blue-900 bg-opacity-10 rounded-lg p-1">
        <button
          onClick={() => setPeriod("week")}
          className={`chart-tab w-1/3 ${
            period === "week" ? "chart-tab-selected" : ""
          }`}
        >
          今週
        </button>
        <button
          onClick={() => setPeriod("month")}
          className={`chart-tab w-1/3 ${
            period === "month" ? "chart-tab-selected" : ""
          }`}
        >
          今月
        </button>
        <button
          onClick={() => setPeriod("all")}
          className={`chart-tab w-1/3 ${
            period === "all" ? "chart-tab-selected" : ""
          }`}
        >
          すべての期間
        </button>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : topUsers.length > 0 ? (
          <>
            {topUsers.map((user, index) => (
              <div
                key={user.name}
                className="divide-y divide-blue-300 divide-opacity-10"
              >
                <ItemComponent
                  rank={index + 1}
                  name={user.name}
                  image={user.image}
                  duration={user.total_duration}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center p-6">
            <p className="text-blue-300 opacity-30">データがありません。</p>
          </div>
        )}
      </div>
    </MenuAccordion>
  );
}
