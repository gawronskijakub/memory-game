import React from "react";
import { useSharedResult } from "../Card/Card";
import "./Aside.css";

const Aside = () => {
  const { win, score } = useSharedResult();
  let content = "In progress...";

  if (win) {
    content = "Congratulations!";
  }

  return (
    <aside className="Aside">
      <p>Score: {score}</p>
      <p>{content}</p>
    </aside>
  );
};

export default Aside;
