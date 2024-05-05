export function Info({ stats, isCorrect, isWrong }) {
  return (
    <div className="info">
      {stats.map((stat) => (
        <span>
          {stat.display}: {stat.value}
        </span>
      ))}
    </div>
  );
}
