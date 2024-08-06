export default function LeaderBoard() {
  return (
    <div className="bg-gray-700 bg-opacity-20 rounded-xl px-5 py-2 backdrop-blur-sm w-full">
      <div className="flex justify-between items-center w-full pb-2">
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-1">leaderboard</span>
          <p className="">リーダーボード</p>
        </div>
        <button className="btn material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          expand_more
        </button>
      </div>
      <div className="flex items-center bg-blue-900 bg-opacity-10 rounded-lg p-1">
        <button className="chart-tab w-1/3">今日</button>
        <button className="chart-tab w-1/3">昨日</button>
        <button className="chart-tab chart-tab-selected w-1/3">
          すべての期間
        </button>
      </div>
      <div className="flex w-full p-1"></div>
    </div>
  );
}
