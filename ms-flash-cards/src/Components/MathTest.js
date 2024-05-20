import { FlipCard } from "./FlipCard";

export function MathTest({
  question,
  answer,
  selected,
  setSelected,
  onNext,
  isCorrect,
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
        onNext={onNext}
      />
    </>
  );
}
