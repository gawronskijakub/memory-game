import React from "react";
import "./Card.css";

const Card = props => {
  return (
    <div
      className="Card"
      onClick={e => {
        props.onClick[0](e);
        props.onClick[1](e);
      }}
      id={props.id}
      data-pair={props.pair}
    >
      <div className="Card__Side Card__Side--Back Active"></div>
      <div className="Card__Side Card__Side--Front">{props.pair}</div>
    </div>
  );
};

export default Card;
