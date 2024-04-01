import { useState } from "react";
import { FlipCard } from "./FlipCard";
import { initialValues } from "../App";

export function Flags(params) {
  const [selected, setSelected] = useState(initialValues.selected);

  function handleNext(e) {
    console.log(e);
  }

  return (
    <div>
      <FlipCard
        question={"Flags"}
        answer={"Australia"}
        selected={selected}
        setSelected={setSelected}
        onNext={handleNext}
        correctAnswer={true}
        isStatic={false}
      />
    </div>
  );
}
