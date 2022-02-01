import React from "react";
import Card from "../Card/Card";
import "./Board.css";

const Board = () => {
  let cards = [];
  let data = 1;

  const fillBoard = size => {
    for (let i = 1; i <= size; i++) {
      cards.push(<Card key={i} data={data} name={i} />);

      if (i % 2 === 0) {
        data++;
      }
    }
  };

  fillBoard(10);

  const shuffleBoard = arr => {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  cards = shuffleBoard(cards);

  return <section className="Board">{cards}</section>;
};

export default Board;