"use client";
import Timer from "@/components/Timer";
import { RecoilRoot } from "recoil";
import RainBackground from "@/components/RainBackground";
import Header from "@/components/Header";
import MenuBar from "@/components/MenuBar";
import LoginModal from "@/components/modals/LoginModal";

export default function Home() {
  return (
    <RecoilRoot>
      <Header />
      <RainBackground />
      <div className="lg:flex w-full h-full pt-20 pb-10 px-5 bg-opacity-0 z-10">
        <div className="lg:w-2/3 lg:pt-5">
          <Timer />
        </div>
        <div className="lg:w-1/3 lg:pt-5">
          <MenuBar />
        </div>
      </div>
      <LoginModal />
    </RecoilRoot>
  );
}
