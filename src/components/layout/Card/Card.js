import React, { useState, useCallback } from "react";
import { useBetween } from "use-between";
import { toggleClass } from "./../../../shared/functions";
import "./Card.css";

let currentCards = [];
let currentProps = [];

let correctCards = [];

const useResult = () => {
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const addScore = useCallback(() => setScore(score + 1000), [score]);
  return { win, setWin, score, addScore };
};

/*
  use shared state between components
  allow siblings access common state without need to re-render the Board
  (and so, avoid re-shuffling the Board component)
*/
const useSharedResult = () => useBetween(useResult);

const Card = props => {
  const { setWin, score, addScore } = useSharedResult();

  const clearChoice = () => {
    currentCards = [];
    currentProps = [];
  };

  const rotateCard = e => {
    const card = e.target ? e.target.parentNode : e;

    if (card.className.includes("Card")) {
      for (const side of card.children) {
        toggleClass(side, "Active");
      }
    }
  };

  const currentChoice = e => {
    const card = e.target.parentNode;
    currentProps.push(props);
    currentCards.push(card);

    toggleClass(card, "Blocked");

    if (currentCards.length === 2) {
      check();
    }
  };

  const check = () => {
    if (currentProps[0].data === currentProps[1].data) {
      correctCards = correctCards.concat(currentCards);
      addScore();
    } else {
      for (const card of currentCards) {
        // rotate cards after a delay (800ms)
        setTimeout(() => {
          rotateCard(card);
        }, 800);

        /*
          remove blockade after (delay + backup) time
          to avoid clicking on cards during their' transitions
        */
        setTimeout(() => {
          toggleClass(card, "Blocked");
        }, 1000);
      }
    }
    clearChoice();

    if (correctCards.length === 10) {
      setWin(true);
    }
  };

  return (
    <div
      className="Card"
      onClick={e => {
        rotateCard(e);
        currentChoice(e);
      }}
    >
      <div className="Card__Side Card__Side--Back Active">Back</div>
      <div className="Card__Side Card__Side--Front">{props.data}</div>
    </div>
  );
};

export { useSharedResult };
export default Card;
