import { useDrag } from "react-dnd";

export const ItemType = "TAG";

export default function LabelItem({ title: tag }) {
  const [, drag] = useDrag({
    type: ItemType,
    item: { tag },
  });

  return (
    <div
      ref={drag}
      className="text-blue-300 bg-blue-500 bg-opacity-20 text-sm rounded-xl p-2 m-1"
      style={{ cursor: "pointer" }}
    >
      {tag}
    </div>
  );
}
