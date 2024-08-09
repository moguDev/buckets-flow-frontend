import { userNameState } from "@/recoil/authState";
import { useRecoilValue } from "recoil";

export default function UserInfo() {
  const userName = useRecoilValue(userNameState);
  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
      <button className="flex justify-between items-center w-full py-6">
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">account_circle</span>
          <p className="">{userName}</p>
        </div>
        <div className="text-blue-300">
          <p className="text-sm text-light">
            Lv.0
            <span className="text-md font-bold px-1">---</span>
            <span className="text-sm text-light">(---)</span>
          </p>
        </div>
      </button>
    </div>
  );
}
