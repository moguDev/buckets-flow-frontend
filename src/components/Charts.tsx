import ChartBar from "./ChartBar";

export default function Charts() {
  return (
    <div className="bg-gray-700 bg-opacity-20 rounded-xl px-5 py-2 backdrop-blur-sm w-full">
      <div className="flex justify-between items-center w-full pb-2">
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-1">bar_chart</span>
          <p className="">チャート</p>
        </div>
        <button className="btn material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          expand_more
        </button>
      </div>
      <div className="flex items-center bg-blue-900 bg-opacity-10 rounded-lg p-1">
        <button className="chart-tab w-1/4">日</button>
        <button className="chart-tab chart-tab-selected w-1/4">週</button>
        <button className="chart-tab w-1/4">月</button>
        <button className="chart-tab w-1/4">年</button>
      </div>
      <div className="flex items-center justify-between px-1 py-3 text-blue-300">
        <span className="material-icons text-xl">keyboard_arrow_left</span>
        <p className="text-sm font-light">2024年8月5日〜2024年8月11日</p>
        <span className="material-icons text-xl">keyboard_arrow_right</span>
      </div>
      <div className="flex w-full p-1">
        <ChartBar maxValue={9} value={4} label="月" />
        <ChartBar maxValue={9} value={8} label="火" />
        <ChartBar maxValue={9} value={2} label="水" />
        <ChartBar maxValue={9} value={3} label="木" />
        <ChartBar maxValue={9} value={2} label="金" />
        <ChartBar maxValue={9} value={9} label="土" />
        <ChartBar maxValue={9} value={1} label="日" />
      </div>
    </div>
  );
}
