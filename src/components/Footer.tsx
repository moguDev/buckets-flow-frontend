import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full p-1 opacity-70">
      <p className="text-xs font-thin text-center text-blue-200">
        <span className="px-1">
          Developed by{" "}
          <a
            href="https://x.com/mogu_57B"
            target="_blank"
            className="font-normal text-white"
          >
            @mogu_57B
          </a>
          .
        </span>
        <span className="px-1">
          Big-big-special thanks to all members of{" "}
          <a
            href="https://runteq.jp/"
            target="_blank"
            className="font-normal text-white"
          >
            RUNTEQ
          </a>
          !
        </span>
      </p>
    </footer>
  );
}
