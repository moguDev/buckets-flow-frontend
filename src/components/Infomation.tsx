import Bucket from "./Bucket";

export default function Infomation() {
  return (
    <div className="bg-gray-700 bg-opacity-20 rounded-xl px-5 py-2 backdrop-blur-sm w-full">
      <div className="flex justify-between items-center w-full pb-2">
        <p className="h-full text-blue-300">今日の記録</p>
        <button className="btn material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          expand_more
        </button>
      </div>
      <ul>
        <div className="flex items-center text-gray-500 border-b border-opacity-20 border-gray-500 py-1">
          <span className="material-icons text-xs pr-1">person</span>
          <p className="text-sm">あなたの記録</p>
        </div>
        <li className="flex items-center py-3 text-blue-300">
          <div className="flex items-center w-1/2">
            <span className="scale-50">
              <Bucket filled={100} active={true} />
            </span>
            <p className="font-semibold text-xl">{3}</p>
          </div>
          <div className="flex items-center w-1/2">
            <span className="material-icons text-blue-300 mr-3">
              water_drop
            </span>
            <p className="font-semibold text-lg">
              9,000<span className="font-thin"> mL</span>
            </p>
          </div>
        </li>
        <li className="flex items-center py-3 text-blue-300">
          <span className="material-icons text-blue-300 px-3">timer</span>
          <button className="font-semibold text-xl">1:15</button>
          <div className="flex items-center w-1/2"></div>
        </li>
        <div className="flex items-center text-gray-500 border-b border-opacity-20 border-gray-500 py-1">
          <span className="material-icons text-xs pr-1">group</span>
          <p className="text-sm">みんなの記録</p>
        </div>
        <li></li>
      </ul>
    </div>
  );
}
