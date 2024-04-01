import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FlipCard } from "./FlipCard";
import { Choice } from "./Choice";

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
  const [clicked, setClicked] = useState(false);

  function handleAnswer(choiceSelected) {
    setClicked(choiceSelected);
    if (Number(choiceSelected) === answer) {
      setCorrect((amount) => amount + 1);
      setIsCorrect(true);
      setIsWrong(false);
    } else {
      setWrong((amount) => amount + 1);
      setIsCorrect(false);
      setIsWrong(true);
    }
    setSelected(true);
    //setNext()
  }

  return (
    <>
      <Row className="m-0 mb-1">
        {choices.map((choice, key) => (
          <Col className="mx-0 choice">
            <Choice
              selected={selected}
              id={key}
              onClick={handleAnswer}
              correct={choice.correct}
              clicked={clicked}
            >
              {choice.display}
            </Choice>
          </Col>
        ))}
      </Row>
      <Row className="mx-0 my-1">
        <FlipCard
          question={question}
          answer={answer}
          selected={selected}
          setSelected={setSelected}
          correctAnswer={isCorrect}
          isStatic={true}
        />
      </Row>
    </>
  );
}
