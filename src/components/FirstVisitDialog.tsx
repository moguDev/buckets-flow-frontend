"use client";
import React, { useEffect, useState } from "react";

const FirstVisitDialog = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("visited");

    if (!visited) {
      setIsFirstVisit(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setDoNotShowAgain(!doNotShowAgain);
  };

  const handleClose = () => {
    if (doNotShowAgain) {
      localStorage.setItem("visited", "true");
    }
    setIsFirstVisit(false);
  };

  return (
    <>
      {isFirstVisit && (
        <div className="modal modal-open text-blue-200">
          <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-20 backdrop-blur-sm rounded-lg">
            <h3 className="h-full font-bold text-2xl mb-4">
              buckets Flowへようこそ！
            </h3>
            <section className="p-1">
              <div className="text-sm mb-6">
                <p>
                  このアプリでは、雨音とポモドーロタイマーを活用し、作業の効率化や生産性の向上をサポートします！
                </p>
              </div>
              <p className="text-sm mb-6">
                ポモドーロセッションごとにバケツに水を溜めていくことで、あなたの作業量を降水量として可視化します。日々の頑張りを水の量で確認し、モチベーションを高めましょう！
              </p>
            </section>
            <div className="bg-gray-800 bg-opacity-30 p-4 rounded-lg text-xs text-red-500 font-semibold mb-4">
              ※注意：このアプリは雨音が再生されます。音量にご注意ください。
            </div>
            <div className="mb-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-info mr-2"
                  checked={doNotShowAgain}
                  onChange={handleCheckboxChange}
                />
                次から表示しない
              </label>
            </div>
            <div className="modal-action">
              <button
                className="w-full bg-blue-950 bg-opacity-80 text-blue-200 text-lg font-bold rounded-lg py-5 hover:brightness-125 active:scale-95 transition-all duration-200"
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
