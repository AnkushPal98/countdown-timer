import React, { useState, useEffect, useRef } from "react";

export default function CountdownTimer() {
  const [inputSeconds, setInputSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0); // For progress bar
  const timerRef = useRef(null);

  useEffect(() => {
    console.log("useEffecct runs........");
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      playSound();
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const playSound = () => {
    const beep = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );
    beep.play();
  };

  const startTimer = () => {
    setTimeLeft(inputSeconds);
    setTotalTime(inputSeconds);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    if (!isRunning) {
      clearInterval(timerRef.current);
      setTimeLeft(timeLeft);
      setIsRunning(true);
    } else {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setTotalTime(0);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercent =
    totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div
      style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}
    >
      <h2>⏳ Countdown Timer</h2>

      <input
        type="number"
        value={inputSeconds}
        onChange={(e) => setInputSeconds(Number(e.target.value))}
        disabled={isRunning}
        placeholder="Enter time in seconds"
        style={{ padding: "8px", fontSize: "1rem" }}
      />

      <div
        style={{
          fontSize: "3rem",
          margin: "1rem 0",
          fontWeight: "bold",
          color: timeLeft === 0 ? "red" : "black",
        }}
      >
        {formatTime(timeLeft)}
      </div>

      <div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#eee",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            backgroundColor: "#4caf50",
            transition: "width 1s linear",
          }}
        ></div>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={startTimer}
          disabled={isRunning || inputSeconds <= 0}
          style={{ padding: "10px 20px", fontSize: "1rem" }}
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          //   disabled={!isRunning}
          style={{ padding: "10px 20px", fontSize: "1rem" }}
        >
          {isRunning ? "Pause" : "Unpause"}
        </button>
        <button
          onClick={resetTimer}
          style={{ padding: "10px 20px", fontSize: "1rem" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
