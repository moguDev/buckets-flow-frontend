import React, { useEffect, useState } from "react";

const FirstVisitDialog = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const visited = localStorage.getItem("visited");

    if (!visited) {
      // setIsFirstVisit(true);
      // localStorage.setItem("visited", "true");
    }
  }, []);

  const handleClose = () => {
    setIsFirstVisit(false);
  };

  return (
    <>
      {isFirstVisit && (
        <div className="modal modal-open text-blue-200">
          <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm rounded-lg">
            <h3 className="font-bold text-2xl mb-2">
              buckets Flowへようこそ！
            </h3>
            <section className="p-1">
              <div className="text-sm mb-4">
                <p>
                  このアプリは、ポモドーロタイマーと雨の作業音（ホワイトノイズ）を同時に提供し、作業の効率化をサポートします！
                </p>
                <p>
                  集中しながら、心地よい雨音に包まれて作業を進めてみませんか？
                </p>
              </div>
              <p className="text-sm mb-4">
                さらに、ポモドーロセッションごとにバケツに水を溜めていくことで、あなたの作業量を降水量として可視化します。日々の頑張りを水の量で確認し、モチベーションを高めましょう！
              </p>
            </section>
            <div className="bg-gray-800 bg-opacity-30 p-4 rounded-lg text-xs text-red-500 font-semibold mb-4">
              ※注意：このアプリは雨音が再生されます。音量にご注意ください。
            </div>
            <div className="modal-action">
              <button
                className="w-full bg-blue-950 bg-opacity-80 text-blue-200 text-lg font-bold rounded-lg py-5 hover:brightness-125 active:scale-95 transition-all duration-200"
                text-blue-900
                onClick={handleClose}
              >
                buckets Flowをはじめる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FirstVisitDialog;
