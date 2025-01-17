export const addClass = (element, className) => {
  if (element?.classList && className) {
    element.classList.add(className);
  }
};

export const removeClass = (element, className) => {
  if (element?.classList && className) {
    element.classList.remove(className);
  }
};

export const toggleClass = (element, className) => {
  if (element?.classList && className) {
    element.classList.toggle(className);
  }
};

export const setAttributes = (element, attributes = {}) => {
  if (element && typeof attributes === "object") {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
};

export const getElement = (selector) => {
  return document.querySelector(selector) || null;
};

export const createElement = (tag, options = {}) => {
  const { attributes = {}, classes = [], textContent = "" } = options;
  const element = document.createElement(tag);
  setAttributes(element, attributes);
  if (classes.length) element.classList.add(...classes);
  if (textContent) element.textContent = textContent;
  return element;
};
