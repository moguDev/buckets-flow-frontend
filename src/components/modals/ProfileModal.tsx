export const ProfileModal = () => {
  return (
    <div className="text-blue-300">
      <input type="checkbox" id="profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm">
          <div className="text-xl">プロフィールを編集</div>
          <form className="flex flex-col">
            <label htmlFor="userName">アカウント名</label>
            <div className="flex items-center justify-end p-1">
              <label
                htmlFor="profile-modal"
                className="btn bg-opacity-0 border-none font-thin"
              >
                キャンセル
              </label>
              <button
                type="submit"
                className="btn bg-opacity-0 text-blue-500 font-bold border-none"
              >
                プロフィールを更新
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
