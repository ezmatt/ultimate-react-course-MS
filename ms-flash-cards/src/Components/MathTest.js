import { useState } from "react";
import { FlipCard } from "./FlipCard";

export function MathTest({
  range,
  multiType,
  questions,
  flashes,
  question,
  answer,
  selected,
  setSelected,
  onNext,
  choices,
  setCorrect,
  setWrong,
  isCorrect,
  setIsCorrect,
  isWrong,
  setIsWrong,
}) {
  return (
    <>
      <FlipCard
        question={question}
        answer={answer}
        selected={selected}
        setSelected={setSelected}
        correctAnswer={isCorrect}
        isStatic={true}
      />
    </>
  );
}
