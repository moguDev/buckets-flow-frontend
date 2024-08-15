"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

interface AccordionProps {
  children: ReactNode;
  isOpen: boolean;
  handleOpen: () => void;
  iconName: string;
  label: string;
  isAuthenticated: boolean;
}

export const MenuAccordion = ({
  children,
  isOpen,
  handleOpen,
  iconName,
  label,
  isAuthenticated,
}: AccordionProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      const newHeight = isOpen ? `${contentRef.current.scrollHeight}px` : "0px";
      setHeight(newHeight);
    }
  }, [isOpen]);

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full select-none">
      <label
        htmlFor={isAuthenticated ? "" : "my-modal-4"}
        className="flex justify-between items-center w-full py-6"
        onClick={handleOpen}
      >
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">{iconName}</span>
          <p>{label}</p>
        </div>
        <div className="material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          {isAuthenticated ? (
            isOpen ? (
              "expand_more"
            ) : (
              "expand_less"
            )
          ) : (
            <div className="flex items-center text-xs rounded-full text-gray-400 text-opacity-80">
              ログインして利用
            </div>
          )}
        </div>
      </label>
      <div ref={contentRef} className="transition-height" style={{ height }}>
        {children}
      </div>
    </div>
  );
};
