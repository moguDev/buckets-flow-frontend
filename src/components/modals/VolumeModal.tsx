export const VolumeModal = () => {
  return (
    <dialog id="volume_modal" className="modal">
      <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm">
        <p className="py-4 text-lg font-semibold text-blue-300">雨音の音量</p>
        <input
          type="range"
          min={0}
          max="100"
          value="40"
          className="range range-info range-xs opacity-60"
        />
        <div className="modal-action">
          <form method="dialog">
            <button className="btn bg-opacity-0 text-blue-300 font-bold border-none">
              完了
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
