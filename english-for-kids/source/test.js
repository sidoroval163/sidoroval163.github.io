
  document
  .getElementById("win")
  .addEventListener("click", () => playerScore.addWinIcon());

document
  .getElementById("fail")
  .addEventListener("click", () => playerScore.addFailIcon());

document
  .getElementById("getResult")
  .addEventListener("click", () => console.log(playerScore.getResults()));

document
  .getElementById("clear")
  .addEventListener("click", () => playerScore.clearAll());

const clearAllCards = () => {
  myCards.forEach((item) => {
    item.changeStatus();
  });
};