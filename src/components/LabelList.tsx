import { useEffect, useRef } from "react";
import { atom, useRecoilState } from "recoil";

export const selectedTagState = atom<string | null>({
  key: "selectedTagState",
  default: null,
});

export const LabelItem = ({ title }: { title: string }) => {
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);

  return (
    <button
      onClick={() => setSelectedTag(title)}
      className={`text-blue-300 bg-blue-700 bg-opacity-10 text-sm rounded-lg p-2 m-1 cursor-pointer select-none ${
        title === selectedTag
      }`}
    >
      {title}
    </button>
  );
};
