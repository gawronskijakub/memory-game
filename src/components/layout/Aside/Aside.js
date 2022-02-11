import React, { useState, useRef, useCallback } from "react";
import { clear } from "use-between";
import { clearWholeChoice } from "../Board/Board";
import "./Aside.css";

let time = 0;

const Aside = props => {
  const [attempt, setAttempt] = props.attempt;
  const [measuring, setMeasuring] = props.measuring;
  const score = props.score;
  const status = props.status;
  const resetGame = props.resetGame;

  const intervalRef = useRef(null);

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

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const adjustSettings = () => {
    const resetPoints = document.getElementById("Reset-Points");
    // run reset state function from Main
    if (resetPoints.checked) {
      resetGame(true);
    } else {
      resetGame();
    }

    // reset time measuring
    stopTimer();
    document.querySelector(".Time__Value").textContent = "0 seconds";

    // increment attempt value
    setAttempt(attempt + 1);

    clearWholeChoice();

    time = 0;
    // timeValue.textContent = "0 seconds";

    const cards = document.querySelectorAll(".Card");
    // re-rotate all that have been already chosen
    cards.forEach(card => {
      if (card.classList.contains("Blocked")) {
        props.rotateCard(card);
        card.classList.toggle("Blocked");
      }
    });
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
      <label htmlFor="Reset-Points" className="Label">
        Reset points after restart?
        <input type="checkbox" id="Reset-Points" key={attempt} />
      </label>
      <button onClick={adjustSettings} className="Button" id="Restart-Game">
        Restart game
      </button>
    </aside>
  );
};

export default Aside;
