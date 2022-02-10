import React, { useState } from "react";
import Card from "../Card/Card";
import "./Board.css";

// cards number required to win
const REQUIRED_CARDS = 40;
// correct choice reward
const ADDED_POINTS = 10;
// currently chosen cards' props
let currentChoice = {};

// current DOM nodes - used to rotate cards
let currentCards = [];
// all correct chosen cards (DOM nodes) during one game
let result = [];

// clear current choice
const clearCurrentChoice = () => {
  currentCards = [];
  currentChoice = {};
};

// used when restarting the game
export const clearWholeChoice = () => {
  clearCurrentChoice();
  result = [];
};

const Board = props => {
  const rotateCard = props.rotateCard;
  const [measuring, setMeasuring] = props.measuringState;
  const [, setStatus] = props.statusState;
  const [, setWin] = props.winState;
  const [score, setScore] = props.scoreState;

  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState([]);
  // current props from chosen cards

  let data = 1;

  const fillBoard = (arr, size) => {
    for (let i = 1; i <= size; i++) {
      arr.push(
        <Card
          key={i}
          data={data}
          id={i}
          onClick={[rotateCard, currentChoiceHandler]}
        />
      );

      if (i % 2 === 0) {
        data++;
      }
    }
  };

  const shuffleBoard = arr => {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const currentChoiceHandler = e => {
    // start measuring time only after first card has been chosen in current game
    if (!measuring) {
      setStatus("In progress...");
      setMeasuring(true);
    }
    const card = e.target.parentNode;
    currentCards.push(card);
    currentChoice[card.id] = card.dataset.pair;
    console.log(currentChoice);

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
      setStatus("Finished!");
    }
  };

  // do not re-fill and re-shuffle the Board on every re-render
  if (!shuffled) {
    fillBoard(cards, 40);
    setCards(shuffleBoard(cards));
    setShuffled(true);
  }

  return <section className="Board">{cards}</section>;
};

export default Board;
