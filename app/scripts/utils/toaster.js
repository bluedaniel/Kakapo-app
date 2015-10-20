// From https://github.com/GoogleChrome/guitar-tuner/blob/master/src/scripts/libs/Toaster.js

class Toaster {
  constructor() {
    this.view = document.querySelector(".toast-view");
    this.hideTimeout = 0;
    this.hideBound = this.hide.bind(this);
  }

  toast(message) {
    this.view.textContent = message;
    this.view.classList.add("toast-view--visible");
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(this.hideBound, 3000);
  }

  hide() {
    this.view.classList.remove("toast-view--visible");
  }
}

export default () => {
  if (typeof window.ToasterInstance !== "undefined") {
    return Promise.resolve(window.ToasterInstance);
  }

  window.ToasterInstance = new Toaster();
  return Promise.resolve(window.ToasterInstance);
};
