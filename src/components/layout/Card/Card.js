import React, { useState } from "react";
import { useBetween } from "use-between";
import rotateCard from "../../../shared/rotateCard";
import "./Card.css";

// current DOM nodes
let currentCards = [];
// current props from chosen cards
let currentChoice = {};
// all correct chosen cards during one game
let result = [];

// clear current choice
const clearCurrentChoice = () => {
  currentCards = [];
  currentChoice = {};
};

// used to restart the game
const clearWholeChoice = () => {
  clearCurrentChoice();
  result = [];
};

// custom hook for state shared between sibling components
const useResult = () => {
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [measuring, setMeasuring] = useState(false);
  const [status, setStatus] = useState("Not playing");
  return {
    win,
    setWin,
    score,
    setScore,
    measuring,
    setMeasuring,
    status,
    setStatus
  };
};

/*
  use shared state between components
  allow siblings access common state without need to re-render their common ancestor - Main
  (and so, avoid re-shuffling the Board component)
*/
const useSharedResult = () => useBetween(useResult);

const Card = props => {
  const { setWin, score, setScore, measuring, setMeasuring, setStatus } =
    useSharedResult();

  const currentChoiceHandler = e => {
    // start measuring time only after first card has been chosen in current game
    if (!measuring) {
      setStatus("In progress...");
      setMeasuring(true);
    }
    const card = e.target.parentNode;
    currentCards.push(card);
    currentChoice[props.order] = props.data;
    // block cards after choosing to disable pointer-events
    card.classList.toggle("Blocked");
    // perform a check only when 2 cards are currently selected
    if (currentCards.length === 2) {
      check();
    }
  };

  const check = () => {
    const [currData1, currData2] = Object.values(currentChoice);
    // check if corresponding data attributes are equal
    if (currData1 === currData2) {
      // update result
      result = [...result, ...currentCards];
      setScore(score + 10);
    } else {
      for (const card of currentCards) {
        // rotate cards after a delay (800ms)
        setTimeout(() => {
          rotateCard(card);
        }, 800);
        /*
          unblock both cards after (delay + backup) time
          to avoid clicking on cards during their' transitions
        */
        setTimeout(() => {
          card.classList.toggle("Blocked");
        }, 1000);
      }
    }

    clearCurrentChoice();

    if (result.length === 40) {
      setWin(true);
    }
  };

  return (
    <div
      className="Card"
      onClick={e => {
        rotateCard(e);
        currentChoiceHandler(e);
      }}
    >
      <div className="Card__Side Card__Side--Back Active"></div>
      <div className="Card__Side Card__Side--Front">{props.data}</div>
    </div>
  );
};

export { useSharedResult, clearWholeChoice, result };
export default Card;
