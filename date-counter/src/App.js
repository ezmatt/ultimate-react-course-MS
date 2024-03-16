import { useState } from 'react';
import './styles.css';

export default function App() {
  return (
    <div className='App'>
      <Counter />
    </div>
  );
}

function Counter () {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [reset, setReset] = useState(false);

  const date = new Date(new Date().toLocaleDateString().toString());
  date.setDate(date.getDate() + count);
  
  return (
    <div>
      <div className='slidecontainer'>
        <input 
          type="range" 
          min={0} 
          max={10} 
          value={step} 
          className='slider' 
          onChange={
            (e) => {
              setStep(Number(e.target.value));
              setReset(true);
            }
          }
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={
          () => {
            setReset(true);
            setCount((s) => s - step);
          }
        }>
          -
        </button>
        <input 
          type="text" 
          value={count}
          onChange={
            (e) => {
              setCount(Number(e.target.value));
              setReset(true);
            }
          }
        />
        <button onClick={
          () => {
            setReset(true);
            setCount((s) => s + step);
          }
        }>
          +
        </button>
      </div>
      <div>
        <p></p>
        {count === 0 ? "Today" : `${count} day(s) from today`} is {date.toDateString()}
        { reset && (
          <div>
            <button onClick={()=> {
                setReset(false);
                setCount(0);
                setStep(0);
              }
            }>Reset</button>
          </div>
          )
        }
      </div>
    </div>
  );
}
