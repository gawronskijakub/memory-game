import React, { useState, useCallback } from "react";
import { useBetween } from "use-between";
import { toggleClass, rotateCard } from "./../../../shared/functions";
import "./Card.css";

let currentCards = [];

let result = [];

let currentChoice = {};
let currData1, currData2;

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

const useResult = () => {
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [measuring, setMeasuring] = useState(false);
  const addScore = useCallback(() => setScore(score + 10), [score]);
  return { win, setWin, score, addScore, setScore, measuring, setMeasuring };
};

/*
  use shared state between components
  allow siblings access common state without need to re-render their common ancestor - Main
  (and so, avoid re-shuffling the Board component)
*/
const useSharedResult = () => useBetween(useResult);

const Card = props => {
  const { setWin, addScore, measuring, setMeasuring } = useSharedResult();

  const currentChoiceHandler = e => {
    if (!measuring) setMeasuring(true);
    const card = e.target.parentNode;
    currentCards.push(card);
    currentChoice[props.no] = props.data;
    // block cards after choosing to disable pointer-events
    toggleClass(card, "Blocked");
    // perform a check only when 2 cards are currently selected
    if (currentCards.length === 2) {
      check();
    }
  };

  const check = () => {
    [currData1, currData2] = Object.values(currentChoice);
    // check if corresponding data attributes are equal
    if (currData1 === currData2) {
      // add correct cards to our result
      result = [...result, ...currentCards];
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
