"use client";
import { atom } from "recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const toastState = atom<{
  message: string;
  case: "success" | "alert";
} | null>({
  key: "toastState",
  default: null,
});

export const Toast = () => {
  const [toast, setToast] = useRecoilState(toastState);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div
      className={`z-30 mt-2 w-max mx-auto transition-transform duration-300 ease-in-out ${
        toast ? "opacity-100" : "opacity-0"
      }`}
    >
      <p
        className={`
          text-center md:text-sm text-xs font-semibold px-5 py-2 text-blue-100
          bg-opacity-40 backdrop-blur-sm rounded-full h-full
          flex items-center justify-center ${
            toast.case === "success" ? "bg-blue-500" : "bg-red-500"
          }
        `}
      >
        {toast.message}
      </p>
    </div>
  );
};
