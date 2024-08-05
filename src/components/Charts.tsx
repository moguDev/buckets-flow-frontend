import ChartBar from "./ChartBar";

export default function Charts() {
  return (
    <div className="bg-gray-700 bg-opacity-20 rounded-xl p-5 backdrop-blur-sm w-full">
      <div className="flex justify-between items-center w-full pb-2">
        <p className="h-full text-blue-300">チャート</p>
        <button className="btn material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          expand_less
        </button>
      </div>
      <div className="flex items-center bg-blue-300 bg-opacity-5 rounded-lg py-1">
        <div className="chart-tab w-1/4">
          <p className="text-center text-sm">日</p>
        </div>
        <div className="chart-tab chart-tab-active w-1/4">
          <p className="text-center text-sm">週</p>
        </div>
        <div className="chart-tab w-1/4">
          <p className="text-center text-sm">月</p>
        </div>
        <div className="chart-tab w-1/4">
          <p className="text-center text-sm">年</p>
        </div>
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
