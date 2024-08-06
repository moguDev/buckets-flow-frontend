import { atom } from "recoil";

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});

export const bucketCountState = atom({
  key: "bucketCountState",
  default: 0,
});
