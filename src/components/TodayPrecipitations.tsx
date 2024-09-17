import { useRecentRainfall } from "@/hooks/userFetchRecentRainfall";

export const TodayPredipitation = () => {
  const { datas, loading } = useRecentRainfall();

  return (
    <div className="relative text-blue-300 mb-4 p-1">
      <div className="rounded-lg bg-blue-200 bg-opacity-5 backdrop-blur-sm p-2 divide-y divide-gray-200 divide-opacity-20">
        <div className="flex">
          <section className="p-2 pb-3 w-full">
            <p className="text-xs py-1">降雨量</p>
            <p className="font-thin">
              <span className="text-4xl font-black">{"0"}</span> mm
            </p>
          </section>
          <section className="p-2 pb-3 w-full">
            <p className="text-xs py-1">ユーザ数</p>
            <p className="font-thin">
              <span className="text-4xl font-black">{"0"}</span> users
            </p>
          </section>
        </div>
        <section className="flex items-center">
          {datas.map((data) => (
            <div className="w-full m-1">
              <p
                className={`text-center my-2 text-2xl ${
                  data.total_duration === 0 && "text-red-600 opacity-80"
                }`}
              >
                {data.total_duration === 0 ? "☀️" : "☔️"}
              </p>
              <p className="text-center text-lg font-bold">
                {data.total_duration}
                <span className="font-thin ml-0.5" style={{ fontSize: "10px" }}>
                  mm
                </span>
              </p>
              <p
                className={`text-xs text-center my-2 ${
                  data.time === "現在"
                    ? "text-blue-200 font-semibold"
                    : "text-blue-300"
                }`}
              >
                {data.time}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
