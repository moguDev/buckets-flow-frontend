export default function LogoutModal({
  logout,
}: {
  logout: () => Promise<void>;
}) {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-gray-900 bg-opacity-80 backdrop-blur-sm">
        <p className="py-4 text-blue-100">ログアウトしますか？</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn text-gray-200 bg-opacity-0 font-thin border-none">
              キャンセル
            </button>
            <button
              onClick={handleLogout}
              className="btn bg-opacity-0 text-white font-bold border-none"
            >
              ログアウト
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
