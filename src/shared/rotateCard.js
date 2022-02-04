const rotateCard = e => {
  /*
    assignment used to distinguish between
    clicking a card and rotating it after a wrong choice
  */
  const card = e.target ? e.target.parentNode : e;

  if (card.className.includes("Card")) {
    for (const side of card.children) {
      side.classList.toggle("Active");
    }
  }
};

export default rotateCard;
