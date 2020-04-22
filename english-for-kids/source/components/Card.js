import updateArrayOfWords from "../index";

export default class Card {
  constructor(
    parent,
    text,
    className,
    pictureClassName,
    audioPath,
    score,
    updateArrayOfWords
  ) {
    this.parent = parent;
    this.text = text;
    this.className = className;
    this.picture = pictureClassName;
    this.isTraining = true;
    this.counter = 0;
    this.guessCounter = {
      win: 0,
      fail: 0,
    };
    this.audio = new Audio(audioPath);
    this.currentWord = null;
    this.failsound = new Audio("assets/sounds_container/Fail.wav");
    this.HTMLparent = null;
    this.playerScore = score;
    this.updateArrayOfWords = updateArrayOfWords;
  }

  updateGuessCounter(state) {
    if (state == "win" || state == "fail") {
      this.guessCounter[state]++;
    }
  }

  getGuessCounter() {
    return this.guessCounter;
  }

  hideDescription() {}

  handleClick(node) {
    this.counter = this.counter + 1;
    node.textContent = `счетчик нажатий: ${this.counter}`;
  }

  changeStatus(status) {
    if (status == "false") this.isTraining = false;
    if (status == "true") this.isTraining = true;
  }

  speakText() {}

  renderHtmlElement(parent, tag, className, id, innerHtml) {
    const element = document.createElement(tag);

    if (id) {
      element.id = id;
    }
    if (innerHtml) {
      element.innerText = innerHtml;
    }
    element.className = className;
    if (parent) {
      parent.appendChild(element);
    }

    return element;
  }

  render() {
    const parent2 = this.renderHtmlElement(
      this.parent,
      "div",
      `card_element ${this.className}`,
      "card"
    );

    this.HTMLparent = parent2;

    const divFont = this.renderHtmlElement(parent2, "div", "front", null);
    const divBack = this.renderHtmlElement(
      parent2,
      "div",
      "back",
      "flipped_back"
    );

    this.renderHtmlElement(divFont, "div", `${this.picture}`);
    this.renderHtmlElement(divFont, "p", "test", null, this.text.en);
    const btn = this.renderHtmlElement(
      divFont,
      "button",
      "btn",
      "btn",
      `translate`
    );

    this.renderHtmlElement(divBack, "div", `${this.picture}`);
    this.renderHtmlElement(divBack, "p", "test", null, this.text.ru);

    const Count = this.renderHtmlElement(
      parent2,
      "p",
      "counter",
      null,
      `счетчик нажатий: ${this.counter}`
    );

    const counterWin = this.renderHtmlElement(
      parent2,
      "p",
      "counter",
      "counterWin" + this.text.en,
      `угадал: ${this.guessCounter.win}`
    );

    const counterFail = this.renderHtmlElement(
      parent2,
      "p",
      "counter",
      "counterFail" + this.text.en,
      `не угадал: ${this.guessCounter.fail}`
    );

    this.setHandler(parent2, Count);
    this.setFlipHandler(btn, divFont, divBack, parent2);
  }

  init() {
    this.render();
  }

  setFlipHandler(btn, divFont, divBack, card) {
    btn.addEventListener("click", () => {
      divFont.classList.add("flipped");
      divBack.classList.add("flipped_back");
    });

    card.addEventListener("mouseleave", () => {
      divFont.classList.remove("flipped");
      divBack.classList.remove("flipped_back");
    });
  }

  buttonKiller() {
    document.querySelector(".btn").style.display = this.isTraining
      ? ""
      : "none";
  }

  updateCurrentWord(word) {
    this.currentWord = word;
  }

  remediateCard() {
    this.HTMLparent.classlist.remove("used");
    this.isTraining = true;
  }

  setHandler(card, Count) {
    card.addEventListener("click", () => {
      if (this.isTraining) {
        this.audio.play();
        this.handleClick(Count);
      } else {
        let isCheked = this.text.en == this.currentWord ? true : false;
        if (isCheked) {
          this.updateGuessCounter("win");
          document.getElementById(
            "counterWin" + this.text.en
          ).textContent = `угадал: ${this.guessCounter.win}`;
          this.HTMLparent.classList.add("used");
          this.updateArrayOfWords();
          this.playerScore.addWinIcon();
        } else {
          this.updateGuessCounter("fail");
          document.getElementById(
            "counterFail" + this.text.en
          ).textContent = `не угадал: ${this.guessCounter.fail}`;
          this.failsound.play();
          this.playerScore.addFailIcon();
        }
      }
    });
  }
}
