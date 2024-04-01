import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
      <Row className="m-0">
        <Col>
          <Stats badge={questions}>Questions</Stats>
        </Col>
        <Col>
          <Stats badge={Math.floor(flashes / 2) + 1}>Flashes</Stats>
        </Col>
        {operator === "*" || operator === "/" ? (
          <>
            {multiType === "individual" && (
              <Col>
                <Stats badge={timesTable}>Times Table</Stats>
              </Col>
            )}
            <Col>
              <Stats badge={timesTableRange}>Times Range</Stats>
            </Col>
          </>
        ) : (
          <>
            <Col>
              <Stats badge={minRange}>Minimum</Stats>
            </Col>

            <Col>
              <Stats badge={maxRange}>Maximum</Stats>
            </Col>
          </>
        )}
      </Row>
      <Row className="mx-0 my-2">
        <FlipCard
          question={question}
          answer={answer}
          selected={selected}
          setSelected={setSelected}
          onNext={onNext}
          correctAnswer={true}
          isStatic={false}
        />
      </Row>
    </>
  );
}
