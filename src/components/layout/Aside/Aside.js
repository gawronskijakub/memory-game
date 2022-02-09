import React, { useContext } from "react";
import { useSharedResult, clearWholeChoice } from "../Card/Card";
import { CardsContext } from "../Main/Main";
import "./Aside.css";

let time = 0;
let elapsedID;

const Aside = props => {
  const {
    win,
    setWin,
    score,
    setScore,
    measuring,
    setMeasuring,
    status,
    setStatus
  } = useSharedResult();
  const [attempt, setAttempt] = props.attemptState;

  const Cards = useContext(CardsContext);

  const rotateCard = props.rotateCard;

  const timeValue = document.querySelector(".Time__Value");
  const cards = document.querySelectorAll(".Card");
  const input = document.querySelector(".Input--Checkbox");

  if (win) {
    clearInterval(elapsedID);
    setStatus("Finished!");
  }

  const restartGame = () => {
    // re-rotate all that have been already chosen
    cards.forEach(card => {
      if (card.classList.contains("Blocked")) {
        rotateCard(card);
        card.classList.toggle("Blocked");
      }
    });

    // reset points only if checkbox is checked
    if (input.checked) {
      setScore(0);
    }

    // reset time measuring
    time = 0;
    timeValue.textContent = "0 seconds";
    setMeasuring(false);
    elapsedID = false;

    // clear choice before restarting the game
    clearWholeChoice();

    setStatus("Not playing");
    setAttempt(attempt + 1);
    setWin(false);
  };

  const updateTime = () => {
    timeValue.textContent = `${time} seconds`;
    time++;
    
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
          className="Input--Checkbox"
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
