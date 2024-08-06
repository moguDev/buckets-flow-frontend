import Bucket from "./Bucket";

export default function AllRecoards() {
  const bucketCount = 123;
  return (
    <div className="bg-gray-700 bg-opacity-10 backdrop-blur-sm rounded-xl px-5 py-2 w-full">
      <div className="flex justify-between items-center w-full pb-2">
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-1">groups</span>
          <p className="">すべての記録</p>
        </div>
        <button className="btn material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          expand_more
        </button>
      </div>
      <ul>
        {/* 今日 */}
        <div className="flex items-center justify-between text-gray-400 border-b border-opacity-20 border-gray-500 py-1">
          <p className="text-sm">今日</p>
          <p className="text-xs font-thin">2024年8月6日</p>
        </div>
        <li className="flex items-center py-3 text-blue-300">
          <div className="flex items-center w-1/2">
            <span className="scale-50">
              <Bucket filled={100} active={true} />
            </span>
            <p className="font-semibold text-xl">
              {`${bucketCount} `}
              <span className="text-sm font-thin">
                {bucketCount === 1 ? "bucket" : "buckets"}
              </span>
            </p>
          </div>
          <div className="flex items-center w-1/2">
            <span className="material-icons text-blue-300 mr-3">
              water_drop
            </span>
            <p className="font-semibold text-lg">
              {`${(bucketCount * 3000).toLocaleString()} `}{" "}
              <span className="font-thin text-sm">mL</span>
            </p>
          </div>
        </li>
        {/* いままで */}
        <div className="flex items-center justify-between text-gray-400 border-b border-opacity-20 border-gray-500 py-1">
          <p className="text-sm">全ての期間</p>
          <p className="text-xs font-thin">2024年8月6日</p>
        </div>
        <li className="flex items-center py-3 text-blue-300">
          <div className="flex items-center w-1/2">
            <span className="scale-50">
              <Bucket filled={100} active={true} />
            </span>
            <p className="font-semibold text-xl">
              {`${bucketCount.toLocaleString()} `}
              <span className="text-sm font-thin">
                {bucketCount === 1 ? "bucket" : "buckets"}
              </span>
            </p>
          </div>
          <div className="flex items-center w-1/2">
            <span className="material-icons text-blue-300 mr-3">
              water_drop
            </span>
            <p className="font-semibold text-lg">
              {`${(bucketCount * 3000).toLocaleString()} `}{" "}
              <span className="font-thin text-sm">mL</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
