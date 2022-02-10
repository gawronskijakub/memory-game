import React, { useState } from "react";
import Board from "../Board/Board";
import Aside from "../Aside/Aside";
import "./Main.css";

const Main = () => {
  // attempt state declared here to re-shuffle the Board every time game is restarted
  const attemptState = useState(1);
  const winState = useState(false);
  const scoreState = useState(0);
  /*
    measuring:
    0 => initial state - game not started
    1 => game started
    2 => reset game, but do not start it
    3 => game finished
  */
  const measuringState = useState(false);
  const statusState = useState("Not playing");

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
        scoreState={scoreState}
        winState={winState}
        measuringState={measuringState}
        statusState={statusState}
      />
      <Aside
        rotateCard={rotateCard}
        scoreState={scoreState}
        attemptState={attemptState}
        winState={winState}
        measuringState={measuringState}
        statusState={statusState}
      />
    </main>
  );
};

export default Main;
