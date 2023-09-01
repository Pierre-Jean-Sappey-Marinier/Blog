import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import Equation from "./Equation";

test("Equation Component", () => {
  const dividend = 10;
  const divisor = 2;
  const remainder = 0;

  const container = document.createElement("div");
  document.body.appendChild(container);

  const { getByText, queryByText } = render(
    <Equation dividend={dividend} divisor={divisor} remainder={remainder} />,
    container
  );

  // Ensure the equation text is rendered correctly
  const equationText = `${dividend} ÷ ${divisor} = ${Math.floor(
    dividend / divisor
  )}`;
  expect(getByText(equationText)).toBeTruthy();

  // Ensure the remainder is displayed if it's greater than 0
  if (remainder > 0) {
    const remainderText = `(${remainder} leftover)`;
    expect(getByText(remainderText)).toBeTruthy();
  } else {
    // Ensure the remainder is not displayed if it's 0
    const remainderText = `(${remainder} leftover)`;
    expect(queryByText(remainderText)).toBeNull();
  }

  document.body.removeChild(container);
});
