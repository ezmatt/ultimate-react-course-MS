// Actual flipcard
// Takes a question and answer and a next callback function

export function FlipCard({
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
    <>
      {isStatic ? (
        <div
          onClick={(e) => handleClick(e)}
          className={
            selected
              ? correctAnswer
                ? "flashcards selected"
                : "flashcards incorrect"
              : "flashcards"
          }
        >
          <p>{selected ? answer : question}</p>
        </div>
      ) : (
        <div
          onClick={(e) => handleClick(e)}
          className={
            selected
              ? correctAnswer
                ? "flashcards selected"
                : "flashcards incorrect"
              : "flashcards"
          }
        >
          <p>{selected ? answer : question}</p>
        </div>
      )}
    </>
  );
}
