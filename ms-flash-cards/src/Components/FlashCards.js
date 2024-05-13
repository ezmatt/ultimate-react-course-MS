import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Mathematics } from "./Mathematics";
import { Flags } from "./Flags";
import { Navigaton } from "./Navigaton";

export function FlashCards(params) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <>
      <Navigaton />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              question={question}
              setQuestion={setQuestion}
              answer={answer}
              setAnswer={setAnswer}
            />
          }
        />

        <Route
          path="/maths"
          element={
            <Mathematics
              question={question}
              setQuestion={setQuestion}
              answer={answer}
              setAnswer={setAnswer}
            />
          }
        />
        <Route path="/flags" element={<Flags />} />
      </Routes>
    </>
  );
}
