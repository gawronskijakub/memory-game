import React, { useState } from "react";
import Board from "../Board/Board";
import Aside from "../Aside/Aside";
import "./Main.css";

const Main = () => {
  // attempt state declared here to re-shuffle the Board every time game is restarted
  const [attempt, setAttempt] = useState(1);

  const rotateCard = e => {
    /*
      assignment used to distinguish between
      clicking a card and rotating it after a wrong choice
    */
    const card = e.target ? e.target.parentNode : e;

    if (card.className.includes("Card")) {
      for (const side of card.children) {
        side.classList.toggle("Active");
      }
    }
  };

  return (
    <main className="Main">
      <Board rotateCard={rotateCard} />
      <Aside rotateCard={rotateCard} attemptState={[attempt, setAttempt]} />
    </main>
  );
};

export default Main;
