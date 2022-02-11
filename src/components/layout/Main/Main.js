import React, { useState } from "react";
import Board from "../Board/Board";
import Aside from "../Aside/Aside";
import "./Main.css";

// correct choice reward
const ADDED_POINTS = 10;

const Main = () => {
  const [attempt, setAttempt] = useState(1);
  const [score, setScore] = useState(0);
  /*
    status values:
    0 => "Not playing"
    1 => "In game..."
    2 => "Finished"
  */
  const [status, setStatus] = useState(0);
  const [measuring, setMeasuring] = useState(false);

  const addScore = () => {
    console.log("correct");
    setScore(score => score + 10);
  };

  const startGame = () => {
    setStatus(1);
    setMeasuring(true);
  };

  const resetGame = (resetPoints = false) => {
    // reset points only if checkbox is checked
    if (resetPoints) {
      setScore(0);
    }
    setStatus(0);
    setMeasuring(false);
  };

  const endGame = () => {
    setStatus(2);
    setMeasuring(false);
  };

  const rotateCard = e => {
    // check whether an actual card has been selected
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
        attempt={attempt}
        addScore={addScore}
        endGame={endGame}
        startGame={startGame}
        measuring={[measuring, setMeasuring]}
      />
      <Aside
        attempt={[attempt, setAttempt]}
        rotateCard={rotateCard}
        score={score}
        resetGame={resetGame}
        status={status}
        measuring={[measuring, setMeasuring]}
      />
    </main>
  );
};

export default Main;
