import { useState } from "react";
import "./styles.css";

export default function App() {
  const [bill, setBill] = useState("");
  const [yourServiceExperience, setYourServiceExperience] = useState(0);
  const [friendServiceExperience, setFriendServiceExperience] = useState(0);

  const tip =
    bill * ((yourServiceExperience + friendServiceExperience) / 2 / 100);

  function handleReset() {
    setBill(0);
    setFriendServiceExperience(0);
    setYourServiceExperience(0);
  }

  return (
    <div>
      <Bill bill={bill} onBillChange={setBill}>
        How much was the bill?{" "}
      </Bill>
      <Service
        serviceExperience={yourServiceExperience}
        onServiceChange={setYourServiceExperience}
      >
        How did you like the Service:{" "}
      </Service>
      <Service
        serviceExperience={friendServiceExperience}
        onServiceChange={setFriendServiceExperience}
      >
        How did your friend like the Service:{" "}
      </Service>
      {bill ? (
        <>
          <Amount bill={bill} tip={tip} />
          <Reset onCancel={handleReset} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

function Bill({ children, bill, onBillChange }) {
  return (
    <div>
      <span>
        {children}
        <input
          className="input"
          type="text"
          placeholder="Bill value"
          value={bill}
          onChange={(e) => onBillChange(Number(e.target.value))}
        />
      </span>
    </div>
  );
}

function Service({ children, serviceExperience, onServiceChange }) {
  const serviceOptions = [
    {
      value: 0,
      text: "Dissatisfied (0%)",
    },
    {
      value: 5,
      text: "It was okay (5%)",
    },
    {
      value: 10,
      text: "It was good (10%)",
    },
    {
      value: 20,
      text: "Absolutely amazing! (20%)",
    },
  ];

  return (
    <div>
      <span>
        {children}
        <select
          name="service"
          id="service"
          className="input"
          value={serviceExperience}
          onChange={(e) => onServiceChange(Number(e.target.value))}
        >
          {serviceOptions.map((option, id) => (
            <option key={id} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

function Amount({ bill, tip }) {
  return (
    <h3 className="amount">
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}

function Reset({ onCancel }) {
  return <button onClick={onCancel}>Reset</button>;
}
