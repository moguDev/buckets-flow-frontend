import { useAuth } from "@/hooks/useAuth";
import { useFetchRecentRainfall } from "@/hooks/useFetchRecentRainfall";

export const TodayPredipitation = () => {
  const { datas } = useFetchRecentRainfall();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative text-blue-300 mb-4 select-none">
      <h3 className="px-2 py-2 text-sm font-semibold text-blue-300 opacity-40">
        今日の降水情報
      </h3>
      <div className="divide-y divide-gray-300 divide-opacity-10">
        <section>
          <div className="flex items-end p-3 pb-4 w-full">
            <div className="flex flex-col items-center w-full">
              <p className="text-xs mb-1">今日の総降水量</p>
              <p className="text-sm font-thin">
                <span className="mx-1 text-4xl font-bold">
                  {datas?.total_duration !== 0
                    ? Math.floor((datas?.total_duration / 1500) * 8 * 10) / 10
                    : "-"}
                </span>
                mm
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <p className="text-xs mb-1">雨を降らせた人</p>
              <p className="text-sm font-thin">
                <span className="mx-1 text-4xl font-bold">
                  {datas?.user_count !== 0 ? datas?.user_count : "-"}
                </span>
              </p>
            </div>
          </div>
          {!isAuthenticated && (
            <p className="text-center text-sm text-gray-600 pb-4 opacity-80">
              ※ログイン中のユーザの実績が反映されます
            </p>
          )}
        </section>
        <section className="pt-2">
          <div className="flex items-center">
            {datas?.rainfall_data.map((data, index) => (
              <div
                key={index}
                className={`w-full m-1 p-1 ${
                  data.time === "現在" && "bg-blue-600 bg-opacity-10 rounded-md"
                }`}
              >
                <p
                  className={`text-center text-2xl ${
                    data.duration === 0 && "text-red-700 opacity-70"
                  }`}
                >
                  {data.duration === 0 ? "☀️" : "☔️"}
                </p>
                {data.duration !== 0 ? (
                  <p className="text-center text-md font-bold">
                    {Math.floor((data.duration / 1500) * 8 * 10) / 10}
                    <span
                      className="font-thin ml-0.5"
                      style={{ fontSize: "8px" }}
                    >
                      mm
                    </span>
                  </p>
                ) : (
                  <p className="text-center">---</p>
                )}
                <p
                  className={`text-sm text-center my-2 ${
                    data.time === "現在"
                      ? "text-blue-200 font-bold"
                      : "text-blue-300"
                  }`}
                >
                  {data.time}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
