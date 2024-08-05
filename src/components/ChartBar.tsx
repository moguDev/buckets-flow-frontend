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
    <div className="w-full p-1 opacity-60">
      <div className="relative w-full h-56 bg-gray-100 bg-opacity-5 rounded-full overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-blue-300"
          style={{ height: height }}
        />
      </div>
      <p className="text-center text-blue-100 text-xs p-1">{label}</p>
    </div>
  );
}
