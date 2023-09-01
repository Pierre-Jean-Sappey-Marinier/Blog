import { test, expect, vitest, describe } from "vitest";
import React from "react";
import CircularColorsDemo from "./CircularColorsDemo";
import { render, fireEvent } from "@testing-library/react";

describe("CircularColorsDemo Component", () => {
  it("renders the component without errors", () => {
    render(<CircularColorsDemo />);
  });

  it("pauses and resumes the timer when the play/pause button is clicked", () => {
    const { getByText } = render(<CircularColorsDemo />);
    const playPauseButton = getByText("Play");

    fireEvent.click(playPauseButton); // Pause the timer
    expect(getByText("Play")).toBeInTheDocument(); // Expect the button text to change to "Play"

    fireEvent.click(playPauseButton); // Resume the timer
    expect(getByText("Pause")).toBeInTheDocument(); // Expect the button text to change to "Pause"
  });
});
