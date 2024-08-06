export default function Header() {
  return (
    <header className="fixed top-0 h-16 w-full px-5 z-50">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <span className="material-icons text-blue-300 mr-1">water_drop</span>
          <p className="text-blue-300 text-2xl font-bold brightness-120">
            <span className="text-xl font-thin ">buckets </span>Flow
          </p>
        </div>
        <button className="flex items-center text-blue-300 bg-opacity-0 border-none btn">
          <span className="material-icons text-xs">login</span>
          <p className="font-normal">ログインして記録する</p>
        </button>
      </div>
    </header>
  );
}
