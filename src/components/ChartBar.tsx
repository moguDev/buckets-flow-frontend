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
  const height = `${(value / maxValue) * 100}%`;
  return (
    <div className="w-full h-full m-1">
      <div className="relative w-full h-full bg-gray-100 bg-opacity-5 rounded-full">
        <div
          className="absolute bottom-0 w-full bg-blue-300 bg-opacity-50 rounded-full"
          style={{ height: height }}
        />
      </div>
      <p className="text-center text-xs">{label}</p>
    </div>
  );
}
