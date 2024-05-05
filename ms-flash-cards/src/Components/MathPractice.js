import { FlipCard } from "./FlipCard";
import { Stats } from "./Stats";

export function MathPractice({
  questions,
  flashes,
  operator,
  multiType,
  timesTable,
  timesTableRange,
  minRange,
  maxRange,
  question,
  answer,
  selected,
  setSelected,
  onNext,
}) {
  return (
    <>
      <FlipCard
        question={question}
        answer={answer}
        selected={selected}
        setSelected={setSelected}
        onNext={onNext}
        correctAnswer={true}
        isStatic={false}
      />
    </>
  );
}
