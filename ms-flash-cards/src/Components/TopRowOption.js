export function TopRowOption({ value, label, setState, children }) {
  return (
    <div className="option">
      <p>{label}</p>
      <select
        value={value}
        onChange={(e) =>
          setState(isNaN(value) ? e.target.value : Number(e.target.value))
        }
      >
        {children}
      </select>
    </div>
  );
}
