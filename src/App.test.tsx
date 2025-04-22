import { expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

it("should display the Vite heading", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading.textContent).toMatch(/Vite/i);
});

it("should increment counter on button click", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /count/i });

  expect(button.textContent).toBe("count is 0");

  fireEvent.click(button);
  expect(button.textContent).toBe("count is 1");

  fireEvent.click(button);
  expect(button.textContent).toBe("count is 2");
});
