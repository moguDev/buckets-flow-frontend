import { volumeState } from "@/hooks/useTimer";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const VolumeModal = () => {
  const [volume, setVolume] = useRecoilState<number>(volumeState);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    localStorage.setItem("volume", newVolume.toString());
    setVolume(newVolume);
  };

  useEffect(() => {
    const savedVolume = localStorage.getItem("volume");
    if (savedVolume) {
      setVolume(parseInt(savedVolume, 10));
    }
  }, [setVolume]);

  return (
    <dialog id="volume_modal" className="modal">
      <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="py-4 text-lg font-semibold text-blue-300">雨音の音量</p>
          <p>{volume}</p>
        </div>
        <input
          type="range"
          min={0}
          max="100"
          value={volume}
          step={5}
          className="range range-info range-xs opacity-60"
          onChange={handleVolumeChange}
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
