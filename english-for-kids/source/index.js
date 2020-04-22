import "./style.css";
import Card from "./components/Card";
import Score from "./components/Score";
import infoForCards from "./infoForCards";

let audio = new Audio();
let currentWord = null;
let soundArray = null;
let isTraining = true;
const parent = document.getElementById("grid_colors");

const settingForScore = {
  parent: document.getElementById("score"),
  className: "icon",
  iconCodes: { win: "&#xe801;", fail: "&#xe800;" },
};

export const playerScore = new Score(settingForScore);
const myCards = [];

const getRandomWord = () => {
  let index = soundArray.length - 1;
  let randomIndex = Math.floor(Math.random() * index);

  return soundArray[randomIndex].text.en;
};

const prepareArrayOfWords = () => {
  soundArray = infoForCards.slice();
};

export const updateArrayOfWords = () => {
  let indexOfWord = null;
  soundArray.forEach((item, index) => {
    if (item.text.en == currentWord) {
      indexOfWord = index;
    }
  });
  soundArray = soundArray.filter((item, index) => index != indexOfWord);

  if (soundArray.length) {
    currentWord = getRandomWord();

    myCards.forEach((card) => {
      card.changeStatus("false");
      card.updateCurrentWord(currentWord);
    });

    audio = new Audio(`assets/sounds_container/${currentWord}.mp3`);
    audio.play();
  } else {
    alert("ИГРА ЗАКОНЧЕНА");
  }
};

infoForCards.forEach(({ text, backgroundClass, pictureClass, audioPath }) => {
  let card = new Card(
    parent,
    text,
    backgroundClass,
    pictureClass,
    audioPath,
    playerScore,
    updateArrayOfWords
  );
  card.init();
  myCards.push(card);
});

document.getElementById("switch").addEventListener("click", () => {
  if (isTraining) {
    if (document.getElementById("start")) {
      document.getElementById("start").classList.remove("hidden");
      playerScore.clearAll();
      isTraining = false;
    }
  } else {
    document.getElementById("start").classList.add("hidden");
    document.getElementById("repeat").classList.add("hidden");
    isTraining = true;

    document
      .querySelectorAll(".card_element")
      .forEach((item) => item.classList.remove("used"));
    playerScore.clearAll();
    myCards.forEach((card) => {
      card.changeStatus("true");
    });
  }
});
if (document.getElementById("btn")) {
  document.getElementById("btn").addEventListener("click", () => {
    document.querySelector(".front").classList.add("flipped");
    document.querySelector(".back").classList.add("flipped_back");
  });
}
flipped_back.onmouseout = () => {
  document.querySelector(".front").classList.remove("flipped");
  document.querySelector(".back").classList.remove("flipped_back");
};

document.querySelector(".hamburger").addEventListener("click", function (z) {
  z.preventDefault();

  if (this.classList.contains("is-active")) {
    this.classList.remove("is-active");
    document.querySelector("#menu").classList.remove("nav-active");

    document.body.classList.remove("body-active");
  } else {
    this.classList.add("is-active");
    document.querySelector("#menu").classList.add("nav-active");
    document.body.classList.add("body-active");
  }
});
if (document.getElementById("start")) {
  document.getElementById("start").addEventListener("click", () => {
    document
      .querySelectorAll(".test")
      .forEach((item) => item.classList.add("hidden"));
    document.getElementById("start").classList.add("hidden");
    document
      .querySelectorAll(".btn")
      .forEach((item) => item.classList.add("hidden"));

    document
      .querySelectorAll(".card_element")
      .forEach((item) => item.classList.remove("used"));
    playerScore.clearAll();

    prepareArrayOfWords();
    currentWord = getRandomWord();
    audio = new Audio(`assets/sounds_container/${currentWord}.mp3`);
    audio.play();

    myCards.forEach((card) => {
      card.changeStatus("false");
      card.updateCurrentWord(currentWord);
    });
    document.getElementById("start").classList.add("hidden");
    document.getElementById("repeat").classList.remove("hidden");
  });

  document.getElementById("repeat").addEventListener("click", () => {
    audio.play();
  });
}
