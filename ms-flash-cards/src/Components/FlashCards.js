import { useState } from "react";
import { Mathematics } from "./Mathematics";
import { Flags } from "./Flags";
import { Navigaton } from "./Navigaton";

export function FlashCards(params) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [navKey, setNavKey] = useState("home");

  return (
    <>
      <Navigaton navKey={navKey} setNavKey={setNavKey} />
      <Mathematics
        question={question}
        setQuestion={setQuestion}
        answer={answer}
        setAnswer={setAnswer}
      />
    </>
  );
}
