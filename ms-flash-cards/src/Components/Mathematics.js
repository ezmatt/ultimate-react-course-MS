import { useState } from "react";
import { initialValues } from "../App";
import { MathUserInput } from "./MathUserInput";
import { MathTest } from "./MathTest";
import { MathPractice } from "./MathPractice";
import { Info } from "./Info";
import { Choice } from "./Choice";
import { Scores } from "./Scores";

export function Mathematics({ question, answer, setQuestion, setAnswer }) {
  // Practise or test mode
  // ToDo...
  // 1) Practise mode should lead into test mode. Good way to track stats if its working or not
  //    Uses the same set of questions in the flash cards.
  const [testType, setTestType] = useState(initialValues.testType);

  // How many questions
  const [questionsPerSession, setQuestionsPerSession] = useState(
    initialValues.questionLimit
  );

  // How many times should the flashcard be displayed
  const [flashLimit, setFlashLimit] = useState(initialValues.flashLimit);

  // What type of Basic Mathematics are we testing.
  const [operator, setOperator] = useState(initialValues.op);

  // What type of multiplication/division are we doing?
  // 1) Random Numbers (within the range); or
  // 2) Target a specific number times table, eg. 2 times tables, 4 times, etc...
  const [multiType, setMultiType] = useState(initialValues.multi);

  const [timesTable, setTimesTable] = useState(initialValues.timesTable);

  const [timesTableRange, setTimesTableRange] = useState(initialValues.range);

  // Minimum range for addition and subtraction
  const [minRange, setMinRange] = useState(initialValues.minRange);

  // Minimum range for addition and subtraction
  const [maxRange, setMaxRange] = useState(initialValues.maxRange);

  // This holds an array of choices to be used for the answers
  const [choices, setChoices] = useState([]);

  // Update values for the flashcard tests/practise runs
  const [questions, setQuestions] = useState(1);
  const [flashes, setFlashes] = useState(0);
  const [selected, setSelected] = useState(false);
  const [start, setStart] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showScores, setShowScores] = useState(false);
  // const [questionTracker, setQuestionTracker] = useState([]);
  let questionTracker = [];
  console.log(questionTracker);

  // Let's go!
  function handleStart() {
    setStart((start) => false);
    reset();
    nextProblem();
  }

  //reset values back to starting values
  function handleEnd() {
    console.log(questions, questionsPerSession, testType);
    setStart((start) => true);
    if (questions === questionsPerSession && testType === "test") {
      setShowScores(true);
    } else {
      setShowScores(false);
    }

    // reset();
  }

  function reset() {
    setQuestions(1);
    setFlashes(0);
    setSelected((selected) => false);

    setCorrect(0);
    setWrong(0);
    questionTracker = [];
  }

  // Look at splitting this up.
  function nextProblem() {
    let num1 = 0;
    let num2 = 0;

    // ToDo:
    // 1. keep track of numbers that have already been used and skip
    //console.log(questionTracker);
    do {
      if (operator === "*") {
        num2 = randomNumber(timesTableRange);
        if (multiType === "individual") {
          num1 = Number(timesTable);
        } else {
          num1 = randomNumber(timesTableRange);
        }
      } else if (operator === "/") {
        if (multiType === "individual") {
          num2 = Number(timesTable);
        } else {
          num2 = randomNumber(timesTableRange);
        }
        num1 = randomNumber(timesTableRange) * num2;
      } else if (operator === "+" || operator === "-") {
        num1 = randomNumber(Number(maxRange - minRange)) + Number(minRange);
        num2 = randomNumber(Number(maxRange - minRange)) + Number(minRange);

        // no negative numbers for now...
        if (num2 > num1) {
          const tempNum = num1;
          num1 = num2;
          num2 = tempNum;
        }
      }
    } while (checkNumbersForRepetition(num1, num2, questionTracker));

    questionTracker.push(num1, num2);
    console.log(questionTracker);

    const choiceAnswer = Number(operators[operator].fn(num1, num2));

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

    setIsCorrect(false);
    setIsWrong(false);
  }

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
    <section className="math">
      {start ? (
        <>
          {showScores ? (
            <section className="scores">
              <Scores
                questions={questions}
                correct={correct}
                wrong={wrong}
                setShowScores={setShowScores}
              />
            </section>
          ) : (
            <section className="userinput">
              <div className="questions">
                <MathUserInput
                  testType={testType}
                  setTestType={setTestType}
                  questionsPerSession={questionsPerSession}
                  setQuestionsPerSession={setQuestionsPerSession}
                  flashLimit={flashLimit}
                  setFlashLimit={setFlashLimit}
                  operator={operator}
                  setOperator={setOperator}
                  multiType={multiType}
                  setMultiType={setMultiType}
                  timesTable={timesTable}
                  setTimesTable={setTimesTable}
                  timesTableRange={timesTableRange}
                  setTimesTableRange={setTimesTableRange}
                  minRange={minRange}
                  setMinRange={setMinRange}
                  maxRange={maxRange}
                  setMaxRange={setMaxRange}
                />
              </div>

              <button className="button green" onClick={handleStart}>
                Start
              </button>
            </section>
          )}
        </>
      ) : (
        <section className="mathsflash">
          {testType === "practice" ? (
            <>
              <div className="info">
                <Info
                  stats={[
                    {
                      display: "Q's",
                      value: `${questions}/${questionsPerSession}`,
                    },
                    { display: "⚡", value: Math.floor(flashes / 2) + 1 },
                    {
                      display: "❌",
                      value: wrong,
                    },
                  ]}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                />
              </div>

              <MathPractice
                question={question}
                answer={answer}
                selected={selected}
                setSelected={setSelected}
                onNext={handleNext}
              />
            </>
          ) : (
            <section className="mathtest">
              <div className="info">
                <Info
                  stats={[
                    {
                      display: "Q's",
                      value: `${questions}/${questionsPerSession}`,
                    },
                    { display: "✅", value: correct },
                    {
                      display: "❌",
                      value: wrong,
                    },
                  ]}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                />
              </div>
              <div className="choices">
                {choices.map((choice, key) => (
                  <Choice
                    selected={selected}
                    id={key}
                    onClick={handleAnswer}
                    correct={choice.correct}
                    clicked={clicked}
                  >
                    {choice.display}
                  </Choice>
                ))}
              </div>

              <MathTest
                question={question}
                answer={answer}
                selected={selected}
                setSelected={setSelected}
                onNext={handleNext}
                isCorrect={isCorrect}
              />
            </section>
          )}

          <button className="button red" onClick={handleEnd}>
            End
          </button>
        </section>
      )}
    </section>
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

function checkNumbersForRepetition(num1, num2, questionTracker) {
  questionTracker.slice().forEach((element) => {
    console.log(num1, element[0], num2, element[1], "End Matching...");
    if (num1 === element[0] && num2 === element[1]) {
      console.log("Match");
      return true;
    }
  });
  return false;
}
