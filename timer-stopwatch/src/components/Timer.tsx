import * as React from "react";

const Timer = () => {
  interface Time {
    currentHour: number;
    currentMinute: number;
    currentSecond: number;
    isCompleted: boolean;
    isRunning: boolean;
  }

  const [time, setTime] = React.useState<Time>({
    currentHour: 0,
    currentMinute: 10,
    currentSecond: 0,
    isCompleted: false,
    isRunning: false,
  });

  function handleMinuteTimerIncrement({
    currentMinute,
  }: {
    currentMinute: number;
  }) {
    if (currentMinute >= 59) {
      setTime({ ...time, currentHour: time.currentHour + 1, currentMinute: 0 });
    } else {
      setTime({ ...time, currentMinute });
    }
  }

  function handleSecondTimerIncrement({
    currentSecond,
  }: {
    currentSecond: number;
  }) {
    if (currentSecond >= 59) {
      setTime({
        ...time,
        currentMinute: time.currentMinute + 1,
        currentSecond: 0,
      });
    } else {
      setTime({ ...time, currentSecond });
    }
  }

  function handleTimerStart() {
    setTime((previousTime) => ({
      ...previousTime,
      isRunning: true,
      isCompleted: false,
    }));
  }

  function handleTimerReset() {
    setTime({
      currentHour: 0,
      currentMinute: 0,
      currentSecond: 0,
      isCompleted: false,
      isRunning: false,
    });
  }

  function handleTimerStop() {
    setTime((previousTime) => ({
      ...previousTime,
      isRunning: false,
    }));
  }

  function displayTimerTime() {
    const pad = (value: number) => String(value).padStart(2, "0")

    if (time.currentHour > 0) {
      return `${pad(time.currentHour)}:${pad(time.currentMinute)}:${pad(
        time.currentSecond,
      )}`
    }

    return `${pad(time.currentMinute)}:${pad(time.currentSecond)}`
  }

  React.useEffect(() => {
    if (!time.isRunning) {
      return;
    }

    if (
      time.currentHour === 0 &&
      time.currentMinute === 0 &&
      time.currentSecond === 0
    ) {
      setTime((previousTime) => ({
        ...previousTime,
        isRunning: false,
        isCompleted: true,
      }));
      return;
    }

    const timer = setInterval(() => {
      setTime((previousTime) => {
        if (
          previousTime.currentHour === 0 &&
          previousTime.currentMinute === 0 &&
          previousTime.currentSecond === 0
        ) {
          clearInterval(timer);
          return {
            ...previousTime,
            isRunning: false,
            isCompleted: true,
          };
        }

        if (previousTime.currentSecond > 0) {
          return {
            ...previousTime,
            currentSecond: previousTime.currentSecond - 1,
          };
        }

        if (previousTime.currentMinute > 0) {
          return {
            ...previousTime,
            currentMinute: previousTime.currentMinute - 1,
            currentSecond: 59,
          };
        }

        return {
          ...previousTime,
          currentHour: previousTime.currentHour - 1,
          currentMinute: 59,
          currentSecond: 59,
        };
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time.isRunning, time.currentHour, time.currentMinute, time.currentSecond]);

  return (
    <div className="time-panel timer-panel">
      <div className="time-display">
        {time.isCompleted ? (
          <h2 className="completed-text">Timer Completed!</h2>
        ) : (
          <h2 className="time-value">{displayTimerTime()}</h2>
        )}
      </div>

      <div className="time-controls">
        <button className="control-button control-button-soft"
        onClick={() =>
          handleSecondTimerIncrement({ currentSecond: time.currentSecond + 30 })
        }
      >
        +0:30
      </button>
        <button
          className="control-button control-button-soft"
        onClick={() =>
          handleMinuteTimerIncrement({ currentMinute: time.currentMinute + 1 })
        }
      >
        +1:00
      </button>
        <button
          className="control-button control-button-soft"
        onClick={() =>
          handleMinuteTimerIncrement({ currentMinute: time.currentMinute + 5 })
        }
      >
        +5:00
      </button>

        <button className="control-button control-button-ghost" onClick={handleTimerReset}>
          Reset
        </button>

        <button className="control-button control-button-primary" onClick={handleTimerStart}>
          Start
        </button>
        <button className="control-button control-button-ghost" onClick={handleTimerStop}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default Timer;
