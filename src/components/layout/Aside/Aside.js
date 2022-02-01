import React from "react";
import { useSharedResult, clearWholeChoice } from "../Card/Card";
import { toggleClass, rotateCard } from "../../../shared/functions";
import "./Aside.css";

const Aside = props => {
  const { win, score, setWin, setScore } = useSharedResult();
  const [attempt, setAttempt] = props.attemptState;

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

    if (document.querySelector(".Aside__Input").checked) {
      setScore(0);
    }

    clearWholeChoice();
    setAttempt(attempt + 1);
    setWin(false);
  };

  return (
    <aside className="Aside">
      <p className="Aside__Score">Score: {score}</p>
      <p className="Aside__Status">Status: {status}</p>
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
