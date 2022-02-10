import React from "react";
import { clearWholeChoice } from "../Board/Board";
import "./Aside.css";

let time = 0;
let elapsedID;

const Aside = props => {
  const [status, setStatus] = props.statusState;
  const [measuring, setMeasuring] = props.measuringState;
  const [win, setWin] = props.winState;
  const [score, setScore] = props.scoreState;
  const [attempt, setAttempt] = props.attemptState;

  const timeValue = document.querySelector(".Time__Value");

  if (win) {
    clearInterval(elapsedID);
  }

  const resetGame = () => {
    const cards = document.querySelectorAll(".Card");
    // re-rotate all that have been already chosen
    cards.forEach(card => {
      if (card.classList.contains("Blocked")) {
        props.rotateCard(card);
        card.classList.toggle("Blocked");
      }
    });

    // reset points only if checkbox is checked
    const resetPoints = document.getElementById("Reset-Points");
    if (resetPoints.checked) {
      setScore(0);
    }

    // clear
    clearWholeChoice();

    // reset time measuring
    time = 0;
    timeValue.textContent = "0 seconds";
    /*
      NEEDED FIX:
      restarting the game causes timer to start automatically
      (loop inside board - !measuring)
    */
    setMeasuring(false);
    clearInterval(elapsedID);
    elapsedID = false;

    setStatus("Not playing");
    setAttempt(attempt + 1);
    console.log(win);
    if (win) {
      setWin(false);
    }
  };

  const updateTime = () => {
    timeValue.textContent = `${time.toFixed(1)} seconds`;
    time += 0.1;
  };

  // start measuring only once
  if (measuring && !elapsedID) {
    updateTime();
    elapsedID = setInterval(updateTime, 100);
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
        <input type="checkbox" id="Reset-Points" key={attempt} />
      </label>
      <button onClick={resetGame} className="Button" id="Restart-Game">
        Restart game
      </button>
    </aside>
  );
};

export default Aside;
