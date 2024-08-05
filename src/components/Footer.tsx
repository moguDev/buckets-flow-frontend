import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full p-1 opacity-50">
      <p className="text-sm font-thin text-center text-blue-200">
        Special thanks to all members of{" "}
        <a href="https://runteq.jp/" target="_blank" className="font-normal">
          RUNTEQ.
        </a>
      </p>
    </footer>
  );
}
