import React, { useEffect, useCallback } from "react";
import { useSharedResult, clearWholeChoice, result } from "../Card/Card";
import { toggleClass, rotateCard } from "../../../shared/functions";
import "./Aside.css";

let time = 0;
let elapsedID;

const Aside = props => {
  const { win, score, setWin, setScore, measuring, setMeasuring } =
    useSharedResult();
  const [attempt, setAttempt] = props.attemptState;

  const timeEl = document.querySelector(".Aside__Time");

  let status = "in progress...";

  if (win) {
    status = "congratulations!";
  }

  const restartGame = () => {
    const cards = document.querySelectorAll(".Card");
    cards.forEach(card => {
      if (card.classList.contains("Blocked")) {
        rotateCard(card);
        toggleClass(card, "Blocked");
      }
    });

    const input = document.querySelector(".Aside__Input");
    if (input.checked) {
      setScore(0);
    }

    time = 0;
    timeEl.textContent = "Time: 0 seconds";
    setMeasuring(false);
    elapsedID = undefined;

    clearWholeChoice();
    setAttempt(attempt + 1);
    setWin(false);
  };

  const updateTime = () => {
    timeEl.textContent = `Time: ${time++} seconds`;
  };

  if (measuring && !elapsedID) {
    updateTime();
    elapsedID = setInterval(updateTime, 1000);
  }

  if (result.length === 10) {
    clearInterval(elapsedID);
  }

  return (
    <aside className="Aside">
      <p className="Aside__Score">Score: {score}</p>
      <p className="Aside__Status">Status: {status}</p>
      <p className="Aside__Time">Time: 0 seconds</p>
      <p className="Aside__Attempts">Current attempt: {attempt}</p>
      <button onClick={restartGame} className="Aside__Button" id="Restart-Game">
        Restart game
      </button>
      <label htmlFor="Reset-Points" className="Aside__Label">
        Reset points after restart?
        <input
          type="checkbox"
          id="Reset-Points"
          className="Aside__Input"
          key={attempt}
        />
      </label>
    </aside>
  );
};

export default Aside;
