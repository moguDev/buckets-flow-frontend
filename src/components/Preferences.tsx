import { useEffect, useState } from "react";
import { Loading, MenuAccordion } from "./MyComponents";
import { useAuth } from "@/hooks/useAuth";
import { useRecoilState, useRecoilValue } from "recoil";
import { timerState, TimerState } from "@/hooks/useTimer";
import { durationPreferenceState } from "@/hooks/useTimer";
import { usePreferences } from "@/hooks/usePreferences";

export const timerValues = [15, 20, 25, 30, 45, 50, 60, 90];
export const breakValues = [3, 4, 5, 6, 7, 8, 9, 10];
export const longBreakValues = [10, 15, 20, 25, 30, 45, 60];

export const Preferences = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [durationPreference, setDurationPreference] = useRecoilState(
    durationPreferenceState
  );

  const [timerSliderIndex, setTimerSliderIndex] = useState(2);
  const [breakSliderIndex, setBreakSliderIndex] = useState(2);
  const [longBreakSliderIndex, setLongBreakSliderIndex] = useState(4);

  const { updatePreference, loading } = usePreferences();

  useEffect(() => {
    setTimerSliderIndex(
      timerValues.indexOf(durationPreference[TimerState.WORKING] / 60)
    );
    setBreakSliderIndex(
      breakValues.indexOf(durationPreference[TimerState.BREAK] / 60)
    );
    setLongBreakSliderIndex(
      longBreakValues.indexOf(durationPreference[TimerState.LONG_BREAK] / 60)
    );
  }, [durationPreference]);

  const updateTimerSetting = (state: TimerState, newValue: number) => {
    setDurationPreference((prevSettings) => ({
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
      <ul className="relative p-2">
        {loading && (
          <div className="absolute top-0 h-full w-full bg-black bg-opacity-0 z-10">
            <Loading />
          </div>
        )}
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
              updatePreference({ timer_duration: timerValues[index] * 60 });
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
              updateTimerSetting(TimerState.BREAK, breakValues[index]);
              updatePreference({ break_duration: breakValues[index] * 60 });
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
              updatePreference({
                long_break_duration: longBreakValues[index] * 60,
              });
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
