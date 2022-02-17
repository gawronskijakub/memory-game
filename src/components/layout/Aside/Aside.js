import React, { useRef, useCallback } from "react";
import "./Aside.css";

const Aside = props => {
  const [attempt, score, status, measuring] = props.state;
  const resetGame = props.game;

  const intervalRef = useRef(null);

  let time = 0;
  let statusText;

  switch (status) {
    case 0:
      statusText = "Not playing";
      break;
    case 1:
      statusText = "In game...";
      break;
    case 2:
      statusText = "Finished!";
      break;
    default:
      statusText = "Not playing";
  }

  const updateTime = () => {
    const timeValue = document.querySelector(".Time__Value");
    timeValue.textContent = `${time.toFixed(1)} seconds`;
    time += 0.1;
  };

  // memoizing time interval with useRef & useCallback thanks to:
  // https://medium.com/@sdolidze/the-iceberg-of-react-hooks-af0b588f43fb
  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = setInterval(updateTime, 100);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }

    // intended assignment inside hook - time need to be restarted every new attempt
    time = 0;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const adjustSettings = () => {
    const resetPoints = document.getElementById("Reset-Checkbox");
    // resetGame from Main component
    resetGame(resetPoints.checked);

    // reset time measuring
    stopTimer();
    const timeValue = document.querySelector(".Time__Value");
    timeValue.textContent = "0 seconds";
  };

  if (measuring) {
    startTimer();
  } else {
    stopTimer();
  }

  return (
    <aside className="Aside">
      <p className="Score">Score:</p>
      <p className="Score__Value">{score}</p>
      <p className="Status">Status:</p>
      <p className="Status__Value">{statusText}</p>
      <p className="Time">Time:</p>
      <p className="Time__Value">0 seconds</p>
      <p className="Attempts">Current attempt:</p>
      <p className="Attempts__Value">{attempt}</p>
      <label htmlFor="Reset-Checkbox" className="Reset-Points">
        <span className="Reset-Points__Text">Reset points after restart?</span>
        <input
          type="checkbox"
          id="Reset-Checkbox"
          className="Reset-Points__Checkbox Border-Fancy"
          key={attempt}
          // key's getting the value of the current attempt, so it becomes re-rendered and unchecked on new attempt
        />
      </label>
      <button onClick={adjustSettings} className="Restart-Game Border-Fancy">
        Restart game
      </button>
    </aside>
  );
};

export default Aside;
