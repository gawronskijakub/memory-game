import React from "react";
import { toggleClass } from "./../../../shared/functions";
import "./Card.css";

let currentCards = [];
let currentProps = [];

const Card = props => {
  const clearChoice = () => {
    currentCards = [];
    currentProps = [];
  };

  const rotateCard = e => {
    const card = e.target ? e.target.parentNode : e;

    if (card.className.includes("Card")) {
      for (const side of card.children) {
        toggleClass(side, "Active");
      }
    }
  };

  const currentChoice = e => {
    const card = e.target.parentNode;
    currentProps.push(props);
    currentCards.push(card);

    toggleClass(card, "Blocked");

    console.log(currentProps);

    if (currentCards.length === 2) {
      check(e);
    }
  };

  const check = e => {
    if (currentProps[0].data === currentProps[1].data) {
      console.log("yep");
    } else {
      for (const card of currentCards) {
        setTimeout(() => {
          rotateCard(card);
          toggleClass(card, "Blocked");
        }, 800);
      }
    }
    clearChoice();
  };

  return (
    <div
      className="Card"
      onClick={e => {
        rotateCard(e);
        currentChoice(e);
      }}
    >
      <div className="Card__Side Card__Side--Back Active">Back</div>
      <div className="Card__Side Card__Side--Front">{props.data}</div>
    </div>
  );
};

export default Card;
