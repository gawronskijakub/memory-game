import React, { useState, useCallback } from "react";
import { useBetween } from "use-between";
import { toggleClass, rotateCard } from "./../../../shared/functions";
import "./Card.css";

let currentCards = [];
let currentProps = [];

let correctCards = [];

// clear current choice
const clearCurrentChoice = () => {
  currentCards = [];
  currentProps = [];
};

const clearWholeChoice = () => {
  clearCurrentChoice();
  correctCards = [];
};

const useResult = () => {
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const addScore = useCallback(() => setScore(score + 50), [score]);
  return { win, setWin, score, addScore, setScore };
};

/*
  use shared state between components
  allow siblings access common state without need to re-render the Board
  (and so, avoid re-shuffling the Board component)
*/
const useSharedResult = () => useBetween(useResult);

const Card = props => {
  const { setWin, addScore } = useSharedResult();

  const currentChoice = e => {
    const card = e.target.parentNode;
    currentProps.push(props);
    currentCards.push(card);

    // block cards after choosing to disable pointer-events
    toggleClass(card, "Blocked");

    if (currentCards.length === 2) {
      check();
    }
  };

  const check = () => {
    // check if corresponding attributes are equal
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

    clearCurrentChoice();

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
      <div className="Card__Side Card__Side--Back Active"></div>
      <div className="Card__Side Card__Side--Front">{props.data}</div>
    </div>
  );
};

export { useSharedResult, clearWholeChoice };
export default Card;
