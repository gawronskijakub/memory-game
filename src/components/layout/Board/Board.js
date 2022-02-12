import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";

// cards number required to win
const REQUIRED_CARDS = 10;

const Board = props => {
  const rotateCard = props.rotateCard;
  const [attempt, measuring, addScore] = props.state;
  const [startGame, endGame] = props.game;

  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState([]);
  const [result, setResult] = useState(0);
  const [currentChoice, setCurrentChoice] = useState({});
  const [currentCards, setCurrentCards] = useState([]);

  // let cards = [];
  let pair = 1;

  const fillBoard = (arr, size) => {
    for (let i = 1; i <= size; i++) {
      arr.push(<Card key={i} pair={pair} id={i} />);

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
    /*
      cards have pointer-events disabled after being chosen,
      hence we need to check, whether an element behind (Main) has not been clicked
      uses to prevent any action if the same card has been clicked twice
    */
    if (!card.classList.contains("Card")) {
      return;
    }
    currentCards.push(card);
    currentChoice[card.id] = card.dataset.pair;

    // block a card after it has been chosen
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
      // update result and score
      setResult(result + 2);
      addScore();
    } else {
      for (const card of currentCards) {
        // rotate cards after a delay
        setTimeout(() => {
          rotateCard(card);
        }, 800);
        // release blockade after longer delay to avoid choosing cards during transition
        setTimeout(() => {
          card.classList.toggle("Blocked");
        }, 1000);
      }
    }

    clearCurrentChoice();
  };

  // clear current choice
  const clearCurrentChoice = () => {
    setCurrentCards([]);
    setCurrentChoice({});
  };

  // used when restarting the game
  const clearWholeChoice = () => {
    clearCurrentChoice();

    const cards = document.querySelectorAll(".Card");
    // re-rotate all that have been already chosen
    cards.forEach(card => {
      if (card.classList.contains("Blocked")) {
        rotateCard(card);
        card.classList.toggle("Blocked");
      }
    });

    setResult(0);
  };

  // fill and shuffle the board once at the beginning
  if (!shuffled) {
    fillBoard(cards, REQUIRED_CARDS);
    setCards(shuffleBoard(cards));
    setShuffled(true);
  }

  // re-shuffle the board every new attempt
  useEffect(() => {
    setCards(shuffleBoard(cards));
    clearWholeChoice();
  }, [attempt]);

  useEffect(() => {
    if (result === REQUIRED_CARDS) {
      endGame();
    }
  }, [result]);

  return (
    <section
      className="Board"
      onClick={e => {
        rotateCard(e);
        currentChoiceHandler(e);
      }}
    >
      {cards}
    </section>
  );
};

export default Board;
