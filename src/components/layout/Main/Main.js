import React, { useState } from "react";
import Board from "../Board/Board";
import Aside from "../Aside/Aside";
import "./Main.css";

const Main = () => {
  const [attempt, setAttempt] = useState(1);
  return (
    <main className="Main">
      <Board />
      <Aside attemptState={[attempt, setAttempt]} />
    </main>
  );
};

export default Main;
