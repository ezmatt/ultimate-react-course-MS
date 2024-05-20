import { useState } from "react";

export function Choice({ correct, selected, onClick, children, clicked }) {
  return (
    <button
      onClick={(e) => onClick(e.target.id)}
      id={children}
      className={
        selected
          ? correct
            ? Number(clicked) === Number(children)
              ? "choice selected jump"
              : "choice selected"
            : Number(clicked) === Number(children)
            ? "choice incorrect shake"
            : "choice incorrect"
          : "choice"
      }
    >
      {children}
    </button>
  );
}
