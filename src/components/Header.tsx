"use client";
import { useRecoilState } from "recoil";
import { menuBarIsHiddenState } from "./MenuBar";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Toast } from "./Toast";
import { useEffect, useState } from "react";
import Icon from "/public/images/icon.png";
import Image from "next/image";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const [menuBarIsHidden, setMenuBarIsHidden] =
    useRecoilState(menuBarIsHiddenState);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

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
      <Toast />
    </header>
  );
};
