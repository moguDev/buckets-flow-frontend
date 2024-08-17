import { useState } from "react";
import { MenuAccordion } from "./MyComponents";
import { useAuth } from "@/hooks/useAuth";
import { useRecoilState, useRecoilValue } from "recoil";
import { timerSettingsState, TimerState } from "@/hooks/useTimer";

export const timerValues = [15, 20, 25, 30, 45, 50, 60, 90];
export const breakValues = [3, 4, 5, 6, 7, 8, 9, 10];
export const longBreakValues = [10, 15, 20, 25, 30, 45, 60];

export const Preferences = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const [timerSliderIndex, setTimerSliderIndex] = useState(2);
  const [breakSliderIndex, setBreakSliderIndex] = useState(2);
  const [longBreakSliderIndex, setLongBreakSliderIndex] = useState(4);
  const [timerSettings, setTimerSettings] = useRecoilState(timerSettingsState);

  const updateTimerSetting = (state: TimerState, newValue: number) => {
    setTimerSettings((prevSettings) => ({
      ...prevSettings,
      [state]: newValue * 60,
    }));
  };

  const SliderMark = ({ value }: { value: number }) => (
    <span className="relative">
      <p className="text-center">|</p>
      <p className="absolute inset-x-0 flex items-center justify-center text-center">
        {value}
      </p>
    </span>
  );

  return (
    <MenuAccordion
      isOpen={isOpen}
      handleOpen={() => setIsOpen((prev) => !prev)}
      iconName="settings"
      label="設定"
      isAuthenticated={isAuthenticated}
    >
      <ul className="p-2">
        <div className="flex items-center justify-between text-blue-300">
          <p className="text-xs">タイマーの時間</p>
        </div>
        <li className="mt-3 mb-8">
          <input
            type="range"
            min={0}
            max={7}
            value={timerSliderIndex}
            className="range range-info range-xs opacity-60"
            step="1"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const index = Number(event.target.value);
              setTimerSliderIndex(index);
              updateTimerSetting(TimerState.WORKING, timerValues[index]);
            }}
          />
          <div className="flex w-full justify-between px-2 text-xs text-blue-300">
            {timerValues.map((value) => (
              <SliderMark key={value} value={value} />
            ))}
          </div>
        </li>
        <div className="flex items-center justify-between text-blue-300">
          <p className="text-xs">休憩の時間</p>
        </div>
        <li className="mt-3 mb-8">
          <input
            type="range"
            min={0}
            max={7}
            value={breakSliderIndex}
            className="range range-info range-xs opacity-60"
            step="1"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const index = Number(event.target.value);
              setBreakSliderIndex(index);
              updateTimerSetting(TimerState.SHORT_BREAK, breakValues[index]);
            }}
          />
          <div className="flex w-full justify-between px-2 text-xs text-blue-300">
            {breakValues.map((value) => (
              <SliderMark key={value} value={value} />
            ))}
          </div>
        </li>
        <div className="flex items-center justify-between text-blue-300">
          <p className="text-xs">長い休憩の時間</p>
        </div>
        <li className="mt-3 mb-6">
          <input
            type="range"
            min={0}
            max={6}
            value={longBreakSliderIndex}
            className="range range-info range-xs opacity-60"
            step="1"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const index = Number(event.target.value);
              setLongBreakSliderIndex(Number(index));
              updateTimerSetting(TimerState.LONG_BREAK, longBreakValues[index]);
            }}
          />
          <div className="flex w-full justify-between px-2 text-xs text-blue-300">
            {longBreakValues.map((value) => (
              <SliderMark key={value} value={value} />
            ))}
          </div>
        </li>
      </ul>
    </MenuAccordion>
  );
};
