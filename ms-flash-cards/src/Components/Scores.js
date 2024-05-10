import { Info } from "./Info";

export function Scores({ questions, correct, wrong }) {
  var percent = (correct / questions) * 100;
  var message = "Perfect";
  var classname = "";

  if (percent < 50) {
    message = "More Practice!";
    classname = "shake";
  } else if (percent < 60) {
    message = "Not Bad!";
    classname = "shake";
  } else if (percent < 70) {
    message = "Pretty Good!";
    classname = "jump";
  } else if (percent < 80) {
    message = "Great Job!";
    classname = "jump";
  } else if (percent < 99) {
    message = "Excellent!";
    classname = "jump";
  }

  return (
    <div className="scores">
      <div className="info">
        <Info
          stats={[
            {
              display: "Questions",
              value: questions,
            },
            { display: "Correct", value: correct },
            {
              display: "Wrong",
              value: wrong,
            },
          ]}
          isCorrect="false"
          isWrong="false"
        />
      </div>
      <div className="message">
        <p>{percent}%</p>
        <p className={classname}>{message}</p>
      </div>
    </div>
  );
}
