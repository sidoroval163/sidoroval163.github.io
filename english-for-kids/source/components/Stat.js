export default class Stat {
  constructor(parent, text, className, pictureClassName, clickerCounter) {
    this.parent = parent;
    this.text = text;
    this.className = className;
    this.picture = pictureClassName;
    this.isTraining = true;
    this.clickerCounter = clickerCounter;
  }

  changeStatus() {
    this.isTraining = this.isTraining ? false : true;
  }

  speakText() {
    alert(this.text);
  }

  renderHtmlElement(parent, tag, className, id, innerHtml, clickerCounter) {
    const element = document.createElement(tag);
    console.log(innerHtml);
    if (id) {
      element.id = id;
    }
    if (innerHtml) {
      element.innerText = innerHtml;
    }
    element.className = className;
    element.clickerCounter = clickerCounter;
    parent.appendChild(element);

    return element;
  }

  render() {
    const parent2 = this.renderHtmlElement(
      this.parent,
      "div",
      `card_element ${this.className}`,
      "card"
    );
    this.renderHtmlElement(parent2, "div", `card_picture ${this.picture}`);
    this.renderHtmlElement(parent2, "p", "test", null, this.text);
    parent2.addEventListener("click", () => {
      if ((this.isTraining = true)) {
        this.speakText();
      }
    });

    //!должен сгенерировать карту со всеми свойствами и элементами : родитель (ссылка), сss класс, текст английский/русский,
  }

  init() {
    this.render();
    this.setHandler();
  }

  changeState() {
    //меняет состояние нашей карты
  }
  setHandler() {
    //выставляет обработчик через add event listener!
  }
  view() {
    console.log(this.parent);
    console.log(this.text);
    console.log(this.className);
  }
}
