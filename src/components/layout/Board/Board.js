import React, { useState, useContext } from "react";
import Card from "../Card/Card";
import { CardsContext } from "../Main/Main";
import "./Board.css";

const Board = props => {
  const [shuffled, setShuffled] = useState(false);
  const Cards = useContext(CardsContext);

  let cards = [];
  let data = 1;

  const fillBoard = (arr, size) => {
    for (let i = 1; i <= size; i++) {
      arr.push(
        <Card key={i} data={data} id={i} rotateCard={props.rotateCard} />
      );

      if (i % 2 === 0) {
        data++;
      }
    }
  };

  const shuffleBoard = () => {
    cards = cards
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  fillBoard(cards, 40);
  console.log(Cards);
  if (!shuffled) {
    console.log(shuffled);
    shuffleBoard();
    // setShuffled(true);
  }

  return <section className="Board">{cards}</section>;
};

export default Board;
