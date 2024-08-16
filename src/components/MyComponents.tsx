"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { atom, useRecoilState } from "recoil";
import { RecoilRoot } from "recoil";

export const RecoilRootWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const successMessageState = atom<string>({
  key: "successMessageState",
  default: "",
});

export const SuccessMessage = () => {
  const [message, setMessage] = useRecoilState(successMessageState);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const timer = setTimeout(() => setMessage(""), 2000);
    return () => clearTimeout(timer);
  }, [message, setMessage]);

  useEffect(() => {
    if (contentRef.current) {
      const newHeight =
        message !== "" ? `${contentRef.current.scrollHeight}px` : "0px";
      setHeight(newHeight);
    }
  }, [message]);

  return (
    <div
      role="alert"
      className="fixed top-16 w-56 bg-blue-300 bg-opacity-80 text-theme z-20 rounded-xl transition-height"
      ref={contentRef}
      style={{ height }}
    >
      <div className="flex items-center overflow-hidden p-4">
        <span className="material-icons mr-1">check</span>
        <span className="font-semibold text-sm">{message}</span>
      </div>
    </div>
  );
};

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
        className={`flex justify-between items-center w-full py-6 cursor-pointer ${
          isAuthenticated
            ? "text-blue-300"
            : "text-gray- text-gray-400 text-opacity-60"
        }`}
        onClick={() => {
          if (isAuthenticated) handleOpen();
        }}
      >
        <div className="flex items-center">
          <span className="material-icons text-sm pr-3">{iconName}</span>
          <p>{label}</p>
        </div>
        <div className="material-icons rounded-full bg-opacity-0 border-none">
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

export const Loading = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <span className="loading loading-ring loading-lg bg-blue-300 bg-opacity-50 my-5"></span>
    </div>
  );
};
