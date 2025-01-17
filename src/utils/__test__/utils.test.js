import {
  addClass,
  removeClass,
  toggleClass,
  setAttributes,
  getElement,
  createElement,
} from "../../core";
import { describe, it, expect } from "vitest";

describe("Utility Functions", () => {
  it("should add a class to an element", () => {
    const div = document.createElement("div");
    addClass(div, "test-class");
    expect(div.classList.contains("test-class")).toBe(true);
  });

  it("should remove a class from an element", () => {
    const div = document.createElement("div");
    div.classList.add("test-class");
    removeClass(div, "test-class");
    expect(div.classList.contains("test-class")).toBe(false);
  });

  it("should toggle a class on an element", () => {
    const div = document.createElement("div");
    toggleClass(div, "test-class");
    expect(div.classList.contains("test-class")).toBe(true);
    toggleClass(div, "test-class");
    expect(div.classList.contains("test-class")).toBe(false);
  });

  it("should set multiple attributes on an element", () => {
    const div = document.createElement("div");
    setAttributes(div, {
      id: "test-id",
      "data-test": "test-data",
    });
    expect(div.id).toBe("test-id");
    expect(div.dataset.test).toBe("test-data");
  });

  it("should get an element by selector", () => {
    const div = document.createElement("div");
    div.id = "test-element";
    document.body.appendChild(div);
    const foundElement = getElement("#test-element");
    expect(foundElement).toBe(div);
  });

  it("should create an element with options", () => {
    const div = createElement("div", {
      attributes: { id: "test-div" },
      classes: ["test-class1", "test-class2"],
      textContent: "Test Content",
    });
    expect(div.tagName.toLowerCase()).toBe("div");
    expect(div.id).toBe("test-div");
    expect(div.classList.contains("test-class1")).toBe(true);
    expect(div.classList.contains("test-class2")).toBe(true);
    expect(div.textContent).toBe("Test Content");
  });
});
