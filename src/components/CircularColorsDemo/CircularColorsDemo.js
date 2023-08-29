"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];
function useTimeElapsed() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused]);

  return { timeElapsed, isPaused, setIsPaused, setTimeElapsed }; // Return isPaused and setIsPaused
}
function CircularColorsDemo() {
  const { timeElapsed, isPaused, setIsPaused, setTimeElapsed } =
    useTimeElapsed();

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
  };

  const handleResetClick = () => {
    setTimeElapsed(0);
    setIsPaused(true);
  };

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  // function cycleThroughArray(array) {
  //   let index = 0;

  //   return () => {
  //     const currentElement = array[index];
  //     index = (index + 1) % array.length;
  //     return currentElement;
  //   };
  // }

  // const getNextElement = cycleThroughArray(COLORS);

  // for (let i = 0; i < timeElapsed; i++) {
  //   const color = getNextElement;
  //   return color;
  // }

  // const selectedColor = color;
  const selectedColor = COLORS[0];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && <div className={styles.selectedColorOutline} />}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handlePauseClick}>
            {isPaused ? (
              <>
                <Play />
                <VisuallyHidden>Play</VisuallyHidden>
              </>
            ) : (
              <>
                <Pause />
                <VisuallyHidden>Play</VisuallyHidden>
              </>
            )}
          </button>
          <button onClick={handleResetClick}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
