import { useEffect, useRef } from "react";
import { atom, useRecoilState } from "recoil";

export const selectedTagState = atom<string | null>({
  key: "selectedTagState",
  default: null,
});

export const LabelList = () => {
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const tags = ["React", "Next.js", "TypeScript", "JavaScript"];
  return (
    <div className="relative items-center w-full bg-gray-700 bg-opacity-10 p-1 mb-3 rounded-xl">
      <div className="grid lg:grid-cols-6 grid-cols-3 bg-opacity-0">
        {tags.map(
          (tag, index) =>
            tag !== selectedTag && (
              <button
                key={index}
                onClick={() => setSelectedTag(tag)}
                className={`text-blue-300 bg-blue-800 bg-opacity-10 text-sm rounded-lg p-2 m-1 cursor-pointer select-none`}
              >
                <p className="overflow-hidden text-ellipsis">{tag}</p>
              </button>
            )
        )}
      </div>
    </div>
  );
};
