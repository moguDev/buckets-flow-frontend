import { atom } from "recoil";

export const othersIsHiddenState = atom<boolean>({
  key: "othersIsHiddenState",
  default: false,
});
