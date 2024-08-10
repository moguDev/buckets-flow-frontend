"use client";
export default function Footer() {
  return (
    <footer className="relative md:px-5 px-3 z-50 w-full lg:h-12 h-36">
      <div className="lg:fixed lg:bottom-0 absolute bottom-0 w-full">
        <ul className="lg:flex items-center text-sm text-blue-200 text-opacity-60">
          <li className="mx-3 my-3">
            <a href="#">利用規約</a>
          </li>
          <li className="mx-3 my-3">
            <a href="#">プライバシーポリシー</a>
          </li>
          <li className="mx-3 my-3">
            <a href="#">お問い合わせ</a>
          </li>
          <li className="mx-3 my-3 font-light">
            <p>© 2024 buckets-Flow.com</p>
          </li>
        </ul>
      </div>
    </footer>
  );
}
