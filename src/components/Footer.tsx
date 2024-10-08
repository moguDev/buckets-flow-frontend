"use client";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative md:px-5 px-3 z-50 lg:h-12 h-36">
      <div className="lg:fixed lg:bottom-0 absolute bottom-0">
        <ul className="lg:flex items-center lg:text-sm text-xs text-blue-200 text-opacity-80">
          <li className="mx-3 my-3">
            <label
              htmlFor="my-modal-3"
              className="cursor-pointer hover:brightness-150 hover:underline transition-all duration-300"
            >
              プライバシーポリシー
            </label>
          </li>
          <li className="mx-3 my-3">
            <Link
              href={`mailto:contact@sho-horiguchi.jp?subject=${encodeURIComponent(
                "buckets Flowに関する問い合わせ"
              )}`}
              className="hover:brightness-150 hover:underline transition-all duration-300"
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
};
