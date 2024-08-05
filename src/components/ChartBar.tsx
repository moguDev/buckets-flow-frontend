type ChartBarProps = {
  maxValue: number;
  value: number;
  label?: string;
};

export default function ChartBar({
  maxValue,
  value,
  label = "",
}: ChartBarProps) {
  return (
    <div className="w-full h-full m-1">
      <div className="w-full h-full bg-gray-100 bg-opacity-5 rounded-full"></div>
      <p className="text-center text-xs">月</p>
    </div>
  );
}
