import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";

// cards number required to win
const REQUIRED_CARDS = 10;
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

// let cards = [];

const Board = props => {
  const rotateCard = props.rotateCard;
  const addScore = props.addScore;
  const attempt = props.attempt;
  const [measuring, setMeasuring] = props.measuring;
  const startGame = props.startGame;
  const endGame = props.endGame;
  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState([]);

  // let cards = [];
  let pair = 1;

  const fillBoard = (arr, size) => {
    for (let i = 1; i <= size; i++) {
      arr.push(
        <Card
          key={i}
          pair={pair}
          id={i}
          onClick={[rotateCard, currentChoiceHandler]}
        />
      );

      if (i % 2 === 0) {
        pair++;
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
    // start the game once after first card has been chosen
    if (!measuring) {
      startGame();
    }

    const card = e.target.parentNode;
    currentCards.push(card);
    currentChoice[card.id] = card.dataset.pair;

    // block cards after choosing to disable pointer-events
    card.classList.toggle("Blocked");

    // perform a check only when 2 cards are currently selected
    if (currentCards.length === 2) {
      check();
    }
  };

  const check = () => {
    const [currPair1, currPair2] = Object.values(currentChoice);
    // check if corresponding pair attributes are equal
    if (currPair1 === currPair2) {
      // update result
      result = [...result, ...currentCards];
      addScore();
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
      endGame();
    }
  };

  if (!shuffled) {
    fillBoard(cards, 10);
    // cards = shuffleBoard(cards);
    setCards(shuffleBoard(cards));
    setShuffled(true);
  }

  useEffect(() => {
    setCards(shuffleBoard(cards));
  }, [attempt]);

  return <section className="Board">{cards}</section>;
};

export default Board;
