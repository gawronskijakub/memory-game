import React, { useState } from "react";
import { useBetween } from "use-between";
import "./Card.css";

// correct choice point value
const ADDED_POINTS = 10;
// correct cards number required to win
const REQUIRED_CARDS = 40;
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

// used when restarting the game
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
  const [ex, setEx] = props.exState;

  const { setWin, score, setScore, measuring, setMeasuring, setStatus } =
    useSharedResult();

  const rotateCard = props.rotateCard;

  const currentChoiceHandler = e => {
    // start measuring time only after first card has been chosen in current game
    // setEx(ex + 1);
    // console.log(ex);
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
      setScore(score + ADDED_POINTS);
    } else {
      for (const card of currentCards) {
        // rotate cards after a delay
        setTimeout(() => {
          rotateCard(card);
        }, 800);
        /*
          unblock cards after (delay + backup) time
          to avoid clicking on cards during their transitions
        */
        setTimeout(() => {
          card.classList.toggle("Blocked");
        }, 1000);
      }
    }

    clearCurrentChoice();

    if (result.length === REQUIRED_CARDS) {
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
