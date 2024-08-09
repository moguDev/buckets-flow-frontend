import { atom } from "recoil";

export const initTimerCountState = atom<number>({
  key: "initTimerCountState",
  default: 5,
});
