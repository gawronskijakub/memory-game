import React, { useState } from "react";
import Board from "../Board/Board";
import Aside from "../Aside/Aside";
import "./Main.css";

// correct choice reward
const ADDED_POINTS = 10;

const Main = () => {
  const [status, setStatus] = useState(0);
  const [attempt, setAttempt] = useState(1);
  const [score, setScore] = useState(0);
  const [measuring, setMeasuring] = useState(false);

  const addScore = () => {
    setScore(score => score + ADDED_POINTS);
  };

  const startGame = () => {
    setStatus(1);
    setMeasuring(true);
  };

  const resetGame = resetPoints => {
    // reset points only if checkbox is checked
    setScore(resetPoints ? 0 : score);
    setStatus(0);
    setMeasuring(false);
    setAttempt(attempt + 1);
  };

  const endGame = () => {
    setStatus(2);
    setMeasuring(false);
  };

  const rotateCard = e => {
    // restarting the game rotates card and return card side instead of the card
    const card = e.target ? e.target.parentNode : e;

    if (card.className.includes("Card")) {
      for (const side of card.children) {
        side.classList.toggle("Active");
      }
    }
  };

  return (
    <main className="Main">
      <Board
        rotateCard={rotateCard}
        state={[attempt, measuring, addScore]}
        game={[startGame, endGame]}
      />
      <Aside
        rotateCard={rotateCard}
        state={[attempt, score, status, measuring]}
        game={resetGame}
      />
    </main>
  );
};

export default Main;
