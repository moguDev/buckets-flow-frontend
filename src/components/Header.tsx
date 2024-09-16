"use client";
import { useRecoilState } from "recoil";
import { menuBarIsHiddenState } from "./MenuBar";
import { useAuth } from "@/hooks/useAuth";
import { othersIsHiddenState } from "./Others";
import Link from "next/link";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const [othersIsHidden, setOthersIsHidden] =
    useRecoilState<boolean>(othersIsHiddenState);
  const [menuBarIsHidden, setMenuBarIsHidden] =
    useRecoilState(menuBarIsHiddenState);

  return (
    <header className="fixed top-0 h-16 w-full md:px-5 px-3 z-50">
      <div className="flex items-center justify-between h-full">
        <Link href="/" className="flex items-center select-none">
          <span className="material-icons text-blue-300 mr-1">water_drop</span>
          <p className="text-blue-300 text-2xl font-bold brightness-120">
            <span className="text-xl font-thin ">buckets </span>Flow
          </p>
        </Link>
        {isAuthenticated && (
          <div className="flex items-center">
            <button
              onClick={() => setOthersIsHidden((prev) => !prev)}
              className={`flex items-center text-blue-300 bg-opacity-0 border-none btn rounded-full  ${
                !othersIsHidden && "bg-blue-500 bg-opacity-10"
              }`}
            >
              <span className={`material-icons text-xs`}>groups</span>
            </button>
            <button
              onClick={() => setMenuBarIsHidden((prev) => !prev)}
              className={`flex items-center text-blue-300 bg-opacity-0 border-none btn rounded-full ${
                !menuBarIsHidden && "bg-blue-500 bg-opacity-10"
              }`}
            >
              <span className={`material-icons text-xs`}>menu</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
