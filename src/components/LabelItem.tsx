import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ItemType = "TAG";

interface LabelItemProps {
  title: string;
}

const LabelItem: React.FC<LabelItemProps> = ({ title: tag }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { tag },
  });

  return (
    <div
      ref={drag}
      className="text-theme bg-blue-300 rounded p-2 m-1"
      style={{ cursor: "pointer" }}
    >
      {tag}
    </div>
  );
};

interface DropAreaProps {
  onDrop: (tag: string) => void;
}

const DropArea = ({ onDrop }: DropAreaProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item: { tag: string }) => onDrop(item.tag),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        height: "100px",
        width: "300px",
        border: "2px dashed #999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isOver ? "#f0f0f0" : "#fff",
      }}
    >
      ドロップエリア
    </div>
  );
};

const TagDragAndDrop: React.FC = () => {
  const [droppedTag, setDroppedTag] = useState<string | null>(null);
  const tags = ["React", "Next.js", "TypeScript", "JavaScript"];

  const handleDrop = (tag: string) => {
    setDroppedTag(tag);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-col justify-center w-full bg-opacity-0 items-center mt-12">
        <div className="flex mt-5 bg-opacity-0">
          {tags.map((tag) => (
            <LabelItem key={tag} title={tag} />
          ))}
        </div>
        <DropArea onDrop={handleDrop} />
        {droppedTag && (
          <div style={{ marginTop: "20px", fontSize: "20px", color: "#333" }}>
            選択されたタグ: {droppedTag}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TagDragAndDrop;
