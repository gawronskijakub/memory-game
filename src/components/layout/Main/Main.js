import React from "react";
import Board from "../Board/Board";
import Aside from "../Aside/Aside";
import "./Main.css";

const Main = () => {
  return (
    <main className="Main">
      <Board />
      <Aside />
    </main>
  );
};

export default Main;
