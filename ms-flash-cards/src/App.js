import "./CSS/index.css";
import { FlashCards } from "./Components/FlashCards";

// Create an ini or db record for default values
// can be updated by the user or for the user andstored as user defaults
export const initialValues = {
  minRange: 10,
  maxRange: 30,
  range: 12,
  timesTable: 5,
  testType: "practice",
  multi: "all",
  op: "*",
  flashLimit: 2,
  questionLimit: 8,
};

export const valueRanges = {
  testType: [
    {
      value: "test",
      display: "Testing",
    },
    {
      value: "practice",
      display: "Practice",
    },
  ],
  multiType: [
    {
      value: "individual",
      display: "Progressive",
    },
    {
      value: "all",
      display: "Random",
    },
  ],
  operators: [
    {
      value: "+",
      display: "Add (➕)",
    },
    {
      value: "-",
      display: "Sub (➖)",
    },
    {
      value: "*",
      display: "Times (✖)",
    },
    {
      value: "/",
      display: "Div (➗)",
    },
  ],
  range: 20,
  minRange: {
    range: 100,
    interval: 10,
  },
  maxRange: {
    range: 100,
    interval: 10,
  },
  flashLimit: 6,
  questionLimit: 20,
};

export default function App() {
  return <FlashCards />;
}
