"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

import { MotionConfig, LayoutGroup, motion } from "framer-motion";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];
function useTimeElapsed() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [lolo, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
        // setIndex((prevIndex) => {
        //   return prevIndex === 2 ? 0 : prevIndex + 1;
        // });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused]);

  return {
    lolo,
    timeElapsed,
    isPaused,
    setIsPaused,
    setTimeElapsed,
    setIndex,
  };
}
function CircularColorsDemo() {
  const id = React.useId();

  const { timeElapsed, isPaused, lolo, setIsPaused, setTimeElapsed } =
    useTimeElapsed();

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
  };

  const handleResetClick = () => {
    setTimeElapsed(0);
    setIsPaused(true);
  };

  function getColor(timeElapsed) {
    const colorIndex = timeElapsed % COLORS.length;
    return COLORS[colorIndex];
  }

  const selectedColor = getColor(timeElapsed);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;
          const layoutId = `${id}`;
          return (
            <>
              <MotionConfig reducedMotion="user">
                <li className={styles.color} key={index}>
                  {isSelected && (
                    <motion.div
                      layoutId={layoutId}
                      key={layoutId}
                      className={styles.selectedColorOutline}
                    />
                  )}
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
              </MotionConfig>
            </>
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
