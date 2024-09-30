"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuBarIsHiddenState } from "./MenuBar";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Toast } from "./Toast";
import { useCallback, useEffect, useState } from "react";
import Icon from "/public/images/icon.png";
import Image from "next/image";
import { volumeState } from "@/hooks/useTimer";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const [menuBarIsHidden, setMenuBarIsHidden] =
    useRecoilState(menuBarIsHiddenState);
  const volume = useRecoilValue(volumeState);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > scrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setScrollY(currentScrollY);
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, handleScroll]);

  return (
    <header
      className={`fixed top-0 h-16 w-full md:px-5 px-3 z-50 transition-all duration-500 ease-in-out ${
        !isVisible && "md:translate-y-0 -translate-y-16"
      }`}
    >
      <div className="flex items-center justify-between h-full">
        <Link href="/" className="flex items-center select-none">
          <div className="w-8 h-8 translate-y-[1px] mr-1">
            <Image src={Icon} alt="logo-icon" className="object-cover" />
          </div>
          <p className="text-blue-300 text-2xl font-bold brightness-120">
            <span className="text-xl font-thin ">buckets </span>Flow
          </p>
        </Link>
        <div className="flex items-center">
          <button
            className="material-icons text-blue-300 rounded-full btn bg-opacity-0 border-none mx-0.5"
            onClick={() => {
              const modal = document.getElementById(
                "volume_modal"
              ) as HTMLDialogElement;
              modal !== null && modal.showModal();
            }}
          >
            {volume === 0
              ? "volume_off"
              : volume > 50
              ? "volume_up"
              : "volume_down"}
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setMenuBarIsHidden((prev) => !prev)}
              className={`flex items-center text-blue-300 bg-opacity-0 border-none btn rounded-full ${
                !menuBarIsHidden && "bg-blue-500 bg-opacity-10"
              }`}
            >
              <span className={`material-icons text-xs`}>menu</span>
            </button>
          )}
        </div>
      </div>
      <Toast />
    </header>
  );
};
