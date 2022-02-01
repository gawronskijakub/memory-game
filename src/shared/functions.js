const toggleClass = (el, name) => {
  el.classList.toggle(name);
};

const rotateCard = e => {
  /*
    assignment used to distinguish between
    clicking a card and rotating it after a wrong choice
  */
  const card = e.target ? e.target.parentNode : e;

  if (card.className.includes("Card")) {
    for (const side of card.children) {
      toggleClass(side, "Active");
    }
  }
};

export { toggleClass, rotateCard };
