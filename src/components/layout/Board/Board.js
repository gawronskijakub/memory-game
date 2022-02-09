import React, { useState } from "react";
import Card from "../Card/Card";
import "./Board.css";

const Board = props => {
  const [shuffled, setShuffled] = useState(false);
  const [ex, setEx] = useState(0);

  let cards = [];
  let data = 1;

  const fillBoard = (arr, size) => {
    for (let i = 1; i <= size; i++) {
      arr.push(
        <Card
          key={i}
          data={data}
          order={i}
          exState={[ex, setEx]}
          rotateCard={props.rotateCard}
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

  console.log(shuffled);
  fillBoard(cards, 40);
  cards = shuffleBoard(cards);
  // if (!shuffled) {
  //   setShuffled(true);
  // }

  return <section className="Board">{cards}</section>;
};

export default Board;
