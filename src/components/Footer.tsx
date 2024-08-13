"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative md:px-5 px-3 z-50 lg:h-12 h-36">
      <div className="lg:fixed lg:bottom-0 absolute bottom-0">
        <ul className="lg:flex items-center text-sm text-blue-200 text-opacity-60">
          <li className="mx-3 my-3">
            <Link href="/terms">ご利用規約</Link>
          </li>
          <li className="mx-3 my-3">
            <Link href="/privacy">プライバシーポリシー</Link>
          </li>
          <li className="mx-3 my-3">
            <Link
              href={`mailto:contact@buckets-flow.com?subject=${encodeURIComponent(
                "buckets Flowに関する問い合わせ"
              )}`}
            >
              お問い合わせ
            </Link>
          </li>
          <li className="mx-3 my-3 font-light">
            <p>© 2024 buckets-flow.com</p>
          </li>
        </ul>
      </div>
    </footer>
  );
}
