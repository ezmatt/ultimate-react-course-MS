import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    step > 1 && setStep((s) => s - 1);
  }
  function handleNext() {
    step < 3 && setStep((s) => s + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : undefined}>1</div>
            <div className={step >= 2 ? "active" : undefined}>2</div>
            <div className={step >= 3 ? "active" : undefined}>3</div>
          </div>
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                backgroundColour="#e7e7e7"
                textColour="333"
                onClickHandler={() =>
                  alert(`Learn how to ${messages[step - 1]}`)
                }
              >
                Learn How
              </Button>
            </div>
          </StepMessage>
          <div className="buttons">
            <Button
              textColour="#ffffff"
              backgroundColour="#7950f2"
              onClickHandler={handlePrevious}
            >
              <span>👈</span> Previous
            </Button>
            <Button
              textColour="#ffffff"
              backgroundColour="#7950f2"
              onClickHandler={handleNext}
            >
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColour, backgroundColour, onClickHandler, children }) {
  return (
    <button
      style={{ backgroundColor: backgroundColour, color: textColour }}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}
