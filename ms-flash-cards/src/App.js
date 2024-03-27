import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Stack from "react-bootstrap/Stack";
import CloseButton from "react-bootstrap/CloseButton";
import "./index.css";

const initialValues = {
  range: 12,
  multi: "all",
  op: "*",
  flashLimit: 2,
  flashes: 0,
  selected: false,
  start: true,
  questionLimit: 8,
  questions: 1,
};

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [navKey, setNavKey] = useState("home");

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary mb-3"
        sticky="top"
        data-bs-theme="dark"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand>Flash Cards</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              value={navKey}
              className="me-auto"
              onSelect={(e) => setNavKey(e)}
            >
              <Nav.Item>
                <Nav.Link eventKey="Mathematics">Mathematics</Nav.Link>
              </Nav.Item>
              {/* <NavDropdown title="Mathematics">
                <NavDropdown.Item eventKey="mathPractice">
                  Practise
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="mathTest">Test</NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Item>
                <Nav.Link eventKey="Flags">Flags</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {navKey === "Mathematics" && (
        <Mathematics
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
        />
      )}
    </>
  );
}

function Mathematics({ question, answer, setQuestion, setAnswer }) {
  const [choices, setChoices] = useState([]);
  const [range, setRange] = useState(initialValues.range);
  const [multiType, setMultiType] = useState(initialValues.multi);
  const [operator, setOperator] = useState(initialValues.op);
  const [flashLimit, setFlashLimit] = useState(initialValues.flashLimit);
  const [flashes, setFlashes] = useState(initialValues.flashes);
  const [selected, setSelected] = useState(initialValues.selected);
  const [start, setStart] = useState(true);
  const [questionsPerSession, setQuestionsPerSession] = useState(
    initialValues.questionLimit
  );
  const [questions, setQuestions] = useState(initialValues.questions);
  const [testType, setTestType] = useState("practice");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  function toggleStart() {
    setStart((start) => false);
    nextProblem();
  }

  function handleEnd() {
    setStart((start) => true);
    setFlashes(0);
    setQuestions(1);
    setCorrect(0);
    setWrong(0);
  }

  function nextProblem() {
    let num1 = randomNumber(range);
    let num2 = randomNumber(range);
    if (operator === "/") {
      if (multiType === "individual") {
        num2 = range;
      } else {
        num2 = randomNumber(initialValues.range);
      }
      num1 = randomNumber(initialValues.range) * num2;
    } else {
      if (multiType === "individual") {
        num1 = range;
        num2 = randomNumber(initialValues.range);
      }
    }

    const choiceAnswer = operators[operator].fn(num1, num2);
    if (operator === "*") {
      setChoices([
        { display: choiceAnswer, correct: true },
        { display: choiceAnswer - num2, correct: false },
        { display: choiceAnswer + num2, correct: false },
        { display: choiceAnswer - num1, correct: false },
        { display: choiceAnswer + num1, correct: false },
      ]);
    } else {
      setChoices([
        { display: choiceAnswer, correct: true },
        { display: choiceAnswer + 1, correct: false },
        { display: choiceAnswer - 1, correct: false },
        { display: choiceAnswer + 2, correct: false },
        { display: choiceAnswer - 2, correct: false },
      ]);
    }
    setChoices((choices) => choices.slice().sort(() => Math.random() - 0.5));

    setQuestion(num1.toString() + operators[operator].symbol + num2.toString());
    setAnswer(operators[operator].fn(num1, num2));
    setSelected(false);
  }

  function handleNext() {
    if (testType === "practice") {
      if (flashes < flashLimit * 2 - 1) {
        setFlashes((flashes) => flashes + 1);
        return;
      }
    }
    if (questions < questionsPerSession) {
      setQuestions((questions) => questions + 1);
      setFlashes(0);
      nextProblem();
    } else {
      handleEnd();
    }
  }

  return (
    <>
      {start ? (
        <Container fluid>
          <Row className="m-2">
            <MathUserInput
              range={range}
              setRange={setRange}
              multiType={multiType}
              setMultiType={setMultiType}
              operator={operator}
              setOperator={setOperator}
              flashLimit={flashLimit}
              setFlashLimit={setFlashLimit}
              questionsPerSession={questionsPerSession}
              setQuestionsPerSession={setQuestionsPerSession}
              testType={testType}
              setTestType={setTestType}
            />
          </Row>
          <Row className="m-3">
            <Button
              size="lg"
              className="button-overrride"
              variant="success"
              onClick={toggleStart}
            >
              Start
            </Button>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row>
            {testType === "practice" ? (
              <MathPractice
                range={range}
                multiType={multiType}
                questions={questions}
                flashes={flashes}
                question={question}
                answer={answer}
                selected={selected}
                setSelected={setSelected}
                onNext={handleNext}
              />
            ) : (
              <MathTest
                range={range}
                multiType={multiType}
                questions={questions}
                flashes={flashes}
                question={question}
                answer={answer}
                selected={selected}
                setSelected={setSelected}
                onNext={handleNext}
                choices={choices}
                setCorrect={setCorrect}
                setWrong={setWrong}
              />
            )}
          </Row>
          {testType === "test" && (
            <Row className="m-2">
              <Col className="info">
                <Stats badge={questions}>Question #</Stats>
              </Col>
              <Col>
                <Stats badge={correct}>Correct:</Stats>
              </Col>
              <Col>
                <Stats badge={wrong}>Wrong:</Stats>
              </Col>
              <Col>
                <Row>
                  <Button
                    size="lg"
                    className="button-overrride"
                    variant="success"
                    disabled={!selected ? true : false}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </Row>
              </Col>
            </Row>
          )}
          <Row className="m-2">
            <Button
              size="lg"
              className="button-overrride"
              variant="danger"
              onClick={handleEnd}
            >
              End
            </Button>
          </Row>
        </Container>
      )}
    </>
  );
}

function MathPractice({
  range,
  multiType,
  questions,
  flashes,
  question,
  answer,
  selected,
  setSelected,
  onNext,
}) {
  return (
    <>
      <Row className="m-0">
        <Col className="info">
          <Stats badge={questions}>Questions</Stats>
        </Col>
        <Col className="info">
          <Stats badge={Math.floor(flashes / 2) + 1}>Flashes</Stats>
        </Col>
        <Col className="info">
          <Stats badge={multiType.toUpperCase()}>Type</Stats>
        </Col>
        <Col className="info">
          <Stats badge={range}>Range</Stats>
        </Col>
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

function MathTest({
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
}) {
  const [correctAnswer, setCorrectAnswer] = useState(false);

  function handleAnswer(choiceSelected) {
    if (Number(choiceSelected) === answer) {
      setCorrect((amount) => amount + 1);
      setCorrectAnswer(true);
    } else {
      setWrong((amount) => amount + 1);
      setCorrectAnswer(false);
    }
    setSelected(true);
    //setNext()
  }

  return (
    <>
      <Row className="m-0 mb-2">
        {choices.map((choice, key) => (
          <Col className="choice">
            <Choice
              selected={selected}
              id={key}
              onClick={handleAnswer}
              correct={choice.correct}
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
          correctAnswer={correctAnswer}
          isStatic={true}
        />
      </Row>
    </>
  );
}

function MathUserInput({
  range,
  setRange,
  multiType,
  setMultiType,
  operator,
  setOperator,
  flashLimit,
  setFlashLimit,
  questionsPerSession,
  setQuestionsPerSession,
  testType,
  setTestType,
}) {
  const rangeCeiling = 12;
  const flashCeiling = 8;

  function handleTestType(value) {
    setTestType(value);
    setFlashLimit(1);
  }

  return (
    <>
      {/* How many questions do you want to be asked */}
      <TopRowOption label="Testing" value={testType} setState={handleTestType}>
        <option value="test">Test</option>
        <option value="practice">Practice</option>
      </TopRowOption>
      {/* How many questions do you want to be asked */}
      <TopRowOption
        label="Questions"
        value={questionsPerSession}
        setState={setQuestionsPerSession}
      >
        {Array.from({ length: flashCeiling }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </TopRowOption>

      {/* How many flash cards per question */}
      {testType === "practice" && (
        <TopRowOption
          label="Flashes"
          value={flashLimit}
          setState={setFlashLimit}
        >
          {Array.from({ length: flashCeiling }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </TopRowOption>
      )}
      {/* Which Mathematics operator to choose */}
      <TopRowOption label="Operator" value={operator} setState={setOperator}>
        <option value="+">Addition (➕)</option>
        <option value="-">Subtraction (➖)</option>
        <option value="*">Times (✖)</option>
        <option value="/">Division (➗)</option>
      </TopRowOption>

      {/* Random numbers within the range, or set Fixed number as range, ie. 3x1, 3x2, 3x3, etc... */}
      <TopRowOption label="Type" value={multiType} setState={setMultiType}>
        <option value="individual">Progressive</option>
        <option value="all">Random</option>
      </TopRowOption>

      {/* What is the range of numbers to create questions from */}
      <TopRowOption label="Range" value={range} setState={setRange}>
        {Array.from({ length: rangeCeiling }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </TopRowOption>
    </>
  );
}

function TopRowOption({ value, label, setState, children }) {
  return (
    <Col xs={12} sm={6} md>
      <FloatingLabel controlId="floatingInput" label={label}>
        <Form.Select value={value} onChange={(e) => setState(e.target.value)}>
          {children}
        </Form.Select>
      </FloatingLabel>
    </Col>
  );
}

function Stats({ badge, children }) {
  return (
    <Button className="py-2 info" variant="info">
      {children}{" "}
      <Badge style={{}} className="m-1" bg="secondary">
        {badge}
      </Badge>
    </Button>
  );
}

function Choice({ correct, selected, onClick, children }) {
  return (
    <button
      onClick={(e) => onClick(e.target.id)}
      id={children}
      className={
        selected ? (correct ? "choice correct" : "choice incorrect") : "choice"
      }
    >
      {children}
    </button>
  );
}

// Actual flipcard
// Takes a question and answer and a next callback function
function FlipCard({
  question,
  answer,
  selected,
  setSelected,
  onNext,
  correctAnswer,
  isStatic,
}) {
  function handleClick(e) {
    setSelected((selected) => !selected);
    onNext();
  }

  return (
    <div className="flashcards">
      {isStatic ? (
        <div
          className={selected ? (correctAnswer ? "selected" : "incorrect") : ""}
        >
          <p>{selected ? answer : question}</p>
        </div>
      ) : (
        <div
          onClick={(e) => handleClick(e)}
          className={selected ? (correctAnswer ? "selected" : "incorrect") : ""}
        >
          <p>{selected ? answer : question}</p>
        </div>
      )}
    </div>
  );
}

// Miscellaneous possibly global funtions
function randomNumber(number) {
  return Number(Math.floor(Math.random() * number) + 1);
}

const operators = {
  "+": {
    fn: (a, b) => a + b,
    symbol: "+",
  },
  "-": {
    fn: (a, b) => a - b,
    symbol: "-",
  },
  "*": {
    fn: (a, b) => a * b,
    symbol: "\u00D7",
  },
  "/": {
    fn: (a, b) => a / b,
    symbol: "\u00F7",
  },
};
