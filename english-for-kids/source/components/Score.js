export default class Score {
  constructor({ parent, className, iconCodes }) {
    this.parent = parent;
    this.className = className;
    this.iconCodes = iconCodes;
    this.counter = { win: 0, fail: 0 };
  }

  renderHtmlElement(parent, tag, className, id, innerHtml) {
    const element = document.createElement(tag);
    if (id) {
      element.id = id;
    }
    if (innerHtml) {
      element.innerHTML = innerHtml;
    }
    element.className = className;
    parent.appendChild(element);

    return element;
  }

  addWinIcon() {
    this.renderHtmlElement(
      this.parent,
      "p",
      this.className,
      null,
      this.iconCodes.win
    );
    this.counter.win++;
  }

  addFailIcon() {
    this.renderHtmlElement(
      this.parent,
      "p",
      this.className,
      null,
      this.iconCodes.fail
    );
    this.counter.fail++;
  }

  getResults() {
    return this.counter;
  }

  clearAll() {
    this.counter = { win: 0, fail: 0 };
    while (this.parent.hasChildNodes()) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }
}
