import React from "react";
import { useSharedResult, clearWholeChoice, result } from "../Card/Card";
import { toggleClass, rotateCard } from "../../../shared/functions";
import "./Aside.css";

let time = 0;
let elapsedID;

const Aside = props => {
  const {
    win,
    score,
    setWin,
    setScore,
    measuring,
    setMeasuring,
    status,
    setStatus
  } = useSharedResult();
  const [attempt, setAttempt] = props.attemptState;

  const timeValue = document.querySelector(".Time__Value");

  if (win) {
    clearInterval(elapsedID);
    setStatus("Finished!");
  }

  const restartGame = () => {
    // re-rotate all that have been already chosen
    const cards = document.querySelectorAll(".Card");
    cards.forEach(card => {
      if (card.classList.contains("Blocked")) {
        rotateCard(card);
        toggleClass(card, "Blocked");
      }
    });

    // reset points only if checkbox is checked
    const input = document.querySelector(".Input");
    if (input.checked) {
      setScore(0);
    }

    // reset time measuring
    time = 0;
    timeValue.textContent = "0 seconds";
    setMeasuring(false);
    elapsedID = false;

    // clear current choice and result from current (aka previous) game
    clearWholeChoice();
    setStatus("Not playing");
    setAttempt(attempt + 1);
    setWin(false);
  };

  const updateTime = () => {
    timeValue.textContent = `${time++} seconds`;
  };

  // start measuring only once
  if (measuring && !elapsedID) {
    updateTime();
    elapsedID = setInterval(updateTime, 1000);
  }

  return (
    <aside className="Aside">
      <p className="Score">Score:</p>
      <p className="Score__Value">{score}</p>
      <p className="Status">Status:</p>
      <p className="Status__Value">{status}</p>
      <p className="Time">Time:</p>
      <p className="Time__Value">0 seconds</p>
      <p className="Attempts">Current attempt:</p>
      <p className="Attempts__Value">{attempt}</p>
      <label htmlFor="Reset-Points" className="Label">
        Reset points after restart?
        <input
          type="checkbox"
          id="Reset-Points"
          className="Input"
          key={attempt}
        />
      </label>
      <button onClick={restartGame} className="Button" id="Restart-Game">
        Restart game
      </button>
    </aside>
  );
};

export default Aside;
